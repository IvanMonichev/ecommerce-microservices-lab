const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

app.get("/health", (req, res) => {
    res.json({ service: "users", status: "ok" });
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    res.json({ id, name: `User ${id}` });
});

app.listen(port, () => {
    console.log(`users listening on :${port}`);
});