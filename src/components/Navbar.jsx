import { Sun, Moon, Bell, List } from '@phosphor-icons/react';
import { useAppContext } from '../context/AppContext';

const Navbar = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <div className="h-20 flex justify-between items-center px-8 border-b border-[var(--border-color)] bg-bg-main relative z-10 w-full transition-colors duration-300">
      
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-2xl text-text-secondary hover:text-text-primary transition-colors cursor-pointer bg-transparent border-none">
          <List />
        </button>
        <div className="text-xl font-semibold hidden md:block">Admin Portal</div>
      </div>

      <div className="flex items-center gap-5">
        <button onClick={toggleTheme} className="text-2xl text-text-secondary hover:text-text-primary hover:bg-bg-card p-2 rounded-full transition-all cursor-pointer bg-transparent border-none">
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
        
        <div className="relative">
          <button className="text-2xl text-text-secondary hover:text-text-primary hover:bg-bg-card p-2 rounded-full transition-all cursor-pointer bg-transparent border-none">
            <Bell />
          </button>
          {/* Notification dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-emergency-red rounded-full"></span>
        </div>

        <div className="w-10 h-10 rounded-full border-2 border-accent-purple overflow-hidden cursor-pointer shadow-[0_0_10px_var(--accent-purple-glow)]">
          <img src="https://ui-avatars.com/api/?name=Admin&background=A855F7&color=fff" alt="Admin Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
