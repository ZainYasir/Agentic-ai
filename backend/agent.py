# backend/agent.py
from langchain_huggingface import HuggingFacePipeline
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from models.phi_model import load_phi2

def get_langchain_llm():
    pipe = load_phi2()
    llm = HuggingFacePipeline(pipeline=pipe)

    # Add memory (stores conversation)
    memory = ConversationBufferMemory()
    conversation = ConversationChain(
        llm=llm,
        memory=memory,
        verbose=True
    )
    return conversation
