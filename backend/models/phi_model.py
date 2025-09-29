# backend/models/phi_model.py
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

MODEL_NAME = "microsoft/phi-2"   # <-- correct constant name

def load_phi2():
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        device_map="auto",   # will use GPU if available
    )
    pipe = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_new_tokens=100,
    )
    return pipe
