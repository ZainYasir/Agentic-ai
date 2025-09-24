# backend/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from agent import get_langchain_llm

# init FastAPI
app = FastAPI()

# load model once
llm = get_langchain_llm()

# request schema
class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "Agentic AI Backend is running"}

@app.post("/chat")
def chat(request: ChatRequest):
    response = llm.invoke(request.message)
    return {"question": request.message, "answer": response}
