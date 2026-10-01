/* ===========================================================
   Fhenix Africa — Data layer (localStorage-backed demo data)
   =========================================================== */
const FX_KEYS = {
  TRACKS: 'fx_tracks',
  LESSONS: 'fx_lessons',
  TRAINEES: 'fx_trainees',
  RECEIPTS: 'fx_receipts',
  ANNOUNCEMENTS: 'fx_announcements',
  SESSION: 'fx_session',
  ADMIN_SESSION: 'fx_admin_session',
  SEEDED: 'fx_seeded_v1'
};

const FX_ADMIN = { username: 'admin@fhenixafrica.com', password: 'FhenixAdmin#2023' };

function fxGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function fxSet(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function fxSeed() {
  if (fxGet(FX_KEYS.SEEDED, false)) return;

  const tracks = [
    { id: 'frontend', name: 'Frontend Web Development', level: 'Beginner', duration: '3 Months', fee: 200000,
      desc: 'HTML, CSS, JavaScript and Bootstrap — build responsive, interactive websites from scratch.', icon: 'bi-code-slash' },
    { id: 'backend', name: 'Backend Web Development', level: 'Intermediate', duration: '4 Months', fee: 220000,
      desc: 'Node.js, Express and databases — build the server side of real web applications.', icon: 'bi-hdd-network' },
    { id: 'fullstack', name: 'Full-Stack Development', level: 'Advanced', duration: '6 Months', fee: 350000,
      desc: 'Combine frontend and backend skills to design and ship complete web products.', icon: 'bi-layers' },
    { id: 'wordpress', name: 'WordPress Development', level: 'Beginner', duration: '2 Months', fee: 120000,
      desc: 'Build and customize WordPress sites for businesses and organizations.', icon: 'bi-wordpress' },
    { id: 'uiux', name: 'UI/UX Design', level: 'Beginner', duration: '3 Months', fee: 180000,
      desc: 'Research, wireframing and interface design using modern design tools.', icon: 'bi-palette' },
    { id: 'graphics', name: 'Graphics Design', level: 'Beginner', duration: '2 Months', fee: 100000,
      desc: 'Branding, layout and visual design for print and digital media.', icon: 'bi-brush' },
    { id: 'digitalmarketing', name: 'Digital Marketing', level: 'Beginner', duration: '2 Months', fee: 90000,
      desc: 'Social media, SEO and content strategy to grow a business online.', icon: 'bi-megaphone' },
    { id: 'dataanalysis', name: 'Data Analysis', level: 'Intermediate', duration: '3 Months', fee: 200000,
      desc: 'Clean, analyze and visualize data to support real business decisions.', icon: 'bi-bar-chart' },
    { id: 'cybersecurity', name: 'Cybersecurity', level: 'Intermediate', duration: '4 Months', fee: 250000,
      desc: 'Fundamentals of network security, ethical hacking and digital defense.', icon: 'bi-shield-lock' },
    { id: 'mobiledev', name: 'Mobile App Development', level: 'Advanced', duration: '5 Months', fee: 300000,
      desc: 'Design and build Android and cross-platform mobile applications.', icon: 'bi-phone' }
  ];

  const lessonSets = {
    frontend: [
      ['Module 1: Foundations', 'Introduction to HTML', 'Structure a web page with semantic HTML5 elements.', '24:10'],
      ['Module 1: Foundations', 'HTML Forms & Tables', 'Collect input and present tabular data correctly.', '19:40'],
      ['Module 2: Styling', 'CSS Fundamentals', 'Selectors, box model and responsive units.', '28:15'],
      ['Module 2: Styling', 'Flexbox & Grid', 'Build modern layouts without hacks.', '31:05'],
      ['Module 3: Scripting', 'JavaScript Fundamentals', 'Variables, functions, and the DOM.', '35:50'],
      ['Module 3: Scripting', 'Events & Forms Validation', 'Make pages interactive and reliable.', '22:30'],
      ['Module 4: Framework', 'Bootstrap Essentials', 'Ship responsive UI fast with components.', '26:00'],
      ['Module 5: Capstone', 'Final Project Briefing', 'Plan and structure your capstone project.', '15:00']
    ],
    backend: [
      ['Module 1: Server Basics', 'Introduction to Node.js', 'Run JavaScript outside the browser.', '27:00'],
      ['Module 1: Server Basics', 'Express Fundamentals', 'Build routes, middleware and APIs.', '30:20'],
      ['Module 2: Data', 'Working with Databases', 'Model and query data reliably.', '33:10'],
      ['Module 2: Data', 'Authentication & Sessions', 'Secure user accounts end to end.', '29:45'],
      ['Module 3: Capstone', 'Final Project Briefing', 'Plan your backend capstone project.', '14:30']
    ],
    graphics: [
      ['Module 1: Principles', 'Design Fundamentals', 'Color, contrast and composition basics.', '21:00'],
      ['Module 1: Principles', 'Typography for Designers', 'Choosing and pairing typefaces.', '18:40'],
      ['Module 2: Practice', 'Logo & Branding Basics', 'Design a simple brand identity.', '25:15'],
      ['Module 3: Capstone', 'Final Project Briefing', 'Plan your design capstone project.', '13:20']
    ]
  };
  const defaultLessons = lessonSets.frontend;

  const lessons = [];
  let lid = 1;
  tracks.forEach(t => {
    const set = lessonSets[t.id] || defaultLessons;
    set.forEach((row, i) => {
      lessons.push({
        id: 'L' + String(lid++).padStart(4, '0'),
        trackId: t.id, module: row[0], title: row[1], desc: row[2], duration: row[3],
        order: i + 1, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumb: '', published: true
      });
    });
  });

  const today = new Date();
  const iso = (d) => d.toISOString().slice(0, 10);
  const addMonths = (d, m) => { const nd = new Date(d); nd.setMonth(nd.getMonth() + m); return nd; };

  const trainees = [
    { traineeId: 'FA-2026-0001', firstName: 'Amaka', lastName: 'Eze', email: 'amaka@example.com', password: 'password1',
      phone: '08031234567', gender: 'Female', dob: '2001-04-12', address: 'Uyo, Akwa Ibom', profilePicture: '',
      guardian: { name: 'Mrs. Eze', phone: '08059990000', email: 'eze.guardian@example.com', address: 'Uyo, Akwa Ibom', relationship: 'Mother' },
      track: 'frontend', level: 'Beginner', startDate: iso(addMonths(today, -2)), endDate: iso(addMonths(today, 1)),
      payment: { totalFee: 200000, amountPaid: 150000, balance: 50000, status: 'Partially Paid', nextPayment: 50000, nextPaymentDate: iso(addMonths(today, 0)) },
      progress: { completedLessons: 5, totalLessons: 8, percentage: 63, completedLessonIds: ['L0001', 'L0002', 'L0003', 'L0004', 'L0005'] },
      certificate: { available: false, file: '', certificateId: '' }, status: 'Active', createdAt: iso(addMonths(today, -2)) },
    { traineeId: 'FA-2026-0002', firstName: 'Chinedu', lastName: 'Okafor', email: 'chinedu@example.com', password: 'password1',
      phone: '08021234567', gender: 'Male', dob: '1999-11-02', address: 'Eket, Akwa Ibom', profilePicture: '',
      guardian: { name: 'Mr. Okafor', phone: '08059990001', email: '', address: 'Eket, Akwa Ibom', relationship: 'Father' },
      track: 'backend', level: 'Intermediate', startDate: iso(addMonths(today, -1)), endDate: iso(addMonths(today, 3)),
      payment: { totalFee: 220000, amountPaid: 220000, balance: 0, status: 'Fully Paid', nextPayment: 0, nextPaymentDate: '' },
      progress: { completedLessons: 2, totalLessons: 5, percentage: 40, completedLessonIds: ['L0009', 'L0010'] },
      certificate: { available: false, file: '', certificateId: '' }, status: 'Active', createdAt: iso(addMonths(today, -1)) },
    { traineeId: 'FA-2026-0003', firstName: 'Grace', lastName: 'Udo', email: 'grace@example.com', password: 'password1',
      phone: '08041234567', gender: 'Female', dob: '2002-06-22', address: 'Onna, Akwa Ibom', profilePicture: '',
      guardian: { name: 'Mrs. Udo', phone: '08059990002', email: 'udo.guardian@example.com', address: 'Onna, Akwa Ibom', relationship: 'Mother' },
      track: 'graphics', level: 'Beginner', startDate: iso(addMonths(today, -3)), endDate: iso(addMonths(today, -1)),
      payment: { totalFee: 100000, amountPaid: 100000, balance: 0, status: 'Fully Paid', nextPayment: 0, nextPaymentDate: '' },
      progress: { completedLessons: 4, totalLessons: 4, percentage: 100, completedLessonIds: ['L0014', 'L0015', 'L0016', 'L0017'] },
      certificate: { available: true, file: '', certificateId: 'FA-CERT-0003' }, status: 'Completed', createdAt: iso(addMonths(today, -3)) },
    { traineeId: 'FA-2026-0004', firstName: 'Emeka', lastName: 'Nwosu', email: 'emeka@example.com', password: 'password1',
      phone: '08051234567', gender: 'Male', dob: '2000-01-15', address: 'Ikot Ekpene, Akwa Ibom', profilePicture: '',
      guardian: { name: 'Mr. Nwosu', phone: '08059990003', email: '', address: 'Ikot Ekpene', relationship: 'Father' },
      track: 'frontend', level: 'Beginner', startDate: iso(addMonths(today, -1)), endDate: iso(addMonths(today, 2)),
      payment: { totalFee: 200000, amountPaid: 0, balance: 200000, status: 'Payment Due', nextPayment: 200000, nextPaymentDate: iso(addMonths(today, 0)) },
      progress: { completedLessons: 1, totalLessons: 8, percentage: 13, completedLessonIds: ['L0001'] },
      certificate: { available: false, file: '', certificateId: '' }, status: 'Active', createdAt: iso(addMonths(today, -1)) },
    { traineeId: 'FA-2026-0005', firstName: 'Blessing', lastName: 'Akpan', email: 'blessing@example.com', password: 'password1',
      phone: '08061234567', gender: 'Female', dob: '2003-09-09', address: 'Eket, Akwa Ibom', profilePicture: '',
      guardian: { name: 'Mrs. Akpan', phone: '08059990004', email: 'akpan.guardian@example.com', address: 'Eket, Akwa Ibom', relationship: 'Mother' },
      track: 'frontend', level: 'Beginner', startDate: iso(addMonths(today, -4)), endDate: iso(addMonths(today, -1)),
      payment: { totalFee: 200000, amountPaid: 100000, balance: 100000, status: 'Overdue', nextPayment: 100000, nextPaymentDate: iso(addMonths(today, -1)) },
      progress: { completedLessons: 3, totalLessons: 8, percentage: 38, completedLessonIds: ['L0001', 'L0002', 'L0003'] },
      certificate: { available: false, file: '', certificateId: '' }, status: 'Active', createdAt: iso(addMonths(today, -4)) }
  ];

  const receipts = [
    { id: 'RCT-0001', traineeId: 'FA-2026-0001', amount: 150000, date: iso(addMonths(today, -1)), method: 'Bank Transfer',
      reference: 'TRX-88213', note: '', fileName: 'receipt-amaka.pdf', status: 'Verified' },
    { id: 'RCT-0002', traineeId: 'FA-2026-0005', amount: 100000, date: iso(addMonths(today, -3)), method: 'Bank Transfer',
      reference: 'TRX-77102', note: '', fileName: 'receipt-blessing.pdf', status: 'Verified' },
    { id: 'RCT-0003', traineeId: 'FA-2026-0002', amount: 220000, date: iso(addMonths(today, -1)), method: 'Card Payment',
      reference: 'TRX-99012', note: 'Full payment for Backend track', fileName: 'receipt-chinedu.pdf', status: 'Pending' }
  ];

  const announcements = [
    { id: 'A1', title: 'Welcome to the new training cycle', message: 'Classes for this cohort begin this week. Check your dashboard for your first lessons.', date: iso(today), target: 'all' },
    { id: 'A2', title: 'Payment reminder', message: 'Please clear outstanding balances before the next module unlocks.', date: iso(addMonths(today, 0)), target: 'all' }
  ];

  fxSet(FX_KEYS.TRACKS, tracks);
  fxSet(FX_KEYS.LESSONS, lessons);
  fxSet(FX_KEYS.TRAINEES, trainees);
  fxSet(FX_KEYS.RECEIPTS, receipts);
  fxSet(FX_KEYS.ANNOUNCEMENTS, announcements);
  fxSet(FX_KEYS.SEEDED, true);
}
fxSeed();

/* ---------- Accessors ---------- */
const FxData = {
  tracks: () => fxGet(FX_KEYS.TRACKS, []),
  track: (id) => FxData.tracks().find(t => t.id === id),
  lessons: () => fxGet(FX_KEYS.LESSONS, []),
  lessonsForTrack: (trackId) => FxData.lessons().filter(l => l.trackId === trackId).sort((a, b) => a.order - b.order),
  trainees: () => fxGet(FX_KEYS.TRAINEES, []),
  saveTrainees: (list) => fxSet(FX_KEYS.TRAINEES, list),
  trainee: (id) => FxData.trainees().find(t => t.traineeId === id),
  updateTrainee: (id, patch) => {
    const list = FxData.trainees();
    const idx = list.findIndex(t => t.traineeId === id);
    if (idx > -1) { list[idx] = { ...list[idx], ...patch }; FxData.saveTrainees(list); }
    return idx > -1 ? list[idx] : null;
  },
  nextTraineeId: () => {
    const list = FxData.trainees();
    const n = list.length + 1;
    return 'FA-2026-' + String(n).padStart(4, '0');
  },
  receipts: () => fxGet(FX_KEYS.RECEIPTS, []),
  saveReceipts: (list) => fxSet(FX_KEYS.RECEIPTS, list),
  receiptsForTrainee: (id) => FxData.receipts().filter(r => r.traineeId === id),
  announcements: () => fxGet(FX_KEYS.ANNOUNCEMENTS, [])
};
