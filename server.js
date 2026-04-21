const express = require("express");
const basicAuth = require("express-basic-auth");

const app = express();

// 🔐 Login
app.use(
  basicAuth({
    users: { admin: "1234" },
    challenge: true,
  })
);

// 🌐 Website aus public Ordner
app.use(express.static("public"));

// 🔓 Logout
app.get("/logout", (req, res) => {
  res.set("WWW-Authenticate", 'Basic realm="Protected Area"');
  return res.status(401).send("Du wurdest ausgeloggt");
});

// 🚀 Server starten
app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});