const express = require("express");
const basicAuth = require("express-basic-auth");

const app = express();

// Login-System
app.use(
  basicAuth({
    users: {
      user1: "1234",
      user2: "1234",
      user3: "1234"
    },
    challenge: true,
  })
);

// Dashboard
app.get("/", (req, res) => {
  const user = req.auth.user;

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Fun Dashboard</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      background: #0d1117;
      color: white;
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 240px;
      background: #161b22;
      padding: 25px;
      border-right: 1px solid #30363d;
    }

    .logo {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 30px;
    }

    .nav-btn {
      width: 100%;
      margin-bottom: 12px;
      padding: 12px;
      background: #21262d;
      border: none;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      text-align: left;
      transition: 0.2s;
    }

    .nav-btn:hover {
      background: #30363d;
    }

    .main {
      flex: 1;
      padding: 30px;
    }

    .topbar {
      font-size: 28px;
      margin-bottom: 30px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }

    .card {
      background: #161b22;
      padding: 25px;
      border-radius: 14px;
      box-shadow: 0 0 15px rgba(0,0,0,0.35);
    }

    .card h3 {
      margin-bottom: 12px;
    }

    .big-number {
      font-size: 32px;
      font-weight: bold;
      color: #58a6ff;
    }

    .action-btn {
      margin-top: 12px;
      padding: 10px 14px;
      border: none;
      background: #238636;
      color: white;
      border-radius: 8px;
      cursor: pointer;
    }

    .action-btn:hover {
      background: #2ea043;
    }
  </style>
</head>
<body>

  <div class="sidebar">
    <div class="logo">⚡ MyPanel</div>

    <button class="nav-btn">🏠 Dashboard</button>
    <button class="nav-btn">👤 Profil</button>
    <button class="nav-btn">⚙️ Einstellungen</button>
    <button class="nav-btn" onclick="window.location.href='/logout'">🔓 Logout</button>
  </div>

  <div class="main">
    <div class="topbar">
      Willkommen ${user} 👋
    </div>

    <div class="grid">

      <div class="card">
        <h3>⏰ Uhrzeit</h3>
        <div id="time" class="big-number"></div>
      </div>

      <div class="card">
        <h3>📊 Status</h3>
        <div class="big-number">ONLINE</div>
      </div>

      <div class="card">
        <h3>🧪 Test Aktion</h3>
        <button class="action-btn" onclick="alert('Button funktioniert 👍')">
          Klick mich
        </button>
      </div>

      <div class="card">
        <h3>🚀 Server Info</h3>
        <p>Node.js / Express / Render</p>
      </div>

    </div>
  </div>

<script>
function updateTime() {
  const now = new Date();
  document.getElementById("time").innerText =
    now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();
</script>

</body>
</html>
  `);
});

// Logout
app.get("/logout", (req, res) => {
  res.set("WWW-Authenticate", 'Basic realm="Protected Area"');
  return res.status(401).send("Du wurdest ausgeloggt");
});

// Server Start
app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});