import { Bed, CheckCircle, UserMinus, Heartbeat } from '@phosphor-icons/react';
import KPICard from '../components/KPICard';
import { useAppContext } from '../context/AppContext';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { loading, patients, beds, theme } = useAppContext();

  // Determine chart colors based on theme
  const textColor = theme === 'dark' ? '#A1A1AA' : '#64748B';
  const gridColor = theme === 'dark' ? '#272431' : '#E2E8F0';

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Bed Occupancy',
      data: [65, 78, 60, 92, 85, 70, 75],
      borderColor: '#A855F7',
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      tension: 0.4,
      fill: true,
    }]
  };

  const doughnutData = {
    labels: ['Available', 'Occupied ICU', 'Occupied General'],
    datasets: [{
      data: [45, 12, 63],
      backgroundColor: ['#22C55E', '#F59E0B', '#EF4444'],
      borderWidth: 0,
    }]
  };

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: textColor, font: { family: "'Outfit', sans-serif" } } } },
    scales: {
      y: { grid: { color: gridColor }, ticks: { color: textColor } },
      x: { grid: { display: false }, ticks: { color: textColor } }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div><div className="skeleton w-48 h-10 mb-2"></div><div className="skeleton w-96 h-5"></div></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="skeleton h-28 rounded-2xl"></div>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="skeleton h-80 rounded-2xl"></div>
          <div className="skeleton h-80 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-2">
        <h1 className="text-3xl font-bold mb-2">Welcome back, <span className="text-accent-purple">Evelyn.</span></h1>
        <p className="text-text-secondary max-w-2xl">Your biometric signals are showing optimal recovery patterns. Keep following your current hydration protocol... oh wait, Admin dashboard overview below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Beds" value="120" icon={<Bed/>} bgColor="bg-[rgba(168,85,247,0.1)]" colorClass="text-accent-purple" change={4.2} isPositive={true}/>
        <KPICard title="Available Beds" value="45" icon={<CheckCircle/>} bgColor="bg-[rgba(34,197,94,0.1)]" colorClass="text-status-available" change={12.5} isPositive={true}/>
        <KPICard title="Occupied Beds" value="75" icon={<UserMinus/>} bgColor="bg-[rgba(239,68,68,0.1)]" colorClass="text-status-occupied" change={2.1} isPositive={false}/>
        <KPICard title="ICU Available" value="12" icon={<Heartbeat/>} bgColor="bg-[rgba(245,158,11,0.1)]" colorClass="text-status-icu" change={0.0} isPositive={true}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 h-80 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Occupancy Trends</h2>
          <div className="flex-1 min-h-0 relative"><Line data={lineChartData} options={chartOptions} /></div>
        </div>
        
        <div className="card p-6 h-80 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Ward Distribution</h2>
          <div className="flex-1 min-h-0 relative flex justify-center"><Doughnut data={doughnutData} options={{...chartOptions, scales: {}}} /></div>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Recent Admits</h2>
          <button className="text-accent-purple text-sm font-medium hover:underline cursor-pointer bg-transparent border-none">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-color)] text-text-secondary">
                <th className="py-3 px-4 font-medium">Patient Name</th>
                <th className="py-3 px-4 font-medium">Disease</th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.slice(0,3).map(p => (
                <tr key={p.id} className="border-b border-[var(--border-color)] hover:bg-bg-hover transition-colors">
                  <td className="py-4 px-4">{p.name}</td>
                  <td className="py-4 px-4">{p.disease}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.status === 'Admitted' ? 'bg-[rgba(245,158,11,0.15)] text-status-icu' : 'bg-[rgba(34,197,94,0.15)] text-status-available'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && <tr><td colSpan="3" className="py-8 text-center text-text-secondary">No recent admissions</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
