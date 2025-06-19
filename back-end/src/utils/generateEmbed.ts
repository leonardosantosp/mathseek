export const generateEmbeding = async (query: string) => {
  try {
    const response = await fetch("http://localhost:8000/embed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: query
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.embedding; // Retorna o array de embeddings
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
};
