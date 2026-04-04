import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { MagnifyingGlass, DownloadSimple, Trash, PencilSimple, Funnel } from '@phosphor-icons/react';

const Patients = () => {
  const { patients, setPatients, addToast } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  // Handle Sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  // Filter and Sort Data
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.disease.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Export to CSV
  const exportCSV = () => {
    const headers = 'ID,Name,Age,Gender,Disease,Status\n';
    const csvContent = filteredPatients.map(p => `${p.id},${p.name},${p.age},${p.gender},${p.disease},${p.status}`).join('\n');
    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "patients_export.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Patient data exported to CSV');
  };

  const deletePatient = (id) => {
    // In a real app we'd trigger a confirmation modal
    if(window.confirm('Are you sure you want to delete this patient record?')) {
      setPatients(prev => prev.filter(p => p.id !== id));
      addToast('Patient deleted successfully', 'success');
    }
  };

  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <span className="opacity-30">⇕</span>;
    return <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="flex flex-col gap-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Patient <span className="text-accent-purple">Management</span></h1>
          <p className="text-text-secondary">Advanced tracking and filtering for hospital patients.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportCSV} className="btn-primary bg-bg-card border border-[var(--border-color)] text-text-primary hover:bg-bg-hover shadow-none">
            <DownloadSimple weight="bold" /> Export CSV
          </button>
          <button className="btn-primary" onClick={() => addToast('Add modal simulation triggered')}>
            + Add Patient
          </button>
        </div>
      </div>

      <div className="card w-full flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-[var(--border-color)] flex flex-wrap gap-4 justify-between items-center">
          <div className="relative w-full max-w-sm">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-lg" />
            <input 
              type="text" 
              placeholder="Search by ID, Name, or Disease..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 h-10 py-1"
            />
          </div>
          <button className="flex items-center gap-2 text-text-secondary hover:text-text-primary px-3 py-2 rounded-lg bg-transparent border-none cursor-pointer hover:bg-bg-hover transition-colors">
            <Funnel /> Filter Options
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--border-color)] text-text-secondary">
                <th className="py-4 px-6 font-semibold cursor-pointer hover:text-accent-purple" onClick={() => handleSort('id')}>ID <SortIndicator columnKey="id" /></th>
                <th className="py-4 px-6 font-semibold cursor-pointer hover:text-accent-purple" onClick={() => handleSort('name')}>Name <SortIndicator columnKey="name" /></th>
                <th className="py-4 px-6 font-semibold cursor-pointer hover:text-accent-purple" onClick={() => handleSort('age')}>Age <SortIndicator columnKey="age" /></th>
                <th className="py-4 px-6 font-semibold">Gender</th>
                <th className="py-4 px-6 font-semibold">Disease</th>
                <th className="py-4 px-6 font-semibold cursor-pointer hover:text-accent-purple" onClick={() => handleSort('status')}>Status <SortIndicator columnKey="status" /></th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? filteredPatients.map(p => (
                <tr key={p.id} className="border-b border-[var(--border-color)] hover:bg-bg-hover transition-colors group">
                  <td className="py-4 px-6 font-medium text-text-primary">{p.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-purple-glow text-accent-purple flex items-center justify-center font-bold text-xs">{p.name.charAt(0)}</div>
                      {p.name}
                    </div>
                  </td>
                  <td className="py-4 px-6">{p.age}</td>
                  <td className="py-4 px-6">{p.gender}</td>
                  <td className="py-4 px-6">{p.disease}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${p.status === 'Admitted' ? 'bg-[rgba(245,158,11,0.1)] text-status-icu border-[rgba(245,158,11,0.2)]' : 'bg-[rgba(34,197,94,0.1)] text-status-available border-[rgba(34,197,94,0.2)]'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-accent-purple text-text-secondary hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none">
                      <PencilSimple />
                    </button>
                    <button onClick={() => deletePatient(p.id)} className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-emergency-red text-text-secondary hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none">
                      <Trash />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-text-secondary flex-col items-center justify-center">
                    <div className="text-4xl mb-4 opacity-50">📂</div>
                    <div className="text-lg font-medium">No patients found</div>
                    <div className="text-sm">Try adjusting your search filters</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Simulation */}
        <div className="p-4 border-t border-[var(--border-color)] flex justify-between items-center text-sm text-text-secondary">
          <div>Showing {filteredPatients.length} of {patients.length} entries</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-[var(--border-color)] bg-transparent text-text-secondary hover:text-white hover:bg-bg-hover cursor-pointer" disabled>Previous</button>
            <button className="px-3 py-1 rounded border border-accent-purple bg-accent-purple-glow text-accent-purple cursor-pointer">1</button>
            <button className="px-3 py-1 rounded border border-[var(--border-color)] bg-transparent text-text-secondary hover:text-white hover:bg-bg-hover cursor-pointer" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
