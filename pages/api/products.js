export default function handler(req, res) {
  console.log(process.env);
  res.status(200).json({ name: "John Doe" });
}
