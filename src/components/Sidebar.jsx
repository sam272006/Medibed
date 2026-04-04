import { SquaresFour, Users, Bed, Buildings, ArrowsLeftRight, FileText, WarningCircle, List } from '@phosphor-icons/react';

const Sidebar = ({ activePage, setActivePage, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <SquaresFour weight={activePage === 'dashboard' ? 'fill' : 'regular'} /> },
    { id: 'patients', label: 'Patients', icon: <Users weight={activePage === 'patients' ? 'fill' : 'regular'} /> },
    { id: 'beds', label: 'Beds', icon: <Bed weight={activePage === 'beds' ? 'fill' : 'regular'} /> },
    { id: 'wards', label: 'Wards', icon: <Buildings weight={activePage === 'wards' ? 'fill' : 'regular'} /> },
    { id: 'allocation', label: 'Allocation', icon: <ArrowsLeftRight weight={activePage === 'allocation' ? 'fill' : 'regular'} /> },
    { id: 'records', label: 'Records', icon: <FileText weight={activePage === 'records' ? 'fill' : 'regular'} /> },
  ];

  return (
    <div className={`transition-all duration-300 bg-bg-sidebar border-r border-[var(--border-color)] flex flex-col pt-6 pb-6 relative z-20 ${isOpen ? 'w-64 px-4' : 'w-20 px-2'}`}>
      
      {/* Logo Area */}
      <div className={`flex items-center gap-2 mb-10 ${isOpen ? 'px-3' : 'justify-center'}`}>
        <div className="text-accent-purple">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V9H8v3H6v2h2v3h2v-3h2v2h2v-2h2v-2h-2v-3h-2v3z"/></svg>
        </div>
        {isOpen && <div className="text-2xl font-bold tracking-tight">Medi<span className="text-accent-purple">Bed</span></div>}
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-2 flex-1">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex items-center gap-4 py-3 px-3 rounded-xl transition-all cursor-pointer font-medium
              ${activePage === item.id 
                ? 'bg-accent-purple-glow text-accent-purple-light border-l-4 border-accent-purple' 
                : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              }`}
            style={{ borderLeftWidth: activePage === item.id ? '4px' : '0' }}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </button>
        ))}

        {/* Emergency SOS */}
        <button className={`mt-auto flex items-center gap-4 py-3 px-3 transition-all cursor-pointer font-semibold rounded-xl border border-emergency-red text-emergency-red bg-emergency-bg hover:bg-emergency-red hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] ${isOpen ? 'justify-start' : 'justify-center'}`}>
          <span className="text-xl"><WarningCircle weight="bold" /></span>
          {isOpen && <span>EMERGENCY SOS</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
