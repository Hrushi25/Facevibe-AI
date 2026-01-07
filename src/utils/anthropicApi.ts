// This file is a frontend API wrapper.
// It talks ONLY to our backend Gemini proxy.

export async function sendMessage(
  message: string,
  stressLevel?: number
): Promise<string> {
  const response = await fetch("http://localhost:3001/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      stressLevel
    })
  });

  if (!response.ok) {
    throw new Error("Failed to get response from AI coach");
  }

  const data = await response.json();

  // Backend returns: { text: "Gemini response..." }
  return data.text;
}
