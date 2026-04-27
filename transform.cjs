const fs = require('fs');

let code = fs.readFileSync('c:\\Users\\ASUS\\.gemini\\antigravity\\scratch\\medibed\\src\\App.jsx', 'utf8');

// 1. Add ADMINS array and modify Login component
code = code.replace(
  "const C = {\n  bg:\"#0d0d14\",",
  `const ADMINS = [
  { id: "A00", username: "admin", password: "admin123", role: "SuperAdmin" },
  { id: "A01", username: "cityadmin", password: "city123", role: "HospitalAdmin", hospitalId: "H01", title: "City General Admin" },
  { id: "A02", username: "westadmin", password: "west123", role: "HospitalAdmin", hospitalId: "H02", title: "Westside Admin" },
];\n\nconst C = {\n  bg:"#0d0d14",`
);

const loginFind = /function Login\(\{[^}]*\}\) \{[\s\S]*?return \([\s\S]*?\n\}\n/;
const loginReplace = `function Login({ onLogin }) {
  const [u,setU]=useState(""); const [p,setP]=useState(""); const [err,setErr]=useState("");
  const IS = { width:"100%", padding:"10px 14px", borderRadius:8, border:\`1px solid \${C.border}\`, backgroundColor:C.panel, color:C.text, fontSize:14, outline:"none", boxSizing:"border-box" };
  return (
    <div style={{ minHeight:"100vh", backgroundColor:C.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>
      <div style={{ backgroundColor:C.card, border:\`1px solid \${C.border}\`, borderRadius:16, padding:40, width:360, boxShadow:"0 24px 60px #000a" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:28, fontWeight:800, color:C.accent, letterSpacing:-1 }}>MediBed</div>
          <div style={{ color:C.muted, fontSize:13, marginTop:4 }}>Admin Portal · Hospital Bed Management</div>
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ color:C.sub, fontSize:12, marginBottom:6, fontWeight:600 }}>USERNAME</div>
          <input style={IS} value={u} onChange={e=>setU(e.target.value)} placeholder="admin" autoFocus/>
        </div>
        <div style={{ marginBottom:20 }}>
          <div style={{ color:C.sub, fontSize:12, marginBottom:6, fontWeight:600 }}>PASSWORD</div>
          <input style={IS} type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="••••••••" onKeyDown={e=>{if(e.key==="Enter") document.getElementById("loginBtn").click();}}/>
        </div>
        {err&&<div style={{ color:C.red, fontSize:12, marginBottom:12, textAlign:"center" }}>{err}</div>}
        <button id="loginBtn" onClick={()=>{ 
            const adminUser = ADMINS.find(x => x.username === u && x.password === p);
            if(adminUser) onLogin(adminUser); 
            else setErr("Invalid credentials. Try demo accounts."); 
          }}
          style={{ width:"100%", padding:11, borderRadius:8, border:"none", backgroundColor:C.accent, color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}>
          Sign In
        </button>
        <div style={{ color:C.muted, fontSize:11, textAlign:"center", marginTop:14 }}>SuperAdmin: admin / admin123</div>
        <div style={{ color:C.muted, fontSize:11, textAlign:"center", marginTop:4 }}>City Admin: cityadmin / city123</div>
        <div style={{ color:C.muted, fontSize:11, textAlign:"center", marginTop:4 }}>West Admin: westadmin / west123</div>
      </div>
    </div>
  );
}
`;
code = code.replace(loginFind, loginReplace);

// 2. User state modification
code = code.replace(
  "const [loggedIn,setLoggedIn]=useState(false);",
  "const [user,setUser]=useState(null);"
);
code = code.replace(
  "if(!loggedIn) return <Login onLogin={()=>setLoggedIn(true)}/>;",
  `if(!user) return <Login onLogin={(u)=>setUser(u)}/>;

  const isSuper = user.role === "SuperAdmin";
  const hId = user.hospitalId;
  const visibleHospitals = data.hospitals.filter(h => isSuper || h.id === hId);
  const visibleEmergencies = data.emergencies.filter(e => isSuper || e.hospital === hId || e.hospital === "" || !e.hospital);
  const vEmrgCount = visibleEmergencies.filter(e=>e.status==="Pending").length;`
);

// 3. Header Welcome text
code = code.replace(
  "<div style={{ fontSize:24, fontWeight:800, color:C.text }}>Welcome back, Admin.</div>",
  "<div style={{ fontSize:24, fontWeight:800, color:C.text }}>Welcome back, {user.title || \"Super Admin\"}.</div>"
);

// Replace emergency counters
code = code.replaceAll(
  "data.emergencies.filter(e=>e.status===\"Pending\").length",
  "vEmrgCount"
);

// Re-map visible emergencies in specific spots
code = code.replaceAll(
  "{data.emergencies.slice(0,2).map(e=>(",
  "{visibleEmergencies.slice(0,2).map(e=>("
);
code = code.replaceAll(
  "{data.emergencies.map(e=>(",
  "{visibleEmergencies.map(e=>("
);

// 4. Data filtering per hospital
code = code.replaceAll(
  "data.hospitals.map",
  "visibleHospitals.map"
);

// Allocation map
code = code.replaceAll(
  "data.patients.filter(p=>p.status===\"Admitted\" && (!form.allocHospital || p.hospital === form.allocHospital)).map",
  "data.patients.filter(p=>p.status===\"Admitted\" && (isSuper || p.hospital===hId) && (!form.allocHospital || p.hospital === form.allocHospital)).map"
);

code = code.replaceAll(
  "data.beds.filter(b=>b.status===\"Available\" && (!form.allocHospital || b.hospital === form.allocHospital)).map",
  "data.beds.filter(b=>b.status===\"Available\" && (isSuper || b.hospital===hId) && (!form.allocHospital || b.hospital === form.allocHospital)).map"
);

code = code.replaceAll(
  "rows={data.patients.filter(p=>p.bed!==\"—\")}",
  "rows={data.patients.filter(p=>p.bed!==\"—\" && (isSuper || p.hospital===hId))}"
);

// Unassigned patients display - only show if SuperAdmin
code = code.replace(
  "const uPatients = data.patients.filter(p => (!p.hospital || p.hospital === \"—\") && p.name.toLowerCase().includes(search.toLowerCase()));",
  "const uPatients = isSuper ? data.patients.filter(p => (!p.hospital || p.hospital === \"—\") && p.name.toLowerCase().includes(search.toLowerCase())) : [];"
);

// Records Mapping - limit to visible hospitals if not SuperAdmin
code = code.replace(
  "rows={data.records}",
  "rows={data.records.filter(r => isSuper || data.patients.find(p=>p.id===r.patient)?.hospital === hId)}"
);
code = code.replace(
  "{data.records.slice(0,3).map(r=>(",
  "{data.records.filter(r => isSuper || data.patients.find(p=>p.id===r.patient)?.hospital === hId).slice(0,3).map(r=>("
);

// Hide add hospital / add doctor if not SuperAdmin
code = code.replace(
  "<Btn onClick={()=>setModal({type:\"addHospital\"})}>+ Add Hospital</Btn>",
  "{isSuper && <Btn onClick={()=>setModal({type:\"addHospital\"})}>+ Add Hospital</Btn>}"
);
code = code.replace(
  "<Btn onClick={()=>setModal({type:\"addDoctor\"})}>+ Add Doctor</Btn>",
  "{isSuper && <Btn onClick={()=>setModal({type:\"addDoctor\"})}>+ Add Doctor</Btn>}"
);

// Header SA / HA
code = code.replace(
  "<div style={{ width: 36, height: 36, borderRadius: \"50%\", background:\`linear-gradient(135deg, \${C.purple}, \${C.accent})\`, display:\"flex\", alignItems:\"center\", justifyContent:\"center\", color:\"white\", fontWeight:800, fontSize:14, marginLeft:6, boxShadow:\`0 4px 12px \${C.accent}44\` }}>AD</div>",
  "<div style={{ width: 36, height: 36, borderRadius: \"50%\", background:\`linear-gradient(135deg, \${C.purple}, \${C.accent})\`, display:\"flex\", alignItems:\"center\", justifyContent:\"center\", color:\"white\", fontWeight:800, fontSize:14, marginLeft:6, boxShadow:\`0 4px 12px \${C.accent}44\` }}>{isSuper ? \"SA\" : \"HA\"}</div>"
);

// Logout logic
code = code.replace(
  "onClick={()=>setLoggedIn(false)}",
  "onClick={()=>setUser(null)}"
);

// Global Search
code = code.replace(
  "data.patients.filter(p=>p.name.toLowerCase().includes(form.query) || p.id.toLowerCase().includes(form.query)).map",
  "data.patients.filter(p=>(isSuper || p.hospital===hId) && (p.name.toLowerCase().includes(form.query) || p.id.toLowerCase().includes(form.query))).map"
);
code = code.replace(
  "data.doctors.filter(p=>p.name.toLowerCase().includes(form.query)).map",
  "data.doctors.filter(p=>(isSuper || p.hospital===hId) && p.name.toLowerCase().includes(form.query)).map"
);
code = code.replace(
  "data.hospitals.filter(p=>p.name.toLowerCase().includes(form.query)",
  "visibleHospitals.filter(p=>p.name.toLowerCase().includes(form.query)"
);
code = code.replace(
  "data.beds.filter(b=>b.id.toLowerCase().includes(form.query)).map",
  "data.beds.filter(b=>(isSuper || b.hospital === hId) && b.id.toLowerCase().includes(form.query)).map"
);

code = code.replaceAll("hospital:form.hospital||data.hospitals[0].id", "hospital:form.hospital||(isSuper?data.hospitals[0].id:hId)");
code = code.replaceAll("hospital:form.hospital||\"—\"", "hospital:form.hospital||(isSuper?\"—\":hId)");
code = code.replaceAll("hospital:form.hospital||\"H01\"", "hospital:form.hospital||(isSuper?\"H01\":hId)");

fs.writeFileSync('c:\\Users\\ASUS\\.gemini\\antigravity\\scratch\\medibed\\src\\App.jsx', code);
console.log('App.jsx updated perfectly.');
