from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import get_langchain_llm

app = FastAPI()

# Allow requests from frontend (React usually runs on localhost:5173 if Vite)
origins = [
    "http://localhost:5173",  # React dev server
    "http://127.0.0.1:5173",
    # Add your deployed frontend URL here later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conversation = get_langchain_llm()

class Query(BaseModel):
    question: str

@app.get("/")
def root():
    return {"message": "Agentic AI Backend is running with memory"}

@app.post("/ask")
def ask_question(query: Query):
    response = conversation.invoke(
        {"input": query.question},
        config={"configurable": {"session_id": "default"}}
    )
    print("DEBUG:", response)
    return {"question": query.question, "answer": str(response)}
