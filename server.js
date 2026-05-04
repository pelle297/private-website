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
<title>Ultimate Dashboard</title>
<style>
:root{
  --accent:#4facfe;
  --accent2:#00c6ff;
}
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}
body{
  background:
    radial-gradient(circle at top left,#3a5fff 0%,transparent 30%),
    radial-gradient(circle at top right,#ff4d8d 0%,transparent 25%),
    radial-gradient(circle at bottom,#00c6ff 0%,transparent 35%),
    #0b0d14;
  color:white;
  min-height:100vh;
}
.wrapper{
  display:flex;
  min-height:100vh;
}
.sidebar{
  width:260px;
  padding:25px;
  background:rgba(255,255,255,.05);
  backdrop-filter:blur(18px);
  border-right:1px solid rgba(255,255,255,.08);
}
.logo{
  font-size:28px;
  font-weight:700;
  margin-bottom:30px;
}
.nav-btn{
  width:100%;
  padding:14px;
  margin-bottom:10px;
  border:none;
  border-radius:14px;
  background:rgba(255,255,255,.06);
  color:white;
  cursor:pointer;
  text-align:left;
  transition:.25s;
}
.nav-btn:hover{
  background:rgba(255,255,255,.12);
  transform:translateX(5px);
}
.main{
  flex:1;
  padding:30px;
}
.hero{
  padding:28px;
  border-radius:24px;
  background:rgba(255,255,255,.07);
  backdrop-filter:blur(18px);
  border:1px solid rgba(255,255,255,.08);
  margin-bottom:24px;
}
.hero h1{
  font-size:34px;
}
.hero p{
  opacity:.75;
  margin-top:6px;
}
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:20px;
}
.card{
  background:rgba(255,255,255,.07);
  backdrop-filter:blur(18px);
  border:1px solid rgba(255,255,255,.08);
  border-radius:22px;
  padding:22px;
  box-shadow:0 15px 30px rgba(0,0,0,.25);
}
.card h3{
  margin-bottom:14px;
}
.big{
  font-size:30px;
  font-weight:700;
}
.progress{
  width:100%;
  height:10px;
  background:rgba(255,255,255,.08);
  border-radius:999px;
  overflow:hidden;
  margin-top:10px;
}
.fill{
  height:100%;
  border-radius:999px;
  background:linear-gradient(90deg,var(--accent),var(--accent2));
}
.btn{
  width:100%;
  padding:12px;
  margin-top:10px;
  border:none;
  border-radius:12px;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  color:white;
  cursor:pointer;
  font-weight:600;
}
.btn:hover{
  filter:brightness(1.08);
}
.todo-input{
  width:100%;
  padding:10px;
  border:none;
  border-radius:10px;
  margin-bottom:10px;
}
.todo-item{
  background:rgba(255,255,255,.06);
  padding:10px;
  border-radius:10px;
  margin-bottom:8px;
  cursor:pointer;
}
.theme-row{
  display:flex;
  gap:10px;
  margin-top:10px;
}
.theme-dot{
  width:28px;
  height:28px;
  border-radius:50%;
  cursor:pointer;
}
textarea{
  width:100%;
  min-height:100px;
  border:none;
  border-radius:12px;
  padding:12px;
  resize:none;
}
.footer{
  margin-top:25px;
  opacity:.5;
  font-size:13px;
}
@media(max-width:900px){
  .sidebar{display:none;}
}
</style>
</head>
<body>

<div class="wrapper">

<div class="sidebar">
  <div class="logo">⚡ UltraPanel</div>
  <button class="nav-btn">🏠 Dashboard</button>
  <button class="nav-btn">📊 Analytics</button>
  <button class="nav-btn">🎵 Media</button>
  <button class="nav-btn">⚙ Settings</button>
  <button class="nav-btn" onclick="window.location.href='/logout'">🔓 Logout</button>
</div>

<div class="main">

<div class="hero">
  <h1>Willkommen ${user} 👋</h1>
  <p>Ultimate Premium Interactive Dashboard</p>
</div>

<div class="grid">

  <div class="card">
    <h3>⏰ Uhrzeit</h3>
    <div id="clock" class="big"></div>
    <div id="date" style="opacity:.7;margin-top:8px;"></div>
  </div>

  <div class="card">
    <h3>🌤 Wetter</h3>
    <div class="big">22°C</div>
    <p>Sonnig • Hannover</p>
  </div>

  <div class="card">
    <h3>💻 CPU Usage</h3>
    <div class="big">78%</div>
    <div class="progress"><div class="fill" style="width:78%"></div></div>
  </div>

  <div class="card">
    <h3>🧠 RAM Usage</h3>
    <div class="big">12.4 GB</div>
    <div class="progress"><div class="fill" style="width:62%"></div></div>
  </div>

  <div class="card">
    <h3>📝 Notes</h3>
    <textarea placeholder="Schreib etwas..."></textarea>
  </div>

  <div class="card">
    <h3>✅ ToDo Liste</h3>
    <input id="todoInput" class="todo-input" placeholder="Neue Aufgabe...">
    <button class="btn" onclick="addTodo()">Hinzufügen</button>
    <div id="todoList" style="margin-top:12px;"></div>
  </div>

  <div class="card">
    <h3>🎵 Musikplayer</h3>
    <button class="btn" onclick="alert('Play')">▶ Play</button>
    <button class="btn" onclick="alert('Pause')">⏸ Pause</button>
    <button class="btn" onclick="alert('Next')">⏭ Next</button>
  </div>

  <div class="card">
    <h3>🎨 Theme Accent</h3>
    <div class="theme-row">
      <div class="theme-dot" style="background:#4facfe" onclick="setTheme('#4facfe','#00c6ff')"></div>
      <div class="theme-dot" style="background:#ff4d8d" onclick="setTheme('#ff4d8d','#ff9966')"></div>
      <div class="theme-dot" style="background:#7f5cff" onclick="setTheme('#7f5cff','#b06cff')"></div>
      <div class="theme-dot" style="background:#00d26a" onclick="setTheme('#00d26a','#36ff9f')"></div>
    </div>
  </div>

  <div class="card">
    <h3>🔔 Notifications</h3>
    <p>• Build completed</p>
    <p>• Sync successful</p>
    <p>• Backup saved</p>
  </div>

  <div class="card">
    <h3>👤 Profile</h3>
    <p>User: ${user}</p>
    <p>Plan: Premium</p>
    <p>Status: Active</p>
  </div>

</div>

<div class="footer">
  Ultimate Dashboard Demo • Node.js / Express / Render
</div>

</div>
</div>

<script>
function updateClock(){
  const now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
  document.getElementById("date").innerText = now.toLocaleDateString();
}
setInterval(updateClock,1000);
updateClock();

function setTheme(a,b){
  document.documentElement.style.setProperty('--accent',a);
  document.documentElement.style.setProperty('--accent2',b);
}

function addTodo(){
  const input=document.getElementById("todoInput");
  const list=document.getElementById("todoList");
  if(!input.value.trim()) return;

  const item=document.createElement("div");
  item.className="todo-item";
  item.innerText=input.value;
  item.onclick=()=>item.remove();

  list.appendChild(item);
  input.value="";
}
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