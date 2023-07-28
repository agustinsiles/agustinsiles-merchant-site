import redis, { REDIS_SITE_KEY } from "../../lib/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = JSON.parse(req.body);

      return redis
        .set(REDIS_SITE_KEY, data)
        .then(() => res.status(201).json(data))
        .catch((error) => res.status(500).json(error));
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}
