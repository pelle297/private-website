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
    challenge: true
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
<title>Enterprise Dashboard</title>
<style>
*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}
body{
background:#f3f6fb;
color:#111827;
}
.wrapper{
display:flex;
min-height:100vh;
}
.sidebar{
width:270px;
background:#fff;
border-right:1px solid #e5e7eb;
padding:28px;
}
.logo{
font-size:24px;
font-weight:700;
margin-bottom:35px;
}
.nav-btn{
width:100%;
padding:14px 16px;
margin-bottom:10px;
border:none;
border-radius:12px;
background:transparent;
cursor:pointer;
text-align:left;
font-size:15px;
transition:.2s;
}
.nav-btn:hover{
background:#f3f4f6;
}
.main{
flex:1;
padding:30px;
}
.topbar{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:28px;
}
.search{
padding:12px 16px;
width:300px;
border:1px solid #d1d5db;
border-radius:12px;
background:#fff;
}
.user-pill{
background:#fff;
padding:12px 18px;
border-radius:12px;
border:1px solid #e5e7eb;
font-weight:600;
}
.hero{
background:linear-gradient(135deg,#2563eb,#4f46e5);
padding:30px;
border-radius:22px;
color:white;
margin-bottom:24px;
}
.hero h1{
font-size:32px;
margin-bottom:8px;
}
.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
gap:20px;
}
.card{
background:#fff;
border:1px solid #e5e7eb;
border-radius:18px;
padding:22px;
box-shadow:0 8px 20px rgba(0,0,0,.04);
}
.card h3{
font-size:15px;
color:#6b7280;
margin-bottom:12px;
}
.big{
font-size:30px;
font-weight:700;
}
.progress{
height:10px;
background:#e5e7eb;
border-radius:999px;
overflow:hidden;
margin-top:12px;
}
.fill{
height:100%;
background:#2563eb;
}
.list-item{
padding:10px 0;
border-bottom:1px solid #f1f5f9;
font-size:14px;
}
.badge{
display:inline-block;
padding:5px 10px;
border-radius:999px;
font-size:12px;
font-weight:600;
background:#dcfce7;
color:#166534;
}
.task{
padding:12px;
background:#f9fafb;
border-radius:12px;
margin-bottom:10px;
}
.team{
display:flex;
align-items:center;
gap:12px;
margin-bottom:12px;
}
.avatar{
width:42px;
height:42px;
border-radius:50%;
background:#2563eb;
color:#fff;
display:flex;
align-items:center;
justify-content:center;
font-weight:700;
}
.btn{
width:100%;
padding:12px;
border:none;
border-radius:12px;
background:#2563eb;
color:#fff;
cursor:pointer;
font-weight:600;
margin-top:10px;
}
.btn:hover{
background:#1d4ed8;
}
.footer{
margin-top:28px;
font-size:13px;
color:#9ca3af;
}
@media(max-width:950px){
.sidebar{display:none;}
.search{width:180px;}
}
</style>
</head>
<body>

<div class="wrapper">

<div class="sidebar">
<div class="logo">Enterprise</div>

<button class="nav-btn">Dashboard</button>
<button class="nav-btn">Analytics</button>
<button class="nav-btn">Revenue</button>
<button class="nav-btn">Projects</button>
<button class="nav-btn">Team</button>
<button class="nav-btn">Messages</button>
<button class="nav-btn">Calendar</button>
<button class="nav-btn">Settings</button>
<button class="nav-btn" onclick="window.location.href='/logout'">Logout</button>
</div>

<div class="main">

<div class="topbar">
<input class="search" placeholder="Search anything...">
<div class="user-pill">${user}</div>
</div>

<div class="hero">
<h1>Welcome back, ${user}</h1>
<p>Your business overview and productivity insights for today.</p>
</div>

<div class="grid">

<div class="card">
<h3>Monthly Revenue</h3>
<div class="big">€82,450</div>
</div>

<div class="card">
<h3>New Customers</h3>
<div class="big">1,284</div>
</div>

<div class="card">
<h3>Conversion Rate</h3>
<div class="big">14.8%</div>
</div>

<div class="card">
<h3>System Health</h3>
<div class="big">96%</div>
<div class="progress"><div class="fill" style="width:96%"></div></div>
</div>

<div class="card">
<h3>Performance Analytics</h3>
<div class="list-item">Traffic Growth <strong>+24%</strong></div>
<div class="list-item">Sales Trend <strong>+18%</strong></div>
<div class="list-item">Bounce Rate <strong>-12%</strong></div>
</div>

<div class="card">
<h3>Recent Activity</h3>
<div class="list-item">John updated pricing page</div>
<div class="list-item">Anna uploaded report.pdf</div>
<div class="list-item">Server deployment completed</div>
<div class="list-item">Backup created successfully</div>
</div>

<div class="card">
<h3>Project Status</h3>
<div class="task">Website Redesign <span class="badge">Done</span></div>
<div class="task">Marketing Campaign <span class="badge">Active</span></div>
<div class="task">SEO Optimization <span class="badge">Pending</span></div>
</div>

<div class="card">
<h3>Team Members</h3>
<div class="team"><div class="avatar">A</div> Anna Müller</div>
<div class="team"><div class="avatar">J</div> John Smith</div>
<div class="team"><div class="avatar">L</div> Lisa Becker</div>
</div>

<div class="card">
<h3>Calendar</h3>
<div class="list-item">09:00 Team Meeting</div>
<div class="list-item">11:30 Product Review</div>
<div class="list-item">14:00 Client Call</div>
<div class="list-item">17:00 Weekly Wrap-up</div>
</div>

<div class="card">
<h3>Messages</h3>
<div class="list-item">Anna: Can you review the draft?</div>
<div class="list-item">John: Deployment successful.</div>
<div class="list-item">Lisa: Meeting moved to 3 PM.</div>
</div>

<div class="card">
<h3>Quick Actions</h3>
<button class="btn" onclick="alert('Generating Report...')">Generate Report</button>
<button class="btn" onclick="alert('Exporting Data...')">Export Data</button>
<button class="btn" onclick="alert('Launching Workflow...')">Launch Workflow</button>
</div>

<div class="card">
<h3>Account Overview</h3>
<div class="list-item">Plan: Enterprise</div>
<div class="list-item">Status: Active</div>
<div class="list-item">Renewal: 28 Days</div>
<div class="list-item">Storage: 78 / 100 GB</div>
</div>

</div>

<div class="footer">
Enterprise Professional Dashboard • Premium UI Demo
</div>

</div>
</div>

</body>
</html>
  `);
});

app.get("/logout", (req, res) => {
  res.set("WWW-Authenticate", 'Basic realm="Protected Area"');
  res.status(401).send("Logged out");
});

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});