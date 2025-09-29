# backend/agent.py
from langchain_community.llms import HuggingFacePipeline
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import InMemoryChatMessageHistory
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# Load model (lighter config)
model_name = "microsoft/phi-2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto",
    torch_dtype="auto"
)

# Pipeline with smaller output size & lower randomness
hf_pipeline = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=256,
    temperature=0.2,
    do_sample=True
)

llm = HuggingFacePipeline(pipeline=hf_pipeline)

# Define chat-style prompt
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Remember facts shared by the user."),
    MessagesPlaceholder("history"),
    ("human", "{input}")
])

# Store memory for each session
store = {}

def get_memory(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

# Wrap LLM with memory
conversation = RunnableWithMessageHistory(
    prompt | llm,
    get_memory,
    input_messages_key="input",
    history_messages_key="history"
)

# Function to be used by FastAPI
def get_langchain_llm():
    return conversation
