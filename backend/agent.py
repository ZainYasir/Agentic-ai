# backend/agent.py
from langchain_huggingface import HuggingFacePipeline
from models.phi_model import load_phi2

def get_langchain_llm():
    pipe = load_phi2()
    llm = HuggingFacePipeline(pipeline=pipe)
    return llm
