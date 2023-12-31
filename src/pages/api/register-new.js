export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body, req.headers);
    try {
      const request = await fetch(
       req.headers.role === 'patient' ? "https://medbuddy-7w7q.onrender.com/api/v1/patient" : 'https://medbuddy-7w7q.onrender.com/api/v1/practitioner',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: req.body,
        }
      );

      if (!request.ok) {
        console.log(request);
        throw new Error("for some reason, we cant sign you up");
      }

      const response = await request.json();

      res.status(response.code).json({ data: response });
    } catch (error) {
      res.status(503).json({ error: error.message });
    }
  }
}
