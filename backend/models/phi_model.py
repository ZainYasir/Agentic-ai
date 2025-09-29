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
    device_map="auto",          # automatically use GPU if available
    torch_dtype="auto",         # float16 if GPU supports, lighter than float32
    max_new_tokens=100,         # limit output length
    temperature=0.7,            # randomness (lower = more deterministic)
    top_p=0.9,                  # nucleus sampling (lower = safer outputs)
    repetition_penalty=1.1,     # discourages repeating phrases
    do_sample=True              # enables sampling (not just greedy)
)
