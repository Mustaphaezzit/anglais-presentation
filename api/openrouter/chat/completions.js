
import { env } from 'node:process';
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }


const API_KEY = env.OPENROUTER_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      error: 'OPENROUTER_API_KEY is missing'
    });
  }

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://anglais-presentation.vercel.app',
          'X-Title': 'English Presentation'
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    console.error('OpenRouter error:', error);

    return res.status(500).json({
      error: 'OpenRouter server error'
    });
  }
}
