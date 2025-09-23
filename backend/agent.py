from langchain_community.llms import HuggingFacePipeline
from models.phi_model import load_phi2

def get_langchain_llm():
    pipe = load_phi2()
    llm = HuggingFacePipeline(pipeline=pipe)
    return llm
