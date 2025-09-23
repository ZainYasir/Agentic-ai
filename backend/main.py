from agent import get_langchain_llm

if __name__ == "__main__":
    llm = get_langchain_llm()
    question = "Explain reinforcement learning in simple words."
    response = llm.invoke(question)

    print("Q:", question)
    print("A:", response)
