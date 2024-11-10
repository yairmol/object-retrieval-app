import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      
      const pythonApiUrl = 'http://localhost:5000/search';

      // Forward the request to the Python API
      const response = await fetch(pythonApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body), // Pass along the body from the request
      });

      const data = await response.json();

      res.status(200).json({"images": data});
    } catch (error) {
      console.error('Error connecting to Python API:', error);
      res.status(500).json({ error: 'Error connecting to search API' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
