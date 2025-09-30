export interface ChatRequest {
  text: string;
}

export interface ChatResponse {
  response: string;
}

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw new Error('Failed to send message. Please check if the backend server is running.');
  }
};