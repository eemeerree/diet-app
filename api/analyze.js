export default async function handler(req, res) {
  try {
    const { image } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [{
          role: "user",
          content: [
            { type: "input_text", text: "Dime qué comida es y calorías aproximadas" },
            {
              type: "input_image",
              image_base64: image
            }
          ]
        }]
      })
    });

    const data = await response.json();

    res.status(200).json({
      result: data.output[0].content[0].text
    });

  } catch (err) {
    res.status(500).json({ error: "Error analizando imagen" });
  }
}
