import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabaseClient";

const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const BedIcon    = ({ size }) => <Icon size={size} d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3M2 9h20M2 9v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9M6 13h4m4 0h4" />;
const UserIcon   = ({ size }) => <Icon size={size} d={["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"]} />;
const WardIcon   = ({ size }) => <Icon size={size} d={["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","M9 22V12h6v10"]} />;
const AllocIcon  = ({ size }) => <Icon size={size} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />;
const RecordIcon = ({ size }) => <Icon size={size} d={["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"]} />;
const EmergIcon  = ({ size }) => <Icon size={size} d={["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"]} />;
const DashIcon   = ({ size }) => <Icon size={size} d={["M3 3h7v7H3z","M14 3h7v7h-7z","M14 14h7v7h-7z","M3 14h7v7H3z"]} />;
const HospIcon   = ({ size }) => <Icon size={size} d={["M3 21h18M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14M9 11h6M12 8v6"]} />;
const LogoutIcon = ({ size }) => <Icon size={size} d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"]} />;
const EditIcon   = ({ size }) => <Icon size={size} d={["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"]} />;
const BellIcon   = ({ size }) => <Icon size={size} d={["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"]} />;
const SearchIcon = ({ size }) => <Icon size={size} d={["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z","M21 21l-4.35-4.35"]} />;



const C = {
  bg:"#0d0d14", panel:"#0d0d14", card:"#13131f", border:"#1e1e2e",
  accent:"#a855f7", purple:"#8b5cf6", green:"#22c55e",
  orange:"#f97316", red:"#ef4444", text:"#e2e8f0", muted:"#64748b", sub:"#8b8999",
};

const pill = (color, label) => (
  <span style={{ padding:"2px 10px", borderRadius:999, fontSize:11, fontWeight:700, backgroundColor:`${color}22`, color, border:`1px solid ${color}44` }}>{label}</span>
);
const statusColor = s => s==="Available"||s==="Active"||s==="Admitted"?C.green:s==="Occupied"||s==="Discharged"?C.muted:s==="Critical"?C.red:s==="High"?C.orange:C.accent;

