import os
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv

# --- Load environment variables ---
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

# --- Init OpenAI client ---
client = OpenAI(api_key=OPENAI_API_KEY)

# --- Init Pinecone client ---
pc = Pinecone(api_key=PINECONE_API_KEY)

index_name = "openvault-blog"

# Create index if it doesn't exist
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=1536,  # dimension for OpenAI embeddings
        metric="cosine", # or "euclidean"
        spec=ServerlessSpec(
            cloud="aws",   # or "gcp"
            region="us-east-1"  # pick region closest to you
        )
    )

index = pc.Index(index_name)

# --- Crawl Blog ---
url = "https://openvault.in/forms/blog.html"
html = requests.get(url).text
soup = BeautifulSoup(html, "html.parser")

posts = []
for article in soup.find_all("article"):  # adjust if your blog uses <div> instead
    title_tag = article.find("h2")
    title = title_tag.get_text(strip=True) if title_tag else "Untitled"
    content = article.get_text(" ", strip=True)
    posts.append({"title": title, "content": content})

# --- Embed + Store ---
for i, post in enumerate(posts):
    text = f"{post['title']} - {post['content']}"
    embedding = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    ).data[0].embedding

    index.upsert(vectors=[
        {
            "id": f"post-{i}",
            "values": embedding,
            "metadata": {"title": post['title'], "url": url}
        }
    ])

print("✅ Blog posts embedded into Pinecone!")
