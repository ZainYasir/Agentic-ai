from langchain_community.llms import HuggingFacePipeline
from transformers import pipeline
from models.phi_model import load_phi2

def get_langchain_llm():
    model, tokenizer = load_phi2()
    pipe = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_new_tokens=200,
        temperature=0.7,
        do_sample=True
    )
    return HuggingFacePipeline(pipeline=pipe)
