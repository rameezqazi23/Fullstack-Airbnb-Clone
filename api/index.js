import express from "express";
const app = express();

const PORT = 8000;

app.get('/', (req, res) => {
    res.status(200).send("Air bnb Backend running")
})

app.listen(PORT, () => console.log("Server running on PORT: ", PORT))