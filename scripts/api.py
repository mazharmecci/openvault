import os
from fastapi import FastAPI, Query, HTTPException
from openai import OpenAI
from pinecone import Pinecone
from dotenv import load_dotenv

# --- Load environment variables ---
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

if not OPENAI_API_KEY:
    raise RuntimeError("❌ Missing OPENAI_API_KEY in .env")
if not PINECONE_API_KEY:
    raise RuntimeError("❌ Missing PINECONE_API_KEY in .env")

# --- Init clients ---
client = OpenAI(api_key=OPENAI_API_KEY)
pc = Pinecone(api_key=PINECONE_API_KEY)

# Ensure index exists
INDEX_NAME = "openvault-blog"
try:
    index = pc.Index(INDEX_NAME)
except Exception as e:
    raise RuntimeError(f"❌ Could not connect to Pinecone index '{INDEX_NAME}': {e}")

# --- FastAPI app ---
app = FastAPI(title="OpenVault Blog Search API")

@app.get("/")
def root():
    return {"message": "✅ OpenVault Blog Search API is running!"}

@app.get("/search")
def search_blog(query: str = Query(..., description="Search query text")):
    try:
        # Create embedding for the query
        embedding = client.embeddings.create(
            model="text-embedding-3-small",
            input=query
        ).data[0].embedding

        # Query Pinecone
        results = index.query(vector=embedding, top_k=3, include_metadata=True)

        # Format response
        return [
            {
                "title": match.metadata.get("title"),
                "url": match.metadata.get("url"),
                "score": match.score
            }
            for match in results.matches
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {e}")
