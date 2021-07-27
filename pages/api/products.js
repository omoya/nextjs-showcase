import axios from "axios";

export default function handler(req, res) {
  console.log(process.env);
  if (req.method === "GET") {
    async function getProfiles(client_id) {
      try {
        // const response = await axios.get("https://reqres.in/api/users?page=2");
        const response = await axios.get(
          `https://api.boardgameatlas.com/api/search?limit=100&order_by=deadline&kickstarter=true&ascending=false&client_id=${client_id}`
        );

        res.status(200).json({ results: response.data.games });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }

    getProfiles(process.env.clientId);
  }
}
