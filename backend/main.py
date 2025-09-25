# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from agent import get_langchain_llm

app = FastAPI()

conversation = get_langchain_llm()   # ConversationChain with memory

class Query(BaseModel):
    question: str

@app.get("/")
def root():
    return {"message": "Agentic AI Backend is running with memory"}

@app.post("/ask")
def ask_question(query: Query):
    # New API: use .invoke({"input": ...})
    response = conversation.invoke({"input": query.question})
    return {"question": query.question, "answer": response["response"]}
