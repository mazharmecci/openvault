import os
from openai import OpenAI
from pinecone import Pinecone
from dotenv import load_dotenv

# --- Load environment variables ---
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

# --- Init clients ---
client = OpenAI(api_key=OPENAI_API_KEY)
pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index("openvault-blog")

def search_blog(query: str):
    # Create embedding for the query
    embedding = client.embeddings.create(
        model="text-embedding-3-small",
        input=query
    ).data[0].embedding

    # Query Pinecone
    results = index.query(vector=embedding, top_k=3, include_metadata=True)

    # Print results
    for match in results.matches:
        print(f"Title: {match.metadata['title']}")
        print(f"URL: {match.metadata['url']}")
        print(f"Score: {match.score}\n")

# Example usage
if __name__ == "__main__":
    search_blog("CSS deduplication for maintainability")
