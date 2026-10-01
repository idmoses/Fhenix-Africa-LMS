/* ===========================================================
   Fhenix Africa — Shared app utilities
   =========================================================== */
function fxToast(message, type) {
  let host = document.getElementById('fxToastHost');
  if (!host) {
    host = document.createElement('div');
    host.id = 'fxToastHost';
    document.body.appendChild(host);
  }
  const el = document.createElement('div');
  el.className = 'fx-toast' + (type ? ' ' + type : '');
  el.innerHTML = message;
  host.appendChild(el);
  setTimeout(() => el.remove(), 3800);
}

function fxCurrency(n) {
  const v = Number(n) || 0;
  return '\u20A6' + v.toLocaleString('en-NG');
}

function fxDate(d) {
  if (!d) return '\u2014';
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fxInitials(first, last) {
  return ((first || '')[0] || '').toUpperCase() + ((last || '')[0] || '').toUpperCase();
}

function fxPaymentBadgeClass(status) {
  return { 'Fully Paid': 'badge-green', 'Partially Paid': 'badge-blue', 'Payment Due': 'badge-amber', 'Overdue': 'badge-red' }[status] || 'badge-grey';
}
function fxReceiptBadgeClass(status) {
  return { Verified: 'badge-green', Pending: 'badge-amber', Rejected: 'badge-red' }[status] || 'badge-grey';
}
function fxStatusBadgeClass(status) {
  return { Active: 'badge-green', Completed: 'badge-blue', Suspended: 'badge-red' }[status] || 'badge-grey';
}

/* ---------- Public navbar toggle ---------- */
function fxInitPublicNav() {
  const btn = document.querySelector('.fx-mobile-toggle');
  const links = document.querySelector('.fx-nav-links');
  if (btn && links) {
    btn.addEventListener('click', () => links.classList.toggle('open'));
  }
}

/* ---------- Modal helpers ---------- */
function fxOpenModal(id) { document.getElementById(id).classList.add('show'); }
function fxCloseModal(id) { document.getElementById(id).classList.remove('show'); }

/* ---------- Sidebar (dashboard shell) ---------- */
const FX_TRAINEE_NAV = [
  ['dashboard.html', 'bi-grid-1x2', 'Dashboard'],
  ['training.html', 'bi-mortarboard', 'My Training'],
  ['videos.html', 'bi-play-circle', 'Class Videos'],
  ['training.html#progress', 'bi-graph-up', 'My Progress'],
  ['payments.html', 'bi-cash-coin', 'Payment'],
  ['receipts.html', 'bi-receipt', 'Payment Receipts'],
  ['certificate.html', 'bi-patch-check', 'Certificate'],
  ['profile.html', 'bi-person-gear', 'Profile'],
  ['profile.html#security', 'bi-shield-lock', 'Settings']
];
const FX_ADMIN_NAV = [
  ['dashboard.html', 'bi-grid-1x2', 'Dashboard'],
  ['trainees.html', 'bi-people', 'Trainees'],
  ['tracks.html', 'bi-signpost-split', 'Training Tracks'],
  ['lessons.html', 'bi-collection-play', 'Class Content'],
  ['progress.html', 'bi-graph-up', 'Progress'],
  ['payments.html', 'bi-cash-coin', 'Payments'],
  ['receipts.html', 'bi-receipt', 'Payment Receipts'],
  ['certificates.html', 'bi-patch-check', 'Certificates'],
  ['reports.html', 'bi-bar-chart-line', 'Reports']
];

function fxRenderShell(opts) {
  // opts: { role: 'trainee'|'admin', active: 'dashboard.html', title: 'Dashboard' }
  const isAdmin = opts.role === 'admin';
  const nav = isAdmin ? FX_ADMIN_NAV : FX_TRAINEE_NAV;
  const user = isAdmin ? { name: 'Administrator', sub: 'Fhenix Africa Staff' } : (() => {
    const t = FxAuth.currentTrainee();
    return t ? { name: t.firstName + ' ' + t.lastName, sub: t.traineeId, initials: fxInitials(t.firstName, t.lastName) } : { name: '', sub: '' };
  })();

  const sidebar = document.getElementById('fxSidebar');
  sidebar.innerHTML = `
    <div class="fx-sidebar-brand"><span class="mark"><i class="bi bi-mortarboard-fill"></i></span> Fhenix Africa</div>
    <div class="fx-user-card">
      <div class="fx-user-avatar">${isAdmin ? '<i class="bi bi-shield-lock"></i>' : (user.initials || '')}</div>
      <div><div class="name">${user.name}</div><div class="sub">${user.sub}</div></div>
    </div>
    <ul class="fx-sidenav">
      ${nav.map(([href, icon, label]) => `<li><a href="${href}" class="${opts.active === href.split('#')[0] ? 'active' : ''}"><i class="bi ${icon}"></i> ${label}</a></li>`).join('')}
      <li><a href="#" class="logout" id="fxLogoutBtn"><i class="bi bi-box-arrow-right"></i> Logout</a></li>
    </ul>`;

  document.getElementById('fxPageTitle').textContent = opts.title;
  document.getElementById('fxLogoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (isAdmin) FxAuth.logoutAdmin(); else FxAuth.logoutTrainee();
  });

  const burger = document.getElementById('fxBurger');
  const overlay = document.getElementById('fxOverlay');
  if (burger) burger.addEventListener('click', () => { sidebar.classList.add('open'); overlay.classList.add('show'); });
  if (overlay) overlay.addEventListener('click', () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); });
}

/* ---------- Form validation helper ---------- */
function fxValidateRequired(form) {
  let ok = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value || !field.value.trim()) {
      field.style.borderColor = 'var(--fx-red)';
      ok = false;
    } else {
      field.style.borderColor = '';
    }
  });
  return ok;
}
