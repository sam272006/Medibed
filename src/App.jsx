import { useState } from "react";

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
const LogoutIcon = ({ size }) => <Icon size={size} d={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4","M16 17l5-5-5-5","M21 12H9"]} />;
const EditIcon   = ({ size }) => <Icon size={size} d={["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"]} />;
const BellIcon   = ({ size }) => <Icon size={size} d={["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"]} />;
const SearchIcon = ({ size }) => <Icon size={size} d={["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z","M21 21l-4.35-4.35"]} />;

const INIT = {
  stats: { total:120, available:47, occupied:65, icu:8, emergency:3 },
  patients: [
    { id:"P001", name:"Riya Sharma",  age:34, gender:"F", disease:"Pneumonia",    admission:"2025-03-10", bed:"B12",  ward:"W1", status:"Admitted"  },
    { id:"P002", name:"Arjun Mehta",  age:52, gender:"M", disease:"Cardiac Issue",admission:"2025-03-14", bed:"ICU3", ward:"W3", status:"Admitted"  },
    { id:"P003", name:"Sneha Patel",  age:27, gender:"F", disease:"Appendicitis", admission:"2025-03-17", bed:"B07",  ward:"W2", status:"Discharged" },
    { id:"P004", name:"Vikram Singh", age:61, gender:"M", disease:"Diabetes",     admission:"2025-03-18", bed:"B21",  ward:"W1", status:"Admitted"  },
    { id:"P005", name:"Priya Kapoor", age:45, gender:"F", disease:"Hypertension", admission:"2025-03-20", bed:"B15",  ward:"W2", status:"Admitted"  },
  ],
  beds: [
    { id:"B07",  type:"General",   status:"Available", ward:"W2" },
    { id:"B12",  type:"General",   status:"Occupied",  ward:"W1" },
    { id:"B15",  type:"General",   status:"Occupied",  ward:"W2" },
    { id:"B21",  type:"General",   status:"Occupied",  ward:"W1" },
    { id:"ICU1", type:"ICU",       status:"Available", ward:"W3" },
    { id:"ICU2", type:"ICU",       status:"Available", ward:"W3" },
    { id:"ICU3", type:"ICU",       status:"Occupied",  ward:"W3" },
    { id:"E01",  type:"Emergency", status:"Available", ward:"W4" },
    { id:"E02",  type:"Emergency", status:"Occupied",  ward:"W4" },
  ],
  wards: [
    { id:"W1", name:"General Ward A", total:40, occupied:22 },
    { id:"W2", name:"General Ward B", total:35, occupied:18 },
    { id:"W3", name:"ICU Wing",       total:15, occupied:8  },
    { id:"W4", name:"Emergency",      total:10, occupied:5  },
  ],
  records: [
    { id:"R001", patient:"P001", patientName:"Riya Sharma",  bed:"B12",  admission:"2025-03-10", discharge:"-",          status:"Active"     },
    { id:"R002", patient:"P002", patientName:"Arjun Mehta",  bed:"ICU3", admission:"2025-03-14", discharge:"-",          status:"Active"     },
    { id:"R003", patient:"P003", patientName:"Sneha Patel",  bed:"B07",  admission:"2025-03-17", discharge:"2025-03-22", status:"Discharged" },
    { id:"R004", patient:"P004", patientName:"Vikram Singh", bed:"B21",  admission:"2025-03-18", discharge:"-",          status:"Active"     },
    { id:"R005", patient:"P005", patientName:"Priya Kapoor", bed:"B15",  admission:"2025-03-20", discharge:"-",          status:"Active"     },
  ],
  emergencies: [
    { id:"EM001", name:"Unknown Male", age:38, condition:"Cardiac Arrest",  priority:"Critical", time:"09:12 AM", status:"Pending"  },
    { id:"EM002", name:"Fatima Noor",  age:25, condition:"Severe Bleeding", priority:"High",     time:"10:45 AM", status:"Assigned" },
    { id:"EM003", name:"Rajesh Kumar", age:67, condition:"Stroke",          priority:"Critical", time:"11:20 AM", status:"Pending"  },
  ],
};

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
  const [u,setU]=useState(""); const [p,setP]=useState(""); const [err,setErr]=useState("");
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
          <input style={IS} value={u} onChange={e=>setU(e.target.value)} placeholder="admin"/>
        </div>
        <div style={{ marginBottom:20 }}>
          <div style={{ color:C.sub, fontSize:12, marginBottom:6, fontWeight:600 }}>PASSWORD</div>
          <input style={IS} type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="••••••••"/>
        </div>
        {err&&<div style={{ color:C.red, fontSize:12, marginBottom:12, textAlign:"center" }}>{err}</div>}
        <button onClick={()=>{ if(u==="admin"&&p==="admin123") onLogin(); else setErr("Try admin / admin123"); }}
          style={{ width:"100%", padding:11, borderRadius:8, border:"none", backgroundColor:C.accent, color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}>
          Sign In
        </button>
        <div style={{ color:C.muted, fontSize:11, textAlign:"center", marginTop:14 }}>Demo: admin / admin123</div>
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
  const [loggedIn,setLoggedIn]=useState(false);
  const [page,setPage]=useState("Dashboard");
  const [data,setData]=useState(INIT);
  const [modal,setModal]=useState(null);
  const [search,setSearch]=useState("");
  const [form,setForm]=useState({});

  if(!loggedIn) return <Login onLogin={()=>setLoggedIn(true)}/>;
  const closeModal=()=>{setModal(null);setForm({});};
  const setF=(k,v)=>setForm(f=>({...f,[k]:v}));

  const NAV=[
    {id:"Dashboard", icon:<DashIcon size={16}/>},
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
              <div style={{ fontSize:24, fontWeight:800, color:C.text }}>Welcome back, Admin.</div>
              <div style={{ fontSize:14, color:C.muted }}>Hospital operations are running nominally. {data.emergencies.filter(e=>e.status==="Pending").length} actions pending.</div>
            </div>
            <div style={{ width:64, height:64, borderRadius:"50%", background:`linear-gradient(135deg, ${C.accent}, #7c3aed)`, boxShadow:`0 0 28px ${C.accent}44` }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {[
              {label:"AVAILABLE BEDS", val:data.stats.available, color:C.green, icon:<BedIcon size={24}/>},
              {label:"OCCUPIED BEDS", val:data.stats.occupied, color:C.orange, icon:<UserIcon size={24}/>},
              {label:"ICU AVAILABLE", val:data.stats.icu, color:C.purple, icon:<BedIcon size={24}/>},
              {label:"EMERGENCY REQS", val:data.stats.emergency, color:C.red, icon:<EmergIcon size={24}/>}
            ].map(s=>(
              <div key={s.label} style={{ backgroundColor: C.card, borderRadius: "14px", padding: "24px", border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontSize:13, color:C.muted, fontWeight:600 }}>{s.label}</div>
                  <div style={{ fontSize:28, fontWeight:800, color:C.text }}>{s.val}</div>
                </div>
                <div style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${s.color}44`, backgroundColor: `${s.color}11`, display:"flex", alignItems:"center", justifyContent:"center", color:s.color }}>{s.icon}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <BarChart/>
            <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
              <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:14 }}>Bed Status Distribution</div>
              {[
                {label:"General Available",val:30,total:75,color:C.green},
                {label:"General Occupied", val:45,total:75,color:C.orange},
                {label:"ICU Available",    val:8, total:15,color:C.purple},
                {label:"ICU Occupied",     val:7, total:15,color:C.accent},
                {label:"Emergency",        val:5, total:10,color:C.red},
              ].map(r=>(
                <div key={r.label} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.sub, marginBottom:4 }}><span>{r.label}</span><span>{r.val}/{r.total}</span></div>
                  <div style={{ height:6, borderRadius:3, backgroundColor:C.border, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${r.val/r.total*100}%`, backgroundColor:r.color, borderRadius:3 }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside style={{ width:"300px", borderLeft:`1px solid ${C.border}`, paddingLeft:"28px", display:"flex", flexDirection:"column", gap:"28px" }}>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
              <div style={{ fontSize:14, fontWeight:700, color:C.text }}>Emergency Reqs</div>
              <div style={{ fontSize:11, color:C.red, backgroundColor:`${C.red}22`, padding:"2px 8px", borderRadius:4 }}>{data.stats.emergency}</div>
            </div>
            {data.emergencies.slice(0,2).map(e=>(
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
             {data.records.slice(0,3).map(r=>(
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
        <Table
          cols={["Patient ID","Name","Age","Gender","Disease","Admission","Bed","Ward","Status","Actions"]}
          rows={data.patients.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()))}
          renderRow={p=><>
            <TD mono>{p.id}</TD><TD>{p.name}</TD><TD>{p.age}</TD><TD>{p.gender}</TD>
            <TD>{p.disease}</TD><TD>{p.admission}</TD><TD mono>{p.bed}</TD><TD>{p.ward}</TD>
            <TD>{pill(statusColor(p.status),p.status)}</TD>
            <td style={{ padding:"11px 14px" }}><div style={{ display:"flex", gap:6 }}>
              <Btn small color={C.accent} onClick={()=>setModal({type:"editPatient",payload:p})}><EditIcon size={12}/></Btn>
              {p.status==="Admitted"&&<Btn small color={C.orange} onClick={()=>{
                setData(d=>({...d,patients:d.patients.map(x=>x.id===p.id?{...x,status:"Discharged"}:x),stats:{...d.stats,occupied:d.stats.occupied-1,available:d.stats.available+1}}));
              }}>Discharge</Btn>}
            </div></td>
          </>}
        />
        {modal?.type==="addPatient"&&<Modal title="Add New Patient" onClose={closeModal}>
          {["name","age","disease","bed","ward"].map(k=><Field key={k} label={k.toUpperCase()}><input style={IS2} placeholder={k} onChange={e=>setF(k,e.target.value)}/></Field>)}
          <Field label="GENDER"><select style={IS2} onChange={e=>setF("gender",e.target.value)}><option value="">Select</option><option>M</option><option>F</option><option>Other</option></select></Field>
          <Btn onClick={()=>{
            const id="P"+String(data.patients.length+1).padStart(3,"0");
            setData(d=>({...d,patients:[...d.patients,{id,name:form.name||"New",age:form.age||"—",gender:form.gender||"—",disease:form.disease||"—",admission:new Date().toISOString().slice(0,10),bed:form.bed||"—",ward:form.ward||"—",status:"Admitted"}],stats:{...d.stats,occupied:d.stats.occupied+1,available:d.stats.available-1}}));
            closeModal();
          }}>Save Patient</Btn>
        </Modal>}
        {modal?.type==="editPatient"&&<Modal title="Edit Patient" onClose={closeModal}>
          {["name","age","disease","bed","ward"].map(k=><Field key={k} label={k.toUpperCase()}><input style={IS2} defaultValue={modal.payload[k]} onChange={e=>setF(k,e.target.value)}/></Field>)}
          <Btn onClick={()=>{setData(d=>({...d,patients:d.patients.map(p=>p.id===modal.payload.id?{...p,...form}:p)}));closeModal();}}>Update Patient</Btn>
        </Modal>}
      </div>
    ),

    Beds:(
      <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Bed Management</div>
          <Btn onClick={()=>setModal({type:"addBed"})}>+ Add Bed</Btn>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
          {["General","ICU","Emergency"].map(t=>{
            const beds=data.beds.filter(b=>b.type===t); const avail=beds.filter(b=>b.status==="Available").length;
            return <div key={t} style={{ backgroundColor:C.panel, borderRadius:10, padding:16, border:`1px solid ${C.border}` }}>
              <div style={{ color:C.sub, fontSize:12, marginBottom:6 }}>{t} Beds</div>
              <div style={{ fontSize:22, fontWeight:800, color:C.text }}>{avail}<span style={{ fontSize:13, color:C.muted }}>/{beds.length}</span></div>
              <div style={{ fontSize:11, color:C.green }}>available</div>
            </div>;
          })}
        </div>
        <Table
          cols={["Bed ID","Type","Status","Ward","Actions"]}
          rows={data.beds}
          renderRow={b=><>
            <TD mono>{b.id}</TD>
            <TD>{pill(b.type==="ICU"?C.purple:b.type==="Emergency"?C.red:C.accent,b.type)}</TD>
            <TD>{pill(statusColor(b.status),b.status)}</TD>
            <TD>{b.ward}</TD>
            <td style={{ padding:"11px 14px" }}><Btn small color={b.status==="Available"?C.orange:C.green} onClick={()=>{
              setData(d=>({...d,beds:d.beds.map(x=>x.id===b.id?{...x,status:x.status==="Available"?"Occupied":"Available"}:x),stats:{...d.stats,available:b.status==="Available"?d.stats.available-1:d.stats.available+1,occupied:b.status==="Available"?d.stats.occupied+1:d.stats.occupied-1}}));
            }}>{b.status==="Available"?"Mark Occupied":"Mark Available"}</Btn></td>
          </>}
        />
        {modal?.type==="addBed"&&<Modal title="Add New Bed" onClose={closeModal}>
          <Field label="BED ID"><input style={IS2} placeholder="e.g. B30" onChange={e=>setF("id",e.target.value)}/></Field>
          <Field label="TYPE"><select style={IS2} onChange={e=>setF("type",e.target.value)}><option>General</option><option>ICU</option><option>Emergency</option></select></Field>
          <Field label="WARD"><input style={IS2} placeholder="e.g. W1" onChange={e=>setF("ward",e.target.value)}/></Field>
          <Btn onClick={()=>{setData(d=>({...d,beds:[...d.beds,{id:form.id||"BXX",type:form.type||"General",status:"Available",ward:form.ward||"W1"}],stats:{...d.stats,total:d.stats.total+1,available:d.stats.available+1}}));closeModal();}}>Add Bed</Btn>
        </Modal>}
      </div>
    ),

    Wards:(
      <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Ward / Room Management</div>
          <Btn onClick={()=>setModal({type:"addWard"})}>+ Add Ward</Btn>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
          {data.wards.map(w=>(
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
        {modal?.type==="addWard"&&<Modal title="Add Ward" onClose={closeModal}>
          <Field label="WARD ID"><input style={IS2} placeholder="W5" onChange={e=>setF("id",e.target.value)}/></Field>
          <Field label="WARD NAME"><input style={IS2} placeholder="Pediatric Ward" onChange={e=>setF("name",e.target.value)}/></Field>
          <Field label="TOTAL BEDS"><input style={IS2} type="number" placeholder="20" onChange={e=>setF("total",+e.target.value)}/></Field>
          <Btn onClick={()=>{setData(d=>({...d,wards:[...d.wards,{id:form.id||"W5",name:form.name||"New Ward",total:form.total||0,occupied:0}]}));closeModal();}}>Add Ward</Btn>
        </Modal>}
      </div>
    ),

    Allocation:(
      <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
            <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:14 }}>Manual Allocation</div>
            <Field label="SELECT PATIENT"><select style={IS2} onChange={e=>setF("patientId",e.target.value)}><option value="">-- choose patient --</option>{data.patients.filter(p=>p.status==="Admitted").map(p=><option key={p.id} value={p.id}>{p.id} – {p.name}</option>)}</select></Field>
            <Field label="SELECT BED"><select style={IS2} onChange={e=>setF("bedId",e.target.value)}><option value="">-- choose bed --</option>{data.beds.filter(b=>b.status==="Available").map(b=><option key={b.id} value={b.id}>{b.id} ({b.type}) – {b.ward}</option>)}</select></Field>
            <Btn onClick={()=>{
              if(!form.patientId||!form.bedId) return;
              setData(d=>({...d,patients:d.patients.map(p=>p.id===form.patientId?{...p,bed:form.bedId}:p),beds:d.beds.map(b=>b.id===form.bedId?{...b,status:"Occupied"}:b),stats:{...d.stats,available:d.stats.available-1,occupied:d.stats.occupied+1}}));
              setForm({});
              alert(`Bed ${form.bedId} assigned to ${form.patientId}`);
            }}>Assign Bed</Btn>
          </div>
          <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
            <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:14 }}>Auto-Allocate (Smart)</div>
            <div style={{ backgroundColor:`${C.accent}11`, border:`1px solid ${C.accent}33`, borderRadius:8, padding:14, fontFamily:"monospace", fontSize:12, color:C.accent, marginBottom:14, lineHeight:1.7 }}>
              IF ICU required<br/>&nbsp;&nbsp;→ assign ICU bed<br/>ELSE<br/>&nbsp;&nbsp;→ assign General bed
            </div>
            <Field label="PATIENT"><select style={IS2} onChange={e=>setF("autoPatient",e.target.value)}><option value="">-- choose patient --</option>{data.patients.filter(p=>p.status==="Admitted").map(p=><option key={p.id} value={p.id}>{p.id} – {p.name}</option>)}</select></Field>
            <Field label="REQUIRES ICU?"><select style={IS2} onChange={e=>setF("needsIcu",e.target.value==="yes")}><option value="no">No – General bed</option><option value="yes">Yes – ICU bed</option></select></Field>
            <Btn color={C.purple} onClick={()=>{
              if(!form.autoPatient) return;
              const type=form.needsIcu?"ICU":"General";
              const bed=data.beds.find(b=>b.type===type&&b.status==="Available");
              if(!bed){alert(`No ${type} bed available!`);return;}
              setData(d=>({...d,patients:d.patients.map(p=>p.id===form.autoPatient?{...p,bed:bed.id}:p),beds:d.beds.map(b=>b.id===bed.id?{...b,status:"Occupied"}:b),stats:{...d.stats,available:d.stats.available-1,occupied:d.stats.occupied+1}}));
              alert(`Auto-allocated ${bed.id} (${type}) to ${form.autoPatient}`);
              setForm({});
            }}>Auto Allocate</Btn>
          </div>
        </div>
        <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
          <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:12 }}>Current Allocations</div>
          <Table
            cols={["Patient ID","Name","Assigned Bed","Ward","Disease","Status"]}
            rows={data.patients.filter(p=>p.bed!=="—")}
            renderRow={p=><><TD mono>{p.id}</TD><TD>{p.name}</TD><TD mono>{p.bed}</TD><TD>{p.ward}</TD><TD>{p.disease}</TD><TD>{pill(statusColor(p.status),p.status)}</TD></>}
          />
        </div>
      </div>
    ),

    Records:(
      <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <div style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:18 }}>Admission & Discharge Records</div>
        <Table
          cols={["Record ID","Patient ID","Patient Name","Bed","Admission","Discharge","Status"]}
          rows={data.records}
          renderRow={r=><><TD mono>{r.id}</TD><TD mono>{r.patient}</TD><TD>{r.patientName}</TD><TD mono>{r.bed}</TD><TD>{r.admission}</TD><TD>{r.discharge}</TD><TD>{pill(r.status==="Active"?C.green:C.muted,r.status)}</TD></>}
        />
      </div>
    ),

    Emergency:(
      <div style={{ backgroundColor:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ fontWeight:700, fontSize:15, color:C.text }}>Emergency Requests</div>
            <span style={{ backgroundColor:`${C.red}22`, color:C.red, padding:"3px 10px", borderRadius:999, fontSize:11, fontWeight:700, border:`1px solid ${C.red}44` }}>
              {data.emergencies.filter(e=>e.status==="Pending").length} Pending
            </span>
          </div>
          <Btn color={C.red} onClick={()=>setModal({type:"addEmergency"})}>+ New Emergency</Btn>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {data.emergencies.map(e=>(
            <div key={e.id} style={{ backgroundColor:C.panel, borderRadius:10, padding:16, border:`1px solid ${e.priority==="Critical"?C.red+"55":C.orange+"44"}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                <div style={{ width:42, height:42, borderRadius:"50%", backgroundColor:`${e.priority==="Critical"?C.red:C.orange}22`, display:"flex", alignItems:"center", justifyContent:"center", color:e.priority==="Critical"?C.red:C.orange }}><EmergIcon size={18}/></div>
                <div>
                  <div style={{ color:C.text, fontWeight:700, fontSize:14 }}>{e.name} <span style={{ color:C.muted, fontWeight:400, fontSize:12 }}>· Age {e.age}</span></div>
                  <div style={{ color:C.sub, fontSize:13 }}>{e.condition}</div>
                  <div style={{ color:C.muted, fontSize:11, marginTop:2 }}>{e.time} · {e.id}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                {pill(e.priority==="Critical"?C.red:C.orange,e.priority)}
                {pill(e.status==="Pending"?C.orange:C.green,e.status)}
                {e.status==="Pending"&&<Btn small color={C.green} onClick={()=>{
                  const bed=data.beds.find(b=>b.type==="Emergency"&&b.status==="Available");
                  setData(d=>({...d,emergencies:d.emergencies.map(x=>x.id===e.id?{...x,status:"Assigned"}:x),beds:bed?d.beds.map(b=>b.id===bed.id?{...b,status:"Occupied"}:b):d.beds,stats:{...d.stats,emergency:d.stats.emergency-1,available:bed?d.stats.available-1:d.stats.available,occupied:bed?d.stats.occupied+1:d.stats.occupied}}));
                }}>Assign Bed</Btn>}
              </div>
            </div>
          ))}
        </div>
        {modal?.type==="addEmergency"&&<Modal title="New Emergency Case" onClose={closeModal}>
          <Field label="PATIENT NAME"><input style={IS2} onChange={e=>setF("name",e.target.value)}/></Field>
          <Field label="AGE"><input style={IS2} type="number" onChange={e=>setF("age",e.target.value)}/></Field>
          <Field label="CONDITION"><input style={IS2} onChange={e=>setF("condition",e.target.value)}/></Field>
          <Field label="PRIORITY"><select style={IS2} onChange={e=>setF("priority",e.target.value)}><option>Critical</option><option>High</option><option>Medium</option></select></Field>
          <Btn color={C.red} onClick={()=>{
            const id="EM"+String(data.emergencies.length+1).padStart(3,"0");
            const now=new Date();
            setData(d=>({...d,emergencies:[...d.emergencies,{id,name:form.name||"Unknown",age:form.age||"—",condition:form.condition||"—",priority:form.priority||"Critical",time:`${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`,status:"Pending"}],stats:{...d.stats,emergency:d.stats.emergency+1}}));
            closeModal();
          }}>Submit Emergency</Btn>
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
        <div style={{ display: "flex", gap: "8px" }}>
          {["", "", ""].map((_, i) => (
            <div key={i} style={{ width: 90, height: 34, borderRadius: "8px", backgroundColor: i===0?C.accent:C.border }} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: C.border }} />
          <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: C.border }} />
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#2a2a3e" }} />
          <button onClick={()=>setLoggedIn(false)} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", borderRadius:7, border:`1px solid ${C.border}`, backgroundColor:"transparent", color:C.muted, fontSize:12, cursor:"pointer" }}>
            Logout
          </button>
        </div>
      </header>
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        <aside style={{ width:220, backgroundColor:C.panel, borderRight:`1px solid ${C.border}`, padding:"20px 0", display:"flex", flexDirection:"column" }}>
          <div>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setPage(n.id)} style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 20px", border:"none", cursor:"pointer", backgroundColor:page===n.id?"#1a1a2e":"transparent", color:page===n.id?C.accent:C.muted, fontWeight:page===n.id?700:500, fontSize:13, textAlign:"left", borderLeft:page===n.id?`3px solid ${C.accent}`:"3px solid transparent", transition:"all .15s", width:"100%" }}>
                {n.icon} {n.id}
                {n.id==="Emergency"&&data.emergencies.filter(e=>e.status==="Pending").length>0&&(
                  <span style={{ marginLeft:"auto", backgroundColor:C.red, color:"#fff", borderRadius:999, padding:"1px 7px", fontSize:10, fontWeight:700 }}>{data.emergencies.filter(e=>e.status==="Pending").length}</span>
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
        </main>
      </div>
    </div>
  );
}
