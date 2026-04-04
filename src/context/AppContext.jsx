import { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  
  // Dummy State Data
  const [beds, setBeds] = useState([
    { id: 'B-101', type: 'General', status: 'Occupied', ward: 'Ward A' },
    { id: 'B-102', type: 'General', status: 'Available', ward: 'Ward A' },
    { id: 'ICU-01', type: 'ICU', status: 'Available', ward: 'ICU Unit' },
    { id: 'ICU-02', type: 'ICU', status: 'Occupied', ward: 'ICU Unit' },
  ]);

  const [patients, setPatients] = useState([
    { id: 'P-001', name: 'John Doe', age: 45, gender: 'Male', disease: 'Viral Fever', status: 'Admitted' },
    { id: 'P-002', name: 'Jane Smith', age: 32, gender: 'Female', disease: 'Fracture', status: 'Discharged' }
  ]);

  useEffect(() => {
    // Apply theme to body
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Simulate API Initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      addToast('System Data Synced Successfully', 'success');
    }, 1500); // 1.5s simulated loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContext.Provider value={{ 
      theme, toggleTheme, 
      loading, setLoading, 
      toasts, addToast,
      beds, setBeds,
      patients, setPatients
    }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className={`px-4 py-3 rounded-lg shadow-lg text-white font-medium ${t.type === 'error' ? 'bg-emergency-red' : 'bg-status-available'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
