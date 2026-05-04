const express = require("express");
const basicAuth = require("express-basic-auth");

const app = express();

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

app.get("/", (req, res) => {
  const user = req.auth.user;

  res.send(`
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Premium Dashboard</title>
<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}

body{
  min-height:100vh;
  background:
    radial-gradient(circle at top left,#2d5fff 0%,transparent 35%),
    radial-gradient(circle at top right,#ff4d8d 0%,transparent 30%),
    radial-gradient(circle at bottom,#00c6ff 0%,transparent 35%),
    #0a0a0f;
  color:white;
  overflow-x:hidden;
}

.wrapper{
  display:flex;
  min-height:100vh;
}

.sidebar{
  width:260px;
  padding:28px;
  backdrop-filter:blur(18px);
  background:rgba(255,255,255,0.05);
  border-right:1px solid rgba(255,255,255,0.08);
}

.logo{
  font-size:28px;
  font-weight:700;
  margin-bottom:35px;
}

.nav-btn{
  width:100%;
  border:none;
  padding:14px 16px;
  margin-bottom:12px;
  border-radius:14px;
  background:rgba(255,255,255,0.06);
  color:white;
  cursor:pointer;
  text-align:left;
  font-size:15px;
  transition:.25s;
}

.nav-btn:hover{
  transform:translateX(5px);
  background:rgba(255,255,255,0.12);
}

.main{
  flex:1;
  padding:32px;
}

.hero{
  backdrop-filter:blur(18px);
  background:rgba(255,255,255,0.07);
  border:1px solid rgba(255,255,255,0.08);
  padding:28px;
  border-radius:26px;
  margin-bottom:28px;
  box-shadow:0 20px 40px rgba(0,0,0,.35);
}

.hero h1{
  font-size:34px;
  margin-bottom:8px;
}

.hero p{
  opacity:.8;
}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:22px;
}

.card{
  backdrop-filter:blur(18px);
  background:rgba(255,255,255,0.07);
  border:1px solid rgba(255,255,255,0.08);
  padding:24px;
  border-radius:22px;
  box-shadow:0 15px 30px rgba(0,0,0,.25);
  transition:.25s;
}

.card:hover{
  transform:translateY(-6px);
}

.card h3{
  margin-bottom:14px;
  font-size:18px;
}

.big{
  font-size:30px;
  font-weight:700;
}

.progress{
  width:100%;
  height:10px;
  background:rgba(255,255,255,0.08);
  border-radius:999px;
  overflow:hidden;
  margin-top:12px;
}

.progress-fill{
  height:100%;
  border-radius:999px;
  background:linear-gradient(90deg,#4facfe,#00f2fe);
}

.action-btn{
  border:none;
  padding:12px 16px;
  border-radius:14px;
  background:linear-gradient(135deg,#4facfe,#00c6ff);
  color:white;
  cursor:pointer;
  margin-top:12px;
  font-weight:600;
  width:100%;
}

.action-btn:hover{
  filter:brightness(1.08);
}

.toggle{
  display:flex;
  justify-content:space-between;
  margin:12px 0;
}

.switch{
  width:44px;
  height:24px;
  border-radius:999px;
  background:#36d67c;
  position:relative;
}

.switch::after{
  content:'';
  width:18px;
  height:18px;
  background:white;
  border-radius:50%;
  position:absolute;
  top:3px;
  right:3px;
}

.footer-note{
  margin-top:26px;
  opacity:.55;
  font-size:13px;
}

@media(max-width:900px){
  .sidebar{
    display:none;
  }
}
</style>
</head>
<body>

<div class="wrapper">

  <div class="sidebar">
    <div class="logo"> MyPanel</div>

    <button class="nav-btn">🏠 Dashboard</button>
    <button class="nav-btn">👤 Profile</button>
    <button class="nav-btn">📊 Analytics</button>
    <button class="nav-btn">⚙ Settings</button>
    <button class="nav-btn" onclick="window.location.href='/logout'">🔓 Logout</button>
  </div>

  <div class="main">

    <div class="hero">
      <h1>Willkommen ${user} 👋</h1>
      <p>Premium Interactive Dashboard Experience</p>
    </div>

    <div class="grid">

      <div class="card">
        <h3>⏰ Live Time</h3>
        <div id="clock" class="big"></div>
      </div>

      <div class="card">
        <h3>💻 System Status</h3>
        <div class="big">Optimal</div>
        <div class="progress">
          <div class="progress-fill" style="width:92%"></div>
        </div>
      </div>

      <div class="card">
        <h3>📡 Network</h3>
        <div class="big">1.2 Gbps</div>
        <p style="opacity:.7;margin-top:8px;">Stable Connection</p>
      </div>

      <div class="card">
        <h3>🎵 Media Control</h3>
        <button class="action-btn" onclick="alert('Play Demo')">▶ Play</button>
        <button class="action-btn" onclick="alert('Next Demo')">⏭ Next</button>
      </div>

      <div class="card">
        <h3>🔔 Notifications</h3>
        <p>• 3 New Alerts</p>
        <p>• Backup Complete</p>
        <p>• Sync Successful</p>
      </div>

      <div class="card">
        <h3>⚙ Quick Settings</h3>
        <div class="toggle"><span>Wi-Fi</span><div class="switch"></div></div>
        <div class="toggle"><span>Bluetooth</span><div class="switch"></div></div>
        <div class="toggle"><span>Cloud Sync</span><div class="switch"></div></div>
      </div>

      <div class="card">
        <h3>🚀 Actions</h3>
        <button class="action-btn" onclick="alert('Launching Sequence...')">Launch</button>
        <button class="action-btn" onclick="alert('Diagnostics Started')">Diagnostics</button>
      </div>

      <div class="card">
        <h3>👤 Profile</h3>
        <p>User: ${user}</p>
        <p>Role: Premium Member</p>
        <p>Status: Active</p>
      </div>

    </div>

    <div class="footer-note">
      Apple-inspired demo UI • Built with Node.js / Express
    </div>

  </div>

</div>

<script>
function updateClock(){
  document.getElementById("clock").innerText =
    new Date().toLocaleTimeString();
}
setInterval(updateClock,1000);
updateClock();
</script>

</body>
</html>
  `);
});

app.get("/logout", (req, res) => {
  res.set("WWW-Authenticate", 'Basic realm="Protected Area"');
  return res.status(401).send("Du wurdest ausgeloggt");
});

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});