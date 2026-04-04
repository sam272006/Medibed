import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Bed, CirclesFour, ListDashes, CheckCircle, Warning } from '@phosphor-icons/react';

const Beds = () => {
  const { beds, setBeds, addToast } = useAppContext();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterType, setFilterType] = useState('All');

  const filteredBeds = beds.filter(b => filterType === 'All' || b.type === filterType);

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Available' ? 'Occupied' : 'Available';
    setBeds(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    addToast(`Bed ${id} marked as ${newStatus}`, newStatus === 'Available' ? 'success' : 'error');
  };

  // Smart Allocation Algorithm Simulation
  const getSuggestion = () => {
    const availableItems = beds.filter(b => b.status === 'Available');
    if(availableItems.length === 0) return null;
    return availableItems[0].id; // Basic suggestion: first available
  };
  const suggestedBed = getSuggestion();

  return (
    <div className="flex flex-col gap-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Bed <span className="text-accent-purple">Management</span></h1>
          <p className="text-text-secondary">Smart visualization and allocation.</p>
        </div>
        <div className="flex gap-3 bg-bg-main p-1 rounded-xl">
          <button 
            onClick={() => setViewMode('grid')} 
            className={`p-2 rounded-md transition-colors cursor-pointer border-none flex items-center justify-center ${viewMode === 'grid' ? 'bg-accent-purple text-white shadow-md' : 'bg-transparent text-text-secondary hover:text-white'}`}
          >
            <CirclesFour size={20} weight="bold" />
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={`p-2 rounded-md transition-colors cursor-pointer border-none flex items-center justify-center ${viewMode === 'list' ? 'bg-accent-purple text-white shadow-md' : 'bg-transparent text-text-secondary hover:text-white'}`}
          >
            <ListDashes size={20} weight="bold" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2">
        {['All', 'General', 'ICU'].map(type => (
          <button 
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer border ${filterType === type ? 'bg-accent-purple-glow text-accent-purple border-accent-purple' : 'bg-transparent text-text-secondary border-[var(--border-color)] hover:border-text-secondary'}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredBeds.map(b => (
            <div key={b.id} className={`card p-4 flex flex-col items-center gap-3 relative cursor-pointer group transition-transform ${b.id === suggestedBed ? 'border-2 border-status-available shadow-[0_0_15px_rgba(34,197,94,0.3)]' : ''}`}>
              {/* Highlight badge for Smart Suggestion */}
              {b.id === suggestedBed && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-status-available text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap">
                  <CheckCircle weight="fill" /> SUGGESTED
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${b.status === 'Available' ? 'bg-[rgba(34,197,94,0.1)] text-status-available' : 'bg-[rgba(239,68,68,0.1)] text-status-occupied'}`}>
                <Bed weight="fill" />
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{b.id}</div>
                <div className="text-xs text-text-secondary">{b.type} • {b.ward}</div>
              </div>
              
              {/* Switch Overlay */}
              <div className="absolute inset-0 bg-[rgba(20,19,26,0.9)] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center rounded-[var(--border-radius)] transition-opacity backdrop-blur-sm">
                <span className="text-xs mb-2 font-medium">Toggle Status</span>
                <button 
                  onClick={() => toggleStatus(b.id, b.status)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold text-white border-none cursor-pointer ${b.status === 'Available' ? 'bg-status-occupied hover:bg-red-600' : 'bg-status-available hover:bg-green-600'}`}
                >
                  Mark {b.status === 'Available' ? 'Occupied' : 'Avail.'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="card w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
             <thead>
              <tr className="border-b border-[var(--border-color)] text-text-secondary">
                <th className="py-4 px-6 font-semibold">Bed ID</th>
                <th className="py-4 px-6 font-semibold">Type</th>
                <th className="py-4 px-6 font-semibold">Ward</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBeds.map(b => (
                <tr key={b.id} className="border-b border-[var(--border-color)] hover:bg-bg-hover transition-colors">
                  <td className="py-4 px-6 font-medium">
                    {b.id}
                    {b.id === suggestedBed && <span className="ml-2 text-xs bg-status-available text-white px-2 py-0.5 rounded-full">Suggested</span>}
                  </td>
                  <td className="py-4 px-6 text-text-secondary">{b.type}</td>
                  <td className="py-4 px-6 text-text-secondary">{b.ward}</td>
                  <td className="py-4 px-6">
                    <span className={`flex w-fit items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${b.status === 'Available' ? 'bg-[rgba(34,197,94,0.1)] text-status-available' : 'bg-[rgba(239,68,68,0.1)] text-status-occupied'}`}>
                      <span className={`w-2 h-2 rounded-full ${b.status === 'Available' ? 'bg-status-available' : 'bg-status-occupied'}`}></span>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex justify-end">
                    <button 
                      onClick={() => toggleStatus(b.id, b.status)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium border border-[var(--border-color)] bg-transparent text-text-primary hover:bg-bg-hover cursor-pointer transition-colors"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredBeds.length === 0 && (
         <div className="card py-16 flex flex-col items-center justify-center text-text-secondary border-dashed">
            <Warning size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium">No beds found for this category.</p>
         </div>
      )}
    </div>
  );
};

export default Beds;
