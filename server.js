const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("users.db");

db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    senha TEXT
)`);

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// REGISTRAR
app.post("/registrar", async (req, res) => {
    const { email, senha } = req.body;

    if (!emailValido(email))
        return res.status(400).send("Email inválido");

    if (senha.length < 4)
        return res.status(400).send("Senha curta");

    const hash = await bcrypt.hash(senha, 10);

    db.run(
        "INSERT INTO users(email, senha) VALUES(?,?)",
        [email, hash],
        function (err) {
            if (err)
                return res.status(400).send("Email já existe");

            res.send("Registrado");
        }
    );
});

// LOGIN
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, user) => {
            if (!user)
                return res.status(400).send("Usuário não existe");

            const ok = await bcrypt.compare(senha, user.senha);

            if (!ok)
                return res.status(400).send("Senha errada");

            res.send("Login OK");
        }
    );
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));