import os
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
import pinecone

# --- Setup ---
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV = "us-east1-gcp"   # adjust to your Pinecone environment

client = OpenAI(api_key=OPENAI_API_KEY)

# --- Init Pinecone ---
pinecone.init(api_key=PINECONE_API_KEY, environment=PINECONE_ENV)
index_name = "openvault-blog"
if index_name not in pinecone.list_indexes():
    pinecone.create_index(index_name, dimension=1536)  # dimension for OpenAI embeddings
index = pinecone.Index(index_name)

# --- Crawl Blog ---
url = "https://openvault.in/forms/blog.html"
html = requests.get(url).text
soup = BeautifulSoup(html, "html.parser")

posts = []
for article in soup.find_all("article"):  # adjust if your blog uses <div> instead
    title = article.find("h2").get_text(strip=True)
    content = article.get_text(" ", strip=True)
    posts.append({"title": title, "content": content})

# --- Embed + Store ---
for i, post in enumerate(posts):
    text = f"{post['title']} - {post['content']}"
    embedding = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    ).data[0].embedding

    index.upsert([
        (f"post-{i}", embedding, {"title": post['title'], "url": url})
    ])

print("✅ Blog posts embedded into Pinecone!")