function Login({ onLogin }) {
  const [u,setU]=useState("admin"); const [p,setP]=useState("admin123"); const [err,setErr]=useState("");
  const IS = { width:"100%", padding:"10px 14px", borderRadius:8, border:`1px solid ${C.border}`, backgroundColor:C.panel, color:C.text, fontSize:14, outline:"none", boxSizing:"border-box" };
  return (
    <div style={{ minHeight:"100vh", backgroundColor:C.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>
      <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:40, width:360, boxShadow:"0 24px 60px #000a" }}>
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
        <button id="loginBtn" onClick={async ()=>{ 
            setErr("");
            const res = await onLogin(u, p);
            if(!res.success) setErr(res.message); 
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

function StatCard({ label, value, sub, color, icon }) {
  return (
    <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"18px 20px", display:"flex", gap:14, alignItems:"center" }}>
      <div style={{ width:46, height:46, borderRadius:10, backgroundColor:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center", color, flexShrink:0 }}>{icon}</div>
      <div>
        <div style={{ fontSize:26, fontWeight:800, color:C.text, lineHeight:1 }}>{value}</div>
        <div style={{ fontSize:12, color:C.muted, marginTop:3 }}>{label}</div>
        {sub&&<div style={{ fontSize:11, color, marginTop:2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function BarChart() {
  const data=[{day:"Mon",occ:55},{day:"Tue",occ:62},{day:"Wed",occ:70},{day:"Thu",occ:65},{day:"Fri",occ:80},{day:"Sat",occ:72},{day:"Sun",occ:65}];
  return (
    <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
      <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:16 }}>Weekly Bed Occupancy</div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:110 }}>
        {data.map(d=>(
          <div key={d.day} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{ width:"60%", height:d.occ/120*100, backgroundColor:C.accent, borderRadius:"3px 3px 0 0" }}/>
            <div style={{ fontSize:10, color:C.muted }}>{d.day}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:10, fontSize:11, color:C.muted }}>
        <div style={{ width:10, height:10, borderRadius:2, backgroundColor:C.accent }}/> Occupied beds
      </div>
    </div>
  );
}

function Table({ cols, rows, renderRow }) {
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead><tr style={{ borderBottom:`1px solid ${C.border}` }}>
          {cols.map(c=><th key={c} style={{ padding:"10px 14px", textAlign:"left", color:C.muted, fontWeight:600, fontSize:11, letterSpacing:.5, whiteSpace:"nowrap" }}>{c.toUpperCase()}</th>)}
        </tr></thead>
        <tbody>{rows.map((r,i)=><tr key={i} style={{ borderBottom:`1px solid ${C.border}22` }}>{renderRow(r)}</tr>)}</tbody>
      </table>
    </div>
  );
}
const TD=({children,mono})=><td style={{ padding:"11px 14px", color:C.text, fontFamily:mono?"monospace":"inherit", whiteSpace:"nowrap" }}>{children}</td>;

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:"fixed", inset:0, backgroundColor:"#000c", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:28, width:460, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 30px 80px #0009" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div style={{ fontWeight:700, fontSize:16, color:C.text }}>{title}</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:C.muted, fontSize:20, cursor:"pointer" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const IS2 = { width:"100%", padding:"9px 12px", borderRadius:7, border:`1px solid ${C.border}`, backgroundColor:C.panel, color:C.text, fontSize:13, outline:"none", boxSizing:"border-box" };
const Field=({label,children})=><div style={{ marginBottom:14 }}><div style={{ color:C.sub, fontSize:11, fontWeight:600, marginBottom:5 }}>{label}</div>{children}</div>;
const Btn=({onClick,color=C.accent,children,small})=><button onClick={onClick} style={{ padding:small?"5px 12px":"9px 18px", borderRadius:7, border:"none", backgroundColor:color, color:"#fff", fontWeight:600, fontSize:small?12:13, cursor:"pointer" }}>{children}</button>;

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Dashboard");
  const [data, setData] = useState({
    stats: { total: 0, available: 0, occupied: 0, icu: 0, emergency: 0 },
    patients: [],
    beds: [],
    wards: [],
    records: [],
    hospitals: [],
    doctors: [],
    emergencies: [],
  });
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [
        { data: summary },
        { data: doctors },
        { data: wards },
        { data: beds },
        { data: patients },
        { data: emergencies },
        { data: records },
      ] = await Promise.all([
        supabase.from("v_hospital_summary").select("*"),
        supabase.from("doctors").select("*"),
        supabase.from("wards").select("*"),
        supabase.from("beds").select("*"),
        supabase.from("patients").select("*"),
        supabase.from("emergencies").select("*"),
        supabase.from("records").select("*"),
      ]);

      const mappedData = {
        hospitals: summary || [],
        doctors: (doctors || []).map(d => ({ ...d, hospital: d.hospital_id })),
        wards: (wards || []).map(w => ({ ...w, hospital: w.hospital_id })),
        beds: (beds || []).map(b => ({ ...b, hospital: b.hospital_id, ward: b.ward_id })),
        patients: (patients || []).map(p => ({ ...p, hospital: p.hospital_id, doctor: p.doctor_id, bed: p.bed_id, ward: p.ward_id })),
        emergencies: (emergencies || []).map(e => ({ ...e, hospital: e.hospital_id })),
        records: (records || []).map(r => ({ ...r, patient: r.patient_id, patientName: r.patient_name, bed: r.bed_id })),
        stats: {
          total: summary?.reduce((acc, h) => acc + (h.total_beds || 0), 0) || 0,
          available: summary?.reduce((acc, h) => acc + (h.available_beds || 0), 0) || 0,
          occupied: summary?.reduce((acc, h) => acc + (h.occupied_beds || 0), 0) || 0,
          icu: summary?.reduce((acc, h) => acc + (h.icu_beds || 0), 0) || 0,
          emergency: emergencies?.filter((e) => e.status === "Pending").length || 0,
        },
      };
      setData(mappedData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  const handleLogin = async (username, password) => {
    const { data: adminUser, error } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username.trim())
      .eq("password", password)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error("Login DB error:", error);
      return { success: false, message: "DB Error (might be paused): " + error.message };
    }
    if (!adminUser) return { success: false, message: "Invalid credentials" };
    
    // Map database snake_case to frontend camelCase
    const mappedUser = {
      ...adminUser,
      hospitalId: adminUser.hospital_id
    };
    
    setUser(mappedUser);
    return { success: true };
  };

  if (!user) return <Login onLogin={handleLogin} />;

  const isSuper = user.role === "SuperAdmin";
  const hId = user.hospitalId;
  const visibleHospitals = data.hospitals.filter(h => isSuper || h.hospital_id === hId);
  const visibleEmergencies = data.emergencies.filter(e => isSuper || e.hospital === hId || e.hospital === "" || !e.hospital);
  const vEmrgCount = visibleEmergencies.filter(e=>e.status==="Pending").length;
  const closeModal=()=>{setModal(null);setForm({});};
  const setF=(k,v)=>setForm(f=>({...f,[k]:v}));

  const NAV=[
    {id:"Dashboard", icon:<DashIcon size={16}/>},
    {id:"Directory", icon:<HospIcon size={16}/>},
    {id:"Patients",  icon:<UserIcon size={16}/>},
    {id:"Beds",      icon:<BedIcon size={16}/>},
    {id:"Wards",     icon:<WardIcon size={16}/>},
    {id:"Allocation",icon:<AllocIcon size={16}/>},
    {id:"Records",   icon:<RecordIcon size={16}/>},
    {id:"Emergency", icon:<EmergIcon size={16}/>},
  ];

  const pages = {
    Dashboard:(
      <div style={{ display:"flex", gap:"28px" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:20, flex:1 }}>
          <div style={{ backgroundColor:C.card, borderRadius:"16px", padding:"28px 32px", border:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              <div style={{ fontSize:24, fontWeight:800, color:C.text }}>Welcome back, {user.title || "Super Admin"}.</div>
              <div style={{ fontSize:14, color:C.muted }}>Hospital operations are running nominally. {vEmrgCount} actions pending.</div>
            </div>
            <div style={{ width:64, height:64, borderRadius:"50%", background:`linear-gradient(135deg, ${C.accent}, #7c3aed)`, boxShadow:`0 0 28px ${C.accent}44` }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            {[
              {label:"TOTAL SYSTEM BEDS", val:data.beds.length, color:C.purple, icon:<BedIcon size={24}/>},
              {label:"EMERGENCY REQS", val:vEmrgCount, color:C.red, icon:<EmergIcon size={24}/>}
            ].map(s=>(
              <div key={s.label} style={{ backgroundColor: C.card, borderRadius: "14px", padding: "20px", border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ fontSize:12, color:C.muted, fontWeight:600 }}>{s.label}</div>
                  <div style={{ fontSize:24, fontWeight:800, color:C.text }}>{s.val}</div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${s.color}44`, backgroundColor: `${s.color}11`, display:"flex", alignItems:"center", justifyContent:"center", color:s.color }}>{s.icon}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize:16, fontWeight:700, color:C.text, marginBottom:"16px", marginTop:"10px" }}>Network Facilities Overview</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            {visibleHospitals.map(h => {
              const availableBeds = h.available_beds;
              const totalBeds = h.total_beds;
              const fillPct = totalBeds > 0 ? ((totalBeds - availableBeds) / totalBeds) * 100 : 0;

              return (
                <div key={h.hospital_id} style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:24 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:18, color:C.text }}>{h.name}</div>
                      <div style={{ fontSize:13, color:C.muted, marginTop:4 }}>{h.locality} · ID: {h.hospital_id}</div>
                    </div>
                    {pill(C.green, "Active")}
                  </div>
                  
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:20 }}>
                    <div style={{ backgroundColor:C.panel, borderRadius:8, padding:14, border:`1px solid ${C.border}` }}>
                      <div style={{ color:C.sub, fontSize:12, marginBottom:4 }}>Available Beds</div>
                      <div style={{ fontSize:22, fontWeight:700, color:C.green }}>{availableBeds}<span style={{ fontSize:13, color:C.muted }}>/{totalBeds}</span></div>
                    </div>
                    <div style={{ backgroundColor:C.panel, borderRadius:8, padding:14, border:`1px solid ${C.border}` }}>
                      <div style={{ color:C.sub, fontSize:12, marginBottom:4 }}>Occupied Beds</div>
                      <div style={{ fontSize:22, fontWeight:700, color:C.orange }}>{h.occupied_beds}<span style={{ fontSize:13, color:C.muted }}>/{totalBeds}</span></div>
                    </div>
                    <div style={{ backgroundColor:C.panel, borderRadius:8, padding:14, border:`1px solid ${C.border}` }}>
                      <div style={{ color:C.sub, fontSize:12, marginBottom:4 }}>Active Doctors</div>
                      <div style={{ fontSize:22, fontWeight:700, color:C.text }}>{h.total_active_doctors}</div>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom:6, display:"flex", justifyContent:"space-between", fontSize:11 }}>
                    <span style={{ color:C.muted }}>Bed Occupancy</span>
                    <span style={{ color:fillPct > 80 ? C.red : C.text, fontWeight:700 }}>{Math.round(fillPct)}%</span>
                  </div>
                  <div style={{ height:6, backgroundColor:C.border, borderRadius:3, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${fillPct}%`, background:`linear-gradient(90deg, ${C.green}, ${fillPct > 80 ? C.red : C.orange})`, borderRadius:3 }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside style={{ width:"300px", borderLeft:`1px solid ${C.border}`, paddingLeft:"28px", display:"flex", flexDirection:"column", gap:"28px" }}>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
              <div style={{ fontSize:14, fontWeight:700, color:C.text }}>Emergency Reqs</div>
              <div style={{ fontSize:11, color:C.red, backgroundColor:`${C.red}22`, padding:"2px 8px", borderRadius:4 }}>{data.stats.emergency}</div>
            </div>
            {visibleEmergencies.slice(0,2).map(e=>(
              <div key={e.id} style={{ backgroundColor:C.card, borderRadius:"12px", padding:"16px", marginBottom:"10px", border:`1px solid ${C.border}`, display:"flex", gap:"14px", alignItems:"center" }}>
                <div style={{ width:44, height:44, borderRadius:"50%", backgroundColor:`${C.red}22`, border:`2px solid ${C.red}44`, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", color:C.red }}><EmergIcon size={20}/></div>
                <div style={{ display:"flex", flexDirection:"column", gap:"4px", flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{e.name}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{e.condition}</div>
                  <div style={{ fontSize:10, color:C.accent, marginTop:4 }}>{e.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
             <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:"16px" }}>Recent Reports</div>
             {data.records.filter(r => isSuper || data.patients.find(p=>p.id===r.patient)?.hospital === hId).slice(0,3).map(r=>(
              <div key={r.id} style={{ backgroundColor:C.card, borderRadius:"12px", padding:"14px 16px", marginBottom:"10px", border:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
                  <div style={{ width:36, height:36, borderRadius:"8px", backgroundColor:"#1a1a2e", display:"flex", alignItems:"center", justifyContent:"center", color:C.muted }}><RecordIcon size={16}/></div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
                    <div style={{ fontSize:12, fontWeight:600, color:C.text }}>{r.patientName}</div>
                    <div style={{ fontSize:10, color:C.muted }}>Bed {r.bed} · {r.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    ),

    Patients:(
      <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Patient Management</div>
          <div style={{ display:"flex", gap:10 }}>
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:C.muted }}><SearchIcon size={14}/></span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…" style={{ ...IS2, paddingLeft:32, width:200 }}/>
            </div>
            <Btn onClick={()=>setModal({type:"addPatient"})}>+ Add Patient</Btn>
          </div>
        </div>

        {visibleHospitals.map(h => {
          const hPatients = data.patients.filter(p => p.hospital === h.hospital_id && p.name.toLowerCase().includes(search.toLowerCase()));
          if(hPatients.length === 0) return null;
          return (
            <div key={h.hospital_id} style={{ marginBottom: 28, border:`1px solid ${C.border}55`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: C.accent, marginBottom: 12, fontSize: 14 }}>{h.name} <span style={{ color:C.muted, fontWeight:500, fontSize:12 }}>({h.hospital_id})</span></div>
              <Table
                cols={["Patient ID","Name","Age","Disease","Admission","Doctor","Bed","Ward","Status","Actions"]}
                rows={hPatients}
                renderRow={p=><>
                  <TD mono>{p.id}</TD><TD>{p.name}</TD><TD>{p.age}</TD><TD>{p.disease}</TD><TD>{p.admission}</TD>
                  <TD mono>{p.doctor}</TD><TD mono>{p.bed}</TD><TD>{p.ward}</TD>
                  <TD>{pill(statusColor(p.status),p.status)}</TD>
                  <td style={{ padding:"11px 14px" }}><div style={{ display:"flex", gap:6 }}>
                    <Btn small color={C.accent} onClick={()=>setModal({type:"editPatient",payload:p})}><EditIcon size={12}/></Btn>
                    {p.status==="Admitted"&&<Btn small color={C.orange} onClick={async ()=>{
                      await supabase.from("patients").update({status:"Discharged"}).eq("id", p.id);
                      await fetchData();
                    }}>Discharge</Btn>}
                  </div></td>
                </>}
              />
            </div>
          );
        })}

        {(() => {
          const uPatients = isSuper ? data.patients.filter(p => (!p.hospital || p.hospital === "—") && p.name.toLowerCase().includes(search.toLowerCase())) : [];
          if(uPatients.length === 0) return null;
          return (
            <div style={{ marginBottom: 20, border:`1px solid ${C.border}55`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: C.sub, marginBottom: 12, fontSize: 14 }}>Unassigned / External</div>
              <Table
                cols={["Patient ID","Name","Age","Disease","Admission","Doctor","Bed","Ward","Status","Actions"]}
                rows={uPatients}
                renderRow={p=><>
                  <TD mono>{p.id}</TD><TD>{p.name}</TD><TD>{p.age}</TD><TD>{p.disease}</TD><TD>{p.admission}</TD>
                  <TD mono>—</TD><TD mono>{p.bed}</TD><TD>{p.ward}</TD>
                  <TD>{pill(statusColor(p.status),p.status)}</TD>
                  <td style={{ padding:"11px 14px" }}><div style={{ display:"flex", gap:6 }}>
                    <Btn small color={C.accent} onClick={()=>setModal({type:"editPatient",payload:p})}><EditIcon size={12}/></Btn>
                    {p.status==="Admitted"&&<Btn small color={C.orange} onClick={async ()=>{
                      await supabase.from("patients").update({status:"Discharged"}).eq("id", p.id);
                      await fetchData();
                    }}>Discharge</Btn>}
                  </div></td>
                </>}
              />
            </div>
          );
        })()}

        {modal?.type==="addPatient"&&<Modal title="Add New Patient" onClose={closeModal}>
          {["name","age","disease","bed","ward"].map(k=><Field key={k} label={k.toUpperCase()}><input style={IS2} placeholder={k} onChange={e=>setF(k,e.target.value)}/></Field>)}
          <Field label="HOSPITAL">
            <select style={IS2} onChange={e=>setF("hospital",e.target.value)}>
              <option value="">Select Hospital</option>
              {visibleHospitals.map(h=><option key={h.hospital_id} value={h.hospital_id}>{h.name}</option>)}
            </select>
          </Field>
          <Field label="DOCTOR">
            <select style={IS2} onChange={e=>setF("doctor",e.target.value)}>
              <option value="">Select Doctor</option>
              {data.doctors.filter(d => !form.hospital || d.hospital === form.hospital).map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </Field>
          <Btn onClick={async ()=>{
            const id="P"+String(data.patients.length+1).padStart(3,"0");
            await supabase.from("patients").insert({
              id, name:form.name||"New", age:form.age||0, disease:form.disease||"—", 
              admission:new Date().toISOString().slice(0,10), bed_id:form.bed||"—", 
              ward_id:form.ward||"—", status:"Admitted", 
              hospital_id:form.hospital||(isSuper?null:hId), doctor_id:form.doctor||null
            });
            await fetchData();
            closeModal();
          }}>Save Patient</Btn>
        </Modal>}

        {modal?.type==="editPatient"&&<Modal title="Edit Patient" onClose={closeModal}>
          {["name","age","disease","bed","ward"].map(k=><Field key={k} label={k.toUpperCase()}><input style={IS2} defaultValue={modal.payload[k]} onChange={e=>setF(k,e.target.value)}/></Field>)}
          <Field label="HOSPITAL">
            <select style={IS2} defaultValue={modal.payload.hospital} onChange={e=>setF("hospital",e.target.value)}>
              <option value="—">Unassigned / External</option>
              {visibleHospitals.map(h=><option key={h.hospital_id} value={h.hospital_id}>{h.name}</option>)}
            </select>
          </Field>
          <Field label="DOCTOR">
            <select style={IS2} defaultValue={modal.payload.doctor} onChange={e=>setF("doctor",e.target.value)}>
              <option value="—">No Doctor Assigned</option>
              {data.doctors.filter(d => !(form.hospital || modal.payload.hospital) || d.hospital === (form.hospital || modal.payload.hospital) || (form.hospital || modal.payload.hospital) === "—").map(d=><option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </Field>
          <Btn onClick={async ()=>{
            await supabase.from("patients").update({
              name: form.name, age: form.age, disease: form.disease, 
              bed_id: form.bed, ward_id: form.ward, 
              hospital_id: form.hospital, doctor_id: form.doctor
            }).eq("id", modal.payload.id);
            await fetchData();
            closeModal();
          }}>Update Patient</Btn>
        </Modal>}
      </div>
    ),

    Beds:(
      <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Bed Management</div>
          <Btn onClick={()=>setModal({type:"addBed"})}>+ Add Bed</Btn>
        </div>

        {visibleHospitals.map(h => {
          const hBeds = data.beds.filter(b => b.hospital === h.hospital_id);
          if(hBeds.length === 0) return null;
          return (
            <div key={h.hospital_id} style={{ marginBottom: 28, border:`1px solid ${C.border}55`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: C.accent, marginBottom: 12, fontSize: 14 }}>{h.name} ({h.hospital_id})</div>
              
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
                {["General","ICU","Emergency"].map(t=>{
                  const typeBeds = hBeds.filter(b=>b.type===t); const avail=typeBeds.filter(b=>b.status==="Available").length;
                  return <div key={t} style={{ backgroundColor:C.panel, borderRadius:8, padding:14, border:`1px solid ${C.border}` }}>
                    <div style={{ color:C.sub, fontSize:12, marginBottom:4 }}>{t} Beds</div>
                    <div style={{ fontSize:20, fontWeight:700, color:C.text }}>{avail}<span style={{ fontSize:12, color:C.muted }}>/{typeBeds.length}</span></div>
                  </div>;
                })}
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {[...new Set(hBeds.map(b=>b.ward))].sort().map(wId => {
                  const wardBeds = hBeds.filter(b=>b.ward===wId);
                  const wName = data.wards.find(x=>x.id===wId)?.name || wId;
                  return (
                    <div key={wId} style={{ backgroundColor:C.panel, padding:16, border:`1px solid ${C.border}`, borderRadius:8 }}>
                      <div style={{ fontWeight:700, fontSize:13, color:C.text, marginBottom:12, paddingBottom:8, borderBottom:`1px solid ${C.border}` }}>{wName} <span style={{ color:C.muted, fontWeight:500 }}>({wId})</span></div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(72px, 1fr))", gap:12 }}>
                        {wardBeds.map(b=>(
                          <div 
                            key={b.id} 
                            onClick={async ()=>{
                              const newStatus = b.status === "Available" ? "Occupied" : "Available";
                              await supabase.from("beds").update({ status: newStatus }).eq("id", b.id);
                              await fetchData();
                            }}
                            title={`Click to mark ${b.status==="Available"?"Occupied":"Available"}`}
                            style={{
                              backgroundColor: b.status==="Available" ? `${C.green}18` : `${C.orange}18`,
                              border: `2px solid ${b.status==="Available" ? C.green : C.orange}88`,
                              borderRadius: 8, height: 72, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", cursor:"pointer", transition:"all 0.15s ease"
                            }}
                            onMouseOver={e=>{e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.borderColor=b.status==="Available"?C.green:C.orange;}}
                            onMouseOut={e=>{e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.borderColor=`${b.status==="Available"?C.green:C.orange}88`;}}
                          >
                            <div style={{ fontWeight:800, fontSize:15, color:b.status==="Available"?C.green:C.orange }}>{b.id}</div>
                            <div style={{ fontSize:10, color:b.status==="Available"?C.green:C.orange, opacity:0.8, marginTop:4, fontWeight:700, letterSpacing:0.5 }}>{b.type==="Emergency"?"EMER":b.type==="General"?"GEN":"ICU"}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {modal?.type==="addBed"&&<Modal title="Add New Bed" onClose={closeModal}>
          <Field label="BED ID"><input style={IS2} placeholder="e.g. B30" onChange={e=>setF("id",e.target.value)}/></Field>
          <Field label="TYPE"><select style={IS2} onChange={e=>setF("type",e.target.value)}><option>General</option><option>ICU</option><option>Emergency</option></select></Field>
          <Field label="WARD"><input style={IS2} placeholder="e.g. W1" onChange={e=>setF("ward",e.target.value)}/></Field>
          <Field label="HOSPITAL">
            <select style={IS2} onChange={e=>setF("hospital",e.target.value)}>
              <option value="">Select Hospital</option>
              {visibleHospitals.map(h=><option key={h.hospital_id} value={h.hospital_id}>{h.name}</option>)}
            </select>
          </Field>
          <Btn onClick={async ()=>{
            await supabase.from("beds").insert({
              id: form.id || "BXX", type: form.type || "General", status: "Available", ward_id: form.ward || "W1", hospital_id: form.hospital || (isSuper ? "H01" : hId)
            });
            await fetchData();
            closeModal();
          }}>Add Bed</Btn>
        </Modal>}
      </div>
    ),

    Wards:(
      <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Ward / Room Management</div>
          <Btn onClick={()=>setModal({type:"addWard"})}>+ Add Ward</Btn>
        </div>

        {visibleHospitals.map(h => {
          const hWards = data.wards.filter(w => w.hospital === h.hospital_id);
          if(hWards.length === 0) return null;
          return (
            <div key={h.hospital_id} style={{ marginBottom: 26 }}>
              <div style={{ fontWeight: 600, color: C.accent, marginBottom: 12, fontSize: 14, borderBottom:`1px solid ${C.border}`, paddingBottom:6 }}>{h.name} Wards</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
                {hWards.map(w=>(
                  <div key={w.id} style={{ backgroundColor:C.panel, borderRadius:10, padding:20, border:`1px solid ${C.border}` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                      <div><div style={{ fontWeight:700, color:C.text, fontSize:15 }}>{w.name}</div><div style={{ color:C.muted, fontSize:12 }}>ID: {w.id}</div></div>
                      <div style={{ textAlign:"right" }}><div style={{ fontSize:22, fontWeight:800, color:C.text }}>{w.total-w.occupied}</div><div style={{ fontSize:11, color:C.green }}>available</div></div>
                    </div>
                    <div style={{ height:8, borderRadius:4, backgroundColor:C.border, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${w.occupied/w.total*100}%`, background:`linear-gradient(90deg,${C.accent},${C.purple})`, borderRadius:4 }}/>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:C.muted, marginTop:6 }}><span>{w.occupied} occupied</span><span>{w.total} total</span></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {modal?.type==="addWard"&&<Modal title="Add Ward" onClose={closeModal}>
          <Field label="WARD ID"><input style={IS2} placeholder="W5" onChange={e=>setF("id",e.target.value)}/></Field>
          <Field label="WARD NAME"><input style={IS2} placeholder="Pediatric Ward" onChange={e=>setF("name",e.target.value)}/></Field>
          <Field label="TOTAL BEDS"><input style={IS2} type="number" placeholder="20" onChange={e=>setF("total",+e.target.value)}/></Field>
          <Field label="HOSPITAL">
            <select style={IS2} onChange={e=>setF("hospital",e.target.value)}>
              <option value="">Select Hospital</option>
              {visibleHospitals.map(h=><option key={h.hospital_id} value={h.hospital_id}>{h.name}</option>)}
            </select>
          </Field>
          <Btn onClick={async ()=>{
            await supabase.from("wards").insert({
              id: form.id || "W5", name: form.name || "New Ward", total: form.total || 0, hospital_id: form.hospital || (isSuper ? "H01" : hId)
            });
            await fetchData();
            closeModal();
          }}>Add Ward</Btn>
        </Modal>}
      </div>
    ),

    Allocation:(
      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
            <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:14 }}>Manual Allocation</div>
            <Field label="FILTER BY HOSPITAL">
              <select style={IS2} onChange={e=>setF("allocHospital",e.target.value)}>
                <option value="">-- All Hospitals --</option>
                {visibleHospitals.map(h=><option key={h.hospital_id} value={h.hospital_id}>{h.name}</option>)}
              </select>
            </Field>
            <Field label="SELECT PATIENT"><select style={IS2} onChange={e=>setF("patientId",e.target.value)}><option value="">-- choose patient --</option>{data.patients.filter(p=>p.status==="Admitted" && (isSuper || p.hospital===hId) && (!form.allocHospital || p.hospital === form.allocHospital)).map(p=><option key={p.id} value={p.id}>{p.id} – {p.name}</option>)}</select></Field>
            <Field label="SELECT BED"><select style={IS2} onChange={e=>setF("bedId",e.target.value)}><option value="">-- choose bed --</option>{data.beds.filter(b=>b.status==="Available" && (isSuper || b.hospital===hId) && (!form.allocHospital || b.hospital === form.allocHospital)).map(b=><option key={b.id} value={b.id}>{b.id} ({b.type}) – {b.ward}</option>)}</select></Field>
            <Btn onClick={async ()=>{
              if(!form.patientId||!form.bedId) return;
              await Promise.all([
                supabase.from("patients").update({ bed_id: form.bedId }).eq("id", form.patientId),
                supabase.from("beds").update({ status: "Occupied" }).eq("id", form.bedId)
              ]);
              await fetchData();
              setForm(f=>({...f, patientId:"", bedId:""}));
              alert(`Bed ${form.bedId} assigned to ${form.patientId}`);
            }}>Assign Bed</Btn>
          </div>
          <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
            <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:14 }}>Auto-Allocate (Smart)</div>
            <div style={{ backgroundColor:`${C.accent}11`, border:`1px solid ${C.accent}33`, borderRadius:8, padding:14, fontFamily:"monospace", fontSize:12, color:C.accent, marginBottom:14, lineHeight:1.7 }}>
              IF ICU required<br/>&nbsp;&nbsp;→ assign ICU bed in patient's hospital<br/>ELSE<br/>&nbsp;&nbsp;→ assign General bed
            </div>
            <Field label="PATIENT"><select style={IS2} onChange={e=>setF("autoPatient",e.target.value)}><option value="">-- choose patient --</option>{data.patients.filter(p=>p.status==="Admitted").map(p=><option key={p.id} value={p.id}>{p.id} – {p.name}</option>)}</select></Field>
            <Field label="REQUIRES ICU?"><select style={IS2} onChange={e=>setF("needsIcu",e.target.value==="yes")}><option value="no">No – General bed</option><option value="yes">Yes – ICU bed</option></select></Field>
            <Btn color={C.purple} onClick={async ()=>{
              if(!form.autoPatient) return;
              const patient = data.patients.find(p=>p.id===form.autoPatient);
              const type=form.needsIcu?"ICU":"General";
              const bed=data.beds.find(b=>b.type===type && b.status==="Available" && (!patient.hospital_id || b.hospital_id===patient.hospital_id));
              if(!bed){alert(`No available ${type} bed found in ${patient.hospital_id || "the network"}!`);return;}
              await Promise.all([
                supabase.from("patients").update({ bed_id: bed.id }).eq("id", form.autoPatient),
                supabase.from("beds").update({ status: "Occupied" }).eq("id", bed.id)
              ]);
              await fetchData();
              alert(`Auto-allocated ${bed.id} (${type}) to ${form.autoPatient}`);
              setForm(f=>({...f, autoPatient:""}));
            }}>Auto Allocate</Btn>
          </div>
        </div>
        <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
          <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:12 }}>Current Allocations</div>
          <Table
            cols={["Patient ID","Name","Hospital","Assigned Bed","Ward","Disease","Status"]}
            rows={data.patients.filter(p=>p.bed!=="—" && (isSuper || p.hospital===hId))}
            renderRow={p=>{
              const hName = data.hospitals.find(h=>h.hospital_id===p.hospital)?.name || p.hospital;
              return <><TD mono>{p.id}</TD><TD>{p.name}</TD><TD>{hName}</TD><TD mono>{p.bed}</TD><TD>{p.ward}</TD><TD>{p.disease}</TD><TD>{pill(statusColor(p.status),p.status)}</TD></>;
            }}
          />
        </div>
      </div>
    ),

    Records:(
      <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <div style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:18 }}>Admission & Discharge Records</div>
        <Table
          cols={["Record ID","Patient ID","Patient Name","Hospital","Bed","Admission","Discharge","Status"]}
          rows={data.records.filter(r => isSuper || data.patients.find(p=>p.id===r.patient)?.hospital === hId)}
          renderRow={r=>{
            const pAssigned = data.patients.find(p=>p.id===r.patient);
            const hId = pAssigned?.hospital || "—";
            const hName = data.hospitals.find(h=>h.hospital_id===hId)?.name || hId;
            return <><TD mono>{r.id}</TD><TD mono>{r.patient}</TD><TD>{r.patientName}</TD><TD>{hName}</TD><TD mono>{r.bed}</TD><TD>{r.admission}</TD><TD>{r.discharge}</TD><TD>{pill(r.status==="Active"?C.green:C.muted,r.status)}</TD></>;
          }}
        />
      </div>
    ),

    Emergency:(
      <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Emergency Requests</div>
            <span style={{ backgroundColor:`${C.red}22`, color:C.red, padding:"3px 10px", borderRadius:999, fontSize:11, fontWeight:700, border:`1px solid ${C.red}44` }}>
              {vEmrgCount} Pending
            </span>
          </div>
          <Btn color={C.red} onClick={()=>setModal({type:"addEmergency"})}>+ New Emergency</Btn>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {visibleEmergencies.map(e=>(
            <div key={e.id} style={{ backgroundColor:C.panel, borderRadius:10, padding:16, border:`1px solid ${e.priority==="Critical"?C.red+"55":C.orange+"44"}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                <div style={{ width:42, height:42, borderRadius:"50%", backgroundColor:`${e.priority==="Critical"?C.red:C.orange}22`, display:"flex", alignItems:"center", justifyContent:"center", color:e.priority==="Critical"?C.red:C.orange }}><EmergIcon size={18}/></div>
                <div>
                  <div style={{ color:C.text, fontWeight:700, fontSize:14 }}>{e.name} <span style={{ color:C.muted, fontWeight:400, fontSize:12 }}>· Age {e.age}</span></div>
                  <div style={{ color:C.sub, fontSize:13 }}>{e.condition} <span style={{ color:C.accent, marginLeft:8, fontWeight:600 }}>➔ {data.hospitals.find(h=>h.hospital_id===e.hospital)?.name || e.hospital || "Any Hospital"}</span></div>
                  <div style={{ color:C.muted, fontSize:11, marginTop:2 }}>{e.time} · {e.id}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                {pill(e.priority==="Critical"?C.red:C.orange,e.priority)}
                {pill(e.status==="Pending"?C.orange:C.green,e.status)}
                {e.status==="Pending"&&<Btn small color={C.green} onClick={async ()=>{
                  const bed=data.beds.find(b=>b.type==="Emergency"&&b.status==="Available"&&b.hospital_id===e.hospital_id);
                  if(!bed) { alert(`No Emergency bed available at ${data.hospitals.find(h=>h.hospital_id===e.hospital_id)?.name||e.hospital_id}!`); return; }
                  await Promise.all([
                    supabase.from("emergencies").update({ status: "Assigned" }).eq("id", e.id),
                    supabase.from("beds").update({ status: "Occupied" }).eq("id", bed.id)
                  ]);
                  await fetchData();
                }}>Assign Target Bed</Btn>}
              </div>
            </div>
          ))}
        </div>
        {modal?.type==="addEmergency"&&<Modal title="New Emergency Case" onClose={closeModal}>
          <Field label="PATIENT NAME"><input style={IS2} onChange={e=>setF("name",e.target.value)}/></Field>
          <Field label="AGE"><input style={IS2} type="number" onChange={e=>setF("age",e.target.value)}/></Field>
          <Field label="CONDITION"><input style={IS2} onChange={e=>setF("condition",e.target.value)}/></Field>
          <Field label="PRIORITY"><select style={IS2} onChange={e=>setF("priority",e.target.value)}><option>Critical</option><option>High</option><option>Medium</option></select></Field>
          <Field label="TARGET HOSPITAL">
            <select style={IS2} onChange={e=>setF("hospital",e.target.value)}>
              <option value="">-- Any Nearby Hospital --</option>
              {visibleHospitals.map(h=><option key={h.hospital_id} value={h.hospital_id}>{h.name}</option>)}
            </select>
          </Field>
          <Btn color={C.red} onClick={async ()=>{
            const id="EM"+String(data.emergencies.length+1).padStart(3,"0");
            const now=new Date();
            await supabase.from("emergencies").insert({
              id, name: form.name || "Unknown", age: form.age || 0, condition: form.condition || "—", 
              priority: form.priority || "Critical", hospital_id: form.hospital || (isSuper ? data.hospitals[0]?.hospital_id : hId), 
              time: `${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`, status: "Pending"
            });
            await fetchData();
            closeModal();
          }}>Submit Emergency</Btn>
        </Modal>}
      </div>
    ),
    Directory:(
      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Hospitals & Facilities</div>
            {isSuper && <Btn onClick={()=>setModal({type:"addHospital"})}>+ Add Hospital</Btn>}
          </div>
          <Table
            cols={["Hospital ID","Name","Locality","Beds (Avail/Total)","Status"]}
            rows={data.hospitals}
            renderRow={h=><>
              <TD mono>{h.hospital_id}</TD><TD>{h.name}</TD><TD>{h.locality}</TD><TD>{h.available_beds}/{h.total_beds}</TD>
              <TD>{pill(C.green, "Active")}</TD>
            </>}
          />
        </div>
        
        <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Doctors Network</div>
            {isSuper && <Btn onClick={()=>setModal({type:"addDoctor"})}>+ Add Doctor</Btn>}
          </div>
          <Table
            cols={["Doctor ID","Name","Specialty","Hospital ID","Status"]}
            rows={data.doctors}
            renderRow={d=><>
              <TD mono>{d.id}</TD><TD>{d.name}</TD><TD>{d.specialty}</TD><TD mono>{d.hospital}</TD>
              <TD>{pill(d.status==="Available"?C.green:C.muted,d.status)}</TD>
            </>}
          />
        </div>

        {modal?.type==="addHospital"&&<Modal title="Add New Hospital" onClose={closeModal}>
          <Field label="NAME"><input style={IS2} placeholder="City General" onChange={e=>setF("name",e.target.value)}/></Field>
          <Field label="LOCATION"><input style={IS2} placeholder="Downtown" onChange={e=>setF("location",e.target.value)}/></Field>
          <Field label="CAPACITY"><input style={IS2} type="number" placeholder="200" onChange={e=>setF("capacity",e.target.value)}/></Field>
          <Btn onClick={async ()=>{
            const id="H"+String(data.hospitals.length+1).padStart(2,"0");
            await supabase.from("hospitals").insert({
              id, name: form.name || "New Hospital", location: form.location || "—", capacity: form.capacity || 0, status: "Active"
            });
            await fetchData();
            closeModal();
          }}>Save Hospital</Btn>
        </Modal>}
        {modal?.type==="addDoctor"&&<Modal title="Add New Doctor" onClose={closeModal}>
          <Field label="NAME"><input style={IS2} placeholder="Dr. Smith" onChange={e=>setF("name",e.target.value)}/></Field>
          <Field label="SPECIALTY"><input style={IS2} placeholder="Neurology" onChange={e=>setF("specialty",e.target.value)}/></Field>
          <Field label="HOSPITAL ID">
            <select style={IS2} onChange={e=>setF("hospital",e.target.value)}>
              <option value="">Select Hospital</option>
              {visibleHospitals.map(h=><option key={h.hospital_id} value={h.hospital_id}>{h.name}</option>)}
            </select>
          </Field>
          <Btn onClick={async ()=>{
            const id="D"+String(data.doctors.length+1).padStart(2,"0");
            await supabase.from("doctors").insert({
              id, name: form.name || "New Doctor", specialty: form.specialty || "—", 
              hospital_id: form.hospital || (isSuper ? null : hId), status: "Available"
            });
            await fetchData();
            closeModal();
          }}>Save Doctor</Btn>
        </Modal>}
      </div>
    ),
  };

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", backgroundColor:C.bg, minHeight:"100vh", display:"flex", flexDirection:"column", color:C.text }}>
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", height: "64px", borderBottom: `1px solid ${C.border}`,
        backgroundColor: C.panel, flexShrink:0
      }}>
        <div style={{ color: C.accent, fontWeight: 700, fontSize: "22px", letterSpacing: "-0.5px" }}>MediBed</div>
        <div style={{ display: "flex", gap: "12px", alignItems:"center" }}>
          <div style={{ backgroundColor:`${C.green}15`, color:C.green, border:`1px solid ${C.green}44`, padding:"6px 12px", borderRadius:8, fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
            <div style={{width:8, height:8, borderRadius:"50%", backgroundColor:C.green, boxShadow:`0 0 8px ${C.green}`}}/>
            Network Hub Online
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div onClick={()=>setModal({type:"globalSearch"})} style={{ width: 34, height: 34, borderRadius: "50%", backgroundColor: C.panel, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", color:C.muted, cursor:"pointer", transition:"color 0.2s" }} onMouseOver={e=>e.currentTarget.style.color=C.text} onMouseOut={e=>e.currentTarget.style.color=C.muted}><SearchIcon size={16}/></div>
          <div onClick={()=>setModal({type:"notifications"})} style={{ position:"relative", width: 34, height: 34, borderRadius: "50%", backgroundColor: C.panel, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", color:C.muted, cursor:"pointer", transition:"color 0.2s" }} onMouseOver={e=>e.currentTarget.style.color=C.text} onMouseOut={e=>e.currentTarget.style.color=C.muted}>
            <BellIcon size={16}/>
            {vEmrgCount > 0 && <div style={{ position:"absolute", top:-2, right:-2, width:11, height:11, backgroundColor:C.red, borderRadius:"50%", border:`2px solid ${C.panel}` }}/>}
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background:`linear-gradient(135deg, ${C.purple}, ${C.accent})`, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:800, fontSize:14, marginLeft:6, boxShadow:`0 4px 12px ${C.accent}44` }}>{isSuper ? "SA" : "HA"}</div>
          <button onClick={()=>setUser(null)} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", borderRadius:7, border:`1px solid ${C.border}`, backgroundColor:"transparent", color:C.muted, fontSize:13, cursor:"pointer", transition:"all 0.2s", fontWeight:500 }} onMouseOver={e=>{e.currentTarget.style.backgroundColor=C.border;e.currentTarget.style.color=C.text}} onMouseOut={e=>{e.currentTarget.style.backgroundColor="transparent";e.currentTarget.style.color=C.muted}}>
            <LogoutIcon size={14}/> Logout
          </button>
        </div>
      </header>
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        <aside style={{ width:220, backgroundColor:C.panel, borderRight:`1px solid ${C.border}`, padding:"20px 0", display:"flex", flexDirection:"column" }}>
          <div>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setPage(n.id)} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 20px", border:"none", cursor:"pointer", backgroundColor:page===n.id?"#1a1a2e":"transparent", color:page===n.id?C.accent:C.muted, fontWeight:page===n.id?700:500, fontSize:13, textAlign:"left", borderLeft:page===n.id?`3px solid ${C.accent}`:"3px solid transparent", transition:"all .15s", width:"100%" }}>
                {n.icon} {n.id}
                {n.id==="Emergency"&&vEmrgCount>0&&(
                  <span style={{ marginLeft:"auto", backgroundColor:C.red, color:"#fff", borderRadius:999, padding:"1px 7px", fontSize:10, fontWeight:700 }}>{vEmrgCount}</span>
                )}
              </button>
            ))}
          </div>
          <div style={{ marginTop:"auto", padding:"0 16px 20px" }}>
            <div style={{ width:"100%", height:42, borderRadius:"10px", backgroundColor:"#2d1515", border:"1px solid #7f1d1d", display:"flex", alignItems:"center", justifyContent:"center", color:C.red, fontSize:12, fontWeight:700 }}>SYSTEM ALERT (MOCK)</div>
          </div>
        </aside>
        <main style={{ flex:1, padding:24, overflowY:"auto" }}>
          <div style={{ marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ color:C.muted, fontSize:12 }}>MediBed</div>
            <div style={{ color:C.border }}>›</div>
            <div style={{ color:C.text, fontSize:13, fontWeight:600 }}>{page}</div>
          </div>
          {pages[page]}

          {modal?.type === "globalSearch" && (
            <Modal title="System Search" onClose={closeModal}>
              <input style={IS2} placeholder="Search patients, doctors, hospitals..." autoFocus onChange={e=>setF("query", e.target.value.toLowerCase())} />
              <div style={{ marginTop: 16, maxHeight:400, overflowY:"auto", display:"flex", flexDirection:"column", gap:8 }}>
                {form.query && form.query.length > 1 ? (
                  <>
                    {data.patients.filter(p=>(isSuper || p.hospital===hId) && (p.name.toLowerCase().includes(form.query) || p.id.toLowerCase().includes(form.query))).map(p=>(
                      <div key={p.id} style={{ padding:12, backgroundColor:C.panel, border:`1px solid ${C.border}`, borderRadius:8, cursor:"pointer" }} onClick={()=>{ setPage("Patients"); closeModal(); }}>
                        <div style={{ color:C.text, fontWeight:700, fontSize:13 }}>{p.name} <span style={{ color:C.muted, fontWeight:400 }}>(Patient)</span></div>
                        <div style={{ color:C.sub, fontSize:12, marginTop:4 }}>ID: {p.id} | Disease: {p.disease}</div>
                      </div>
                    ))}
                    {data.doctors.filter(p=>(isSuper || p.hospital===hId) && p.name.toLowerCase().includes(form.query)).map(p=>(
                      <div key={p.id} style={{ padding:12, backgroundColor:C.panel, border:`1px solid ${C.border}`, borderRadius:8, cursor:"pointer" }} onClick={()=>{ setPage("Directory"); closeModal(); }}>
                        <div style={{ color:C.accent, fontWeight:700, fontSize:13 }}>{p.name} <span style={{ color:C.muted, fontWeight:400 }}>(Doctor)</span></div>
                        <div style={{ color:C.sub, fontSize:12, marginTop:4 }}>{p.specialty} · ID: {p.id}</div>
                      </div>
                    ))}
                    {visibleHospitals.filter(p=>p.name.toLowerCase().includes(form.query) || p.location.toLowerCase().includes(form.query)).map(p=>(
                      <div key={p.id} style={{ padding:12, backgroundColor:C.panel, border:`1px solid ${C.border}`, borderRadius:8, cursor:"pointer" }} onClick={()=>{ setPage("Dashboard"); closeModal(); }}>
                        <div style={{ color:C.green, fontWeight:700, fontSize:13 }}>{p.name} <span style={{ color:C.muted, fontWeight:400 }}>(Facility)</span></div>
                        <div style={{ color:C.sub, fontSize:12, marginTop:4 }}>{p.location}</div>
                      </div>
                    ))}
                    {data.beds.filter(b=>(isSuper || b.hospital === hId) && b.id.toLowerCase().includes(form.query)).map(b=>(
                      <div key={b.id} style={{ padding:12, backgroundColor:C.panel, border:`1px solid ${C.border}`, borderRadius:8, cursor:"pointer" }} onClick={()=>{ setPage("Beds"); closeModal(); }}>
                        <div style={{ color:C.orange, fontWeight:700, fontSize:13 }}>Bed {b.id} <span style={{ color:C.muted, fontWeight:400 }}>({b.type})</span></div>
                        <div style={{ color:C.sub, fontSize:12, marginTop:4 }}>Status: {b.status}</div>
                      </div>
                    ))}
                  </>
                ) : <div style={{ color:C.muted, fontSize:12 }}>Start typing to search records...</div>}
              </div>
            </Modal>
          )}

          {modal?.type === "notifications" && (
            <Modal title="Notification Center" onClose={closeModal}>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {vEmrgCount === 0 && <div style={{ color:C.muted, fontSize:13 }}>Your inbox is empty.</div>}
                {data.emergencies.filter(e=>e.status==="Pending").map(e=>(
                  <div key={e.id} style={{ padding:12, backgroundColor:`${C.red}11`, border:`1px solid ${C.red}44`, borderRadius:8, cursor:"pointer" }} onClick={()=>{ setPage("Emergency"); closeModal(); }}>
                     <div style={{ color:C.red, fontWeight:700, fontSize:13 }}>🚨 Critical Emergency: {e.condition}</div>
                     <div style={{ color:C.sub, fontSize:12, marginTop:4 }}>{e.name} requires immediate attention at {data.hospitals.find(h=>h.hospital_id===e.hospital)?.name||"any facility"}.</div>
                     <div style={{ color:C.muted, fontSize:10, marginTop:6 }}>{e.time}</div>
                  </div>
                ))}
              </div>
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}
