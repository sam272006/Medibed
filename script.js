// Dummy Data
const dummyData = {
  beds: [
    { id: 'B-101', type: 'General', status: 'Occupied', ward: 'Ward A' },
    { id: 'B-102', type: 'General', status: 'Available', ward: 'Ward A' },
    { id: 'ICU-01', type: 'ICU', status: 'Available', ward: 'ICU Unit' },
    { id: 'ICU-02', type: 'ICU', status: 'Occupied', ward: 'ICU Unit' },
    { id: 'B-201', type: 'General', status: 'Available', ward: 'Ward B' }
  ],
  patients: [
    { id: 'P-001', name: 'John Doe', age: 45, gender: 'Male', disease: 'Viral Fever', admission: '2023-10-24' },
    { id: 'P-002', name: 'Jane Smith', age: 32, gender: 'Female', disease: 'Fracture', admission: '2023-10-25' },
    { id: 'P-003', name: 'Robert Johnson', age: 60, gender: 'Male', disease: 'Cardiac Arrest', admission: '2023-10-26' }
  ],
  wards: [
    { id: 'W-01', name: 'Ward A', totalBeds: 20, availableBeds: 5 },
    { id: 'W-02', name: 'Ward B', totalBeds: 15, availableBeds: 10 },
    { id: 'W-ICU', name: 'ICU Unit', totalBeds: 10, availableBeds: 2 }
  ],
  records: [
    { patient: 'John Doe', bedId: 'B-101', admission: '2023-10-24', discharge: '-' },
    { patient: 'Alice Brown', bedId: 'B-105', admission: '2023-10-10', discharge: '2023-10-15' }
  ],
  emergencies: [
    { id: 'E-01', patient: 'Unknown', condition: 'Severe Trauma', priority: 'High', time: '10:30 AM' },
    { id: 'E-02', patient: 'Mark Davis', condition: 'Asthma Attack', priority: 'Medium', time: '11:15 AM' }
  ]
};

// State
let currentSortColumn = '';
let currentSortOrder = 'asc';

// Initialize the application layout
function initLayout(activePage) {
  const sidebarHTML = `
    <div class="sidebar">
      <div class="logo-container">
        <div class="logo-text">Medi<span>Bed</span></div>
      </div>
      <div class="nav-menu">
        <a href="index.html" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}">
          <i class="ph ph-squares-four"></i> Dashboard
        </a>
        <a href="patients.html" class="nav-item ${activePage === 'patients' ? 'active' : ''}">
          <i class="ph ph-users"></i> Patients
        </a>
        <a href="beds.html" class="nav-item ${activePage === 'beds' ? 'active' : ''}">
          <i class="ph ph-bed"></i> Beds
        </a>
        <a href="wards.html" class="nav-item ${activePage === 'wards' ? 'active' : ''}">
          <i class="ph ph-buildings"></i> Wards
        </a>
        <a href="allocation.html" class="nav-item ${activePage === 'allocation' ? 'active' : ''}">
          <i class="ph ph-arrows-left-right"></i> Allocation
        </a>
        <a href="records.html" class="nav-item ${activePage === 'records' ? 'active' : ''}">
          <i class="ph ph-file-text"></i> Records
        </a>
        <a href="emergency.html" class="nav-item emergency-btn ${activePage === 'emergency' ? 'active' : ''}">
          <i class="ph ph-warning-circle"></i> EMERGENCY SOS
        </a>
      </div>
    </div>
  `;

  const topHeaderHTML = `
    <div class="top-header">
      <div class="header-title">Admin Portal</div>
      <div class="header-actions">
        <button class="icon-btn"><i class="ph ph-sun"></i></button>
        <button class="icon-btn"><i class="ph ph-bell"></i></button>
        <img src="https://ui-avatars.com/api/?name=Admin&background=A855F7&color=fff" alt="Admin" class="profile-pic">
      </div>
    </div>
  `;

  const appContainer = document.getElementById('app-container');
  if(appContainer) {
    // Insert sidebar at the beginning
    appContainer.insertAdjacentHTML('afterbegin', sidebarHTML);
    
    // Check for main content div
    const mainContent = appContainer.querySelector('.main-content');
    if(mainContent) {
      mainContent.insertAdjacentHTML('afterbegin', topHeaderHTML);
    }
  }

  // Init Modals
  initModals();
}

// Modal handling
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const closeBtns = document.querySelectorAll('.close-btn');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const target = trigger.getAttribute('data-modal-target');
      document.getElementById(target).classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('active');
    });
  });

  // Close when clicking outside
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

// Helper to create table rows for beds
function renderBedsTable(data, tableBodyId) {
  const tbody = document.getElementById(tableBodyId);
  if(!tbody) return;
  tbody.innerHTML = '';
  
  data.forEach(bed => {
    const statusClass = bed.status.toLowerCase() === 'available' ? 'available' : 'occupied';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${bed.id}</td>
      <td>${bed.type}</td>
      <td><span class="status-badge ${statusClass}">${bed.status}</span></td>
      <td>${bed.ward}</td>
      <td>
        <button class="btn-action">Edit</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderPatientsTable(data, tableBodyId) {
  const tbody = document.getElementById(tableBodyId);
  if(!tbody) return;
  tbody.innerHTML = '';

  data.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.gender}</td>
      <td>${p.disease}</td>
      <td>${p.admission}</td>
      <td>
        <button class="btn-action">Edit</button>
        <button class="btn-action delete">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Sorting logic for generic tables
function sortTable(data, column, type, renderFn, tableBodyId) {
  if (currentSortColumn === column) {
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    currentSortColumn = column;
    currentSortOrder = 'asc';
  }
  
  const sortedData = [...data].sort((a, b) => {
    let valA = a[column];
    let valB = b[column];
    
    if(type === 'number') {
      valA = Number(valA);
      valB = Number(valB);
    } else {
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
    }
    
    if(valA < valB) return currentSortOrder === 'asc' ? -1 : 1;
    if(valA > valB) return currentSortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  
  renderFn(sortedData, tableBodyId);
}
