# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from agent import get_langchain_llm

app = FastAPI()

llm = get_langchain_llm()   # conversation chain with memory

class Query(BaseModel):
    question: str

@app.get("/")
def root():
    return {"message": "Agentic AI Backend is running with memory"}

@app.post("/ask")
def ask_question(query: Query):
    response = llm.predict(query.question)  # memory-aware
    return {"question": query.question, "answer": response}
