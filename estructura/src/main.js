import './style.css';

const API_URL = 'http://localhost:3001';
const THEME_KEY = 'zonex-theme';
const AUTH_KEY = 'zonex-user-session';

const state = {
  solicitudes: [],
  reportes: [],
  alertas: [],
  zonas: [],
  seleccion: null,
  user: JSON.parse(localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY) || 'null')
};

const app = document.querySelector('#app');

const $ = (selector) => document.querySelector(selector);
const money = (value) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value));
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);

function renderLoginForm() {
  app.style.display = 'block';
  app.innerHTML = `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-brand">
            <span class="login-brand-mark">Z</span>
            <span>Zone<span>X</span></span>
          </div>
          <p class="login-subtitle">Plataforma de Operación de Zonas Francas <span class="pill light" style="background:var(--primary-soft); color:var(--primary); font-size:10px; margin-left:4px;">v1.0</span></p>
        </div>

        <div id="login-status" class="status-message" role="status" aria-live="polite"></div>

        <form id="login-form" novalidate>
          <label>
            Correo electrónico o usuario
            <input type="text" id="login-email" name="email" required placeholder="ejemplo@zonex.com" value="analista@zonex.com" autocomplete="username">
          </label>
          <label>
            Contraseña
            <div class="input-password-wrapper">
              <input type="password" id="login-password" name="password" required placeholder="••••••••" value="zonex123" autocomplete="current-password">
              <button type="button" id="toggle-pwd-btn" class="toggle-password" title="Mostrar/Ocultar contraseña">👁</button>
            </div>
          </label>

          <div class="login-options">
            <label class="remember-me">
              <input type="checkbox" id="remember-me" checked> Recordarme
            </label>
            <a href="#" id="forgot-password-link" class="forgot-link">¿Olvidó su contraseña?</a>
          </div>

          <button type="submit" class="primary-button full-width" style="margin-top: 8px; padding: 13px; font-size: 14px;">
            Iniciar Sesión
          </button>
        </form>

        <div class="demo-credentials">
          <p>Accesos rápidos de prueba (Demo)</p>
          <div class="demo-buttons">
            <button type="button" class="demo-btn" data-demo="analista">✦ Analista ZoneX</button>
            <button type="button" class="demo-btn" data-demo="admin">⚙ Administrador</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach login listeners
  const loginForm = $('#login-form');
  const togglePwdBtn = $('#toggle-pwd-btn');
  const pwdInput = $('#login-password');
  const emailInput = $('#login-email');

  togglePwdBtn?.addEventListener('click', () => {
    const isPassword = pwdInput.type === 'password';
    pwdInput.type = isPassword ? 'text' : 'password';
    togglePwdBtn.textContent = isPassword ? '🙈' : '👁';
  });

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = pwdInput.value;
    const rememberMe = $('#remember-me').checked;

    if (!email || !password) {
      showLoginStatus('Por favor complete todos los campos.', 'error');
      return;
    }

    // Determine user role based on email or default
    const isDashboardAdmin = email.toLowerCase().includes('admin');
    const userObj = {
      name: isDashboardAdmin ? 'Carlos Mendoza' : 'Equipo ZoneX',
      role: isDashboardAdmin ? 'Administrador' : 'Analista Senior',
      initials: isDashboardAdmin ? 'CM' : 'ZX',
      email: email
    };

    state.user = userObj;
    if (rememberMe) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(userObj));
    } else {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(userObj));
    }

    renderAppShell();
    loadData();
  });

  document.querySelectorAll('[data-demo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.demo;
      if (type === 'admin') {
        emailInput.value = 'admin@zonex.com';
        pwdInput.value = 'admin123';
      } else {
        emailInput.value = 'analista@zonex.com';
        pwdInput.value = 'zonex123';
      }
      showLoginStatus(`Credenciales de ${type === 'admin' ? 'Administrador' : 'Analista'} cargadas. Presione Iniciar Sesión.`, 'info');
    });
  });

  $('#forgot-password-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginStatus('Utilice las credenciales demo para ingresar al prototipo.', 'info');
  });
}

function showLoginStatus(message, type = 'info') {
  const el = $('#login-status');
  if (!el) return;
  el.textContent = message;
  el.className = `status-message show ${type}`;
  window.setTimeout(() => el.classList.remove('show'), 4000);
}

function renderAppShell() {
  app.style.display = 'grid';
  app.innerHTML = `
    <aside class="sidebar">
      <a class="brand" href="#dashboard" aria-label="ZoneX inicio"><span class="brand-mark">Z</span><span>Zone<span>X</span></span></a>
      <p class="sidebar-label">OPERACIÓN</p>
      <nav class="nav" aria-label="Navegación principal">
        <button class="nav-link active" data-view="dashboard"><span>▦</span> Dashboard</button>
        <button class="nav-link" data-view="solicitudes"><span>⌁</span> Solicitudes <b id="pending-badge">0</b></button>
        <button class="nav-link" data-view="reportes"><span>▤</span> Cumplimiento</button>
        <button class="nav-link" data-view="alertas"><span>◉</span> Alertas <b id="alert-badge">0</b></button>
      </nav>
      <div class="sidebar-footer">
        <div class="user-avatar">${escapeHtml(state.user?.initials || 'ZX')}</div>
        <div style="flex: 1; overflow: hidden;">
          <strong>${escapeHtml(state.user?.name || 'Equipo ZoneX')}</strong>
          <small>${escapeHtml(state.user?.role || 'Analista')}</small>
        </div>
        <button id="logout-btn" class="logout-button" title="Cerrar sesión">Salir</button>
      </div>
    </aside>

    <main class="content">
      <header class="topbar">
        <button class="mobile-menu" aria-label="Abrir menú">☰</button>
        <div><p class="eyebrow">ZONA FRANCA · COSTA RICA</p><h1 id="page-title">Dashboard de gestión</h1></div>
        <div class="header-actions">
          <button id="theme-toggle" class="icon-button" aria-label="Cambiar tema">☾</button>
          <button class="primary-button" data-view="solicitudes" data-open-form>+ Nueva solicitud</button>
        </div>
      </header>
      <div id="global-status" class="status-message" role="status" aria-live="polite"></div>

      <section id="dashboard" class="view active">
        <div class="hero-banner">
          <div>
            <span class="pill light">OPERACIÓN EN LÍNEA</span>
            <h2>Gestión inteligente,<br>decisiones humanas.</h2>
            <p>Bienvenido, <strong>${escapeHtml(state.user?.name || 'Usuario')}</strong>. Priorice solicitudes y detecte riesgos de cumplimiento.</p>
          </div>
          <div class="hero-stat">
            <span>Solicitudes evaluadas</span>
            <strong id="evaluated-rate">—</strong>
            <small>del total registrado</small>
          </div>
        </div>
        <div class="kpi-grid">
          <article class="kpi-card"><span class="kpi-icon blue">⌁</span><div><p>Por revisar</p><strong id="kpi-pending">—</strong><small>Solicitudes pendientes</small></div></article>
          <article class="kpi-card"><span class="kpi-icon green">✓</span><div><p>Recomendadas</p><strong id="kpi-recommended">—</strong><small>Con puntaje ≥ 75</small></div></article>
          <article class="kpi-card"><span class="kpi-icon amber">△</span><div><p>Alertas activas</p><strong id="kpi-alerts">—</strong><small>Requieren atención</small></div></article>
          <article class="kpi-card"><span class="kpi-icon purple">▤</span><div><p>Cumplimiento</p><strong id="kpi-compliance">—</strong><small>Reportes al día</small></div></article>
        </div>
        <div class="two-columns">
          <article class="panel"><div class="panel-heading"><div><h3>Solicitudes prioritarias</h3><p>Evaluadas por el motor de IA</p></div><button class="text-button" data-view="solicitudes">Ver todas →</button></div><div id="priority-list" class="priority-list"></div></article>
          <article class="panel"><div class="panel-heading"><div><h3>Alertas recientes</h3><p>Excepciones detectadas</p></div><button class="text-button" data-view="alertas">Ver todas →</button></div><div id="recent-alerts" class="alert-list"></div></article>
        </div>
      </section>

      <section id="solicitudes" class="view">
        <div class="section-heading"><div><h2>Solicitudes de ingreso</h2><p>Registre, evalúe y priorice nuevas empresas.</p></div><button id="evaluate-pending" class="secondary-button">✦ Evaluar pendientes</button></div>
        <div class="request-layout"><article class="panel form-panel"><h3>Nueva solicitud</h3><p class="form-intro">Los campos con <em>*</em> son obligatorios.</p>
          <form id="request-form" novalidate>
            <label>Empresa *<input name="empresa" required minlength="3" maxlength="80" placeholder="Ej. Innovatech CR S.A."></label>
            <div class="form-row"><label>Sector *<select name="sector" required><option value="">Seleccione</option><option value="tecnologia">Tecnología</option><option value="manufactura">Manufactura</option><option value="bpo">BPO</option><option value="otro">Otro</option></select></label><label>Cédula jurídica *<input name="cedulaJuridica" required pattern="^3-[0-9]{3}-[0-9]{6}$" title="Use el formato 3-101-123456" placeholder="3-101-123456"></label></div>
            <div class="form-row"><label>Inversión proyectada (USD) *<input name="inversionProyectada" required type="number" min="1" max="1000000000" step="0.01" placeholder="50000"></label><label>Empleos proyectados *<input name="empleosProyectados" required type="number" min="1" max="100000" step="1" placeholder="10"></label></div>
            <label>Correo de contacto *<input name="correo" required type="email" maxlength="120" placeholder="contacto@empresa.com"></label>
            <p id="form-error" class="form-error" aria-live="polite"></p><button class="primary-button full-width" type="submit">Guardar y enviar a evaluación</button>
          </form></article>
          <article class="panel table-panel"><div class="panel-heading"><div><h3>Registro de solicitudes</h3><p>Seleccione una fila para ver el análisis.</p></div></div><div id="requests-table" class="table-wrap"></div></article>
        </div>
      </section>

      <section id="reportes" class="view">
        <div class="section-heading"><div><h2>Reporte de cumplimiento</h2><p>Seguimiento de inversión, empleo y exportaciones reportadas.</p></div></div>
        <article class="panel table-panel"><div id="reports-table" class="table-wrap"></div></article>
      </section>

      <section id="alertas" class="view"><div class="section-heading"><div><h2>Panel de alertas</h2><p>Señales generadas automáticamente que requieren revisión humana.</p></div></div><div id="all-alerts" class="alert-card-list"></div></section>

      <section id="detalle" class="view"><button class="back-button" data-view="solicitudes">← Volver a solicitudes</button><div id="detail-content"></div></section>
    </main>
  `;

  // Attach application listeners
  $('#request-form')?.addEventListener('submit', submitRequest);
  $('#evaluate-pending')?.addEventListener('click', processPending);
  $('#logout-btn')?.addEventListener('click', handleLogout);

  initializeTheme();
}

function handleLogout() {
  state.user = null;
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
  renderLoginForm();
  initializeTheme();
}

function showStatus(message, type = 'info') {
  const el = $('#global-status');
  if (!el) return;
  el.textContent = message;
  el.className = `status-message show ${type}`;
  window.setTimeout(() => el.classList.remove('show'), 4500);
}

function setLoading(button, loading, text) {
  if (!button) return;
  button.disabled = loading;
  button.dataset.original = button.dataset.original || button.textContent;
  button.textContent = loading ? text : button.dataset.original;
}

async function api(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json', ...options.headers }, ...options });
  if (!response.ok) throw new Error(`No fue posible completar la operación (${response.status}). Verifique que JSON-Server esté activo.`);
  return response.status === 204 ? null : response.json();
}

function classificar(puntaje) {
  return puntaje >= 75 ? 'Recomendada' : puntaje >= 50 ? 'Revisar' : 'Rechazada';
}

function evaluarConIA(solicitud, zonaFranca) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (!solicitud?.sector || !zonaFranca) return reject(new Error('Datos de solicitud o zona incompletos.'));
      const sectorValido = zonaFranca.sectoresPermitidos.includes(solicitud.sector.toLowerCase());
      const puntajeInversion = Math.min(Number(solicitud.inversionProyectada) / zonaFranca.inversionMinima, 1) * 30;
      const puntajeEmpleos = Math.min(Number(solicitud.empleosProyectados) / zonaFranca.empleosMinimos, 1) * 30;
      const puntaje = Math.round((sectorValido ? 40 : 0) + puntajeInversion + puntajeEmpleos);
      resolve({
        puntaje,
        clasificacion: classificar(puntaje),
        justificacion: `Sector ${sectorValido ? 'permitido' : 'no permitido'}; inversión ${Number(solicitud.inversionProyectada) >= zonaFranca.inversionMinima ? 'cumple' : 'bajo mínimo'} y empleos ${Number(solicitud.empleosProyectados) >= zonaFranca.empleosMinimos ? 'cumplen' : 'bajo mínimo'} frente a los requisitos de ${zonaFranca.nombre}.`,
        evaluadoEn: new Date().toISOString()
      });
    }, 700);
  });
}

async function loadData() {
  try {
    const [solicitudes, reportes, alertas, zonas] = await Promise.all([
      api('/solicitudes?_sort=creadoEn&_order=desc'),
      api('/reportes?_sort=periodo&_order=desc'),
      api('/alertas?_sort=creadoEn&_order=desc'),
      api('/zonas')
    ]);
    Object.assign(state, { solicitudes, reportes, alertas, zonas });
    renderAll();
  } catch (error) {
    showStatus(error.message, 'error');
    renderEmptyState();
  }
}

function renderAll() { renderDashboard(); renderRequests(); renderReports(); renderAlerts(); }
function renderEmptyState() { const p = $('#priority-list'); if (p) p.innerHTML = '<p class="empty">No se pudo conectar con la API.</p>'; }
function statusClass(status) { return ({ Recomendada: 'success', Revisar: 'warning', Rechazada: 'danger', pendiente: 'neutral', Cumple: 'success', Riesgo: 'danger', 'En revisión': 'warning', Alta: 'danger', Media: 'warning', Baja: 'info' })[status] || 'neutral'; }
function badge(status) { return `<span class="badge ${statusClass(status)}">${escapeHtml(status)}</span>`; }

function renderDashboard() {
  const pendingBadge = $('#pending-badge');
  if (!pendingBadge) return;

  const evaluated = state.solicitudes.filter((s) => s.estado !== 'pendiente');
  const recommended = state.solicitudes.filter((s) => s.estado === 'Recomendada');
  const activeAlerts = state.alertas.filter((a) => a.estado === 'activa');
  const compliant = state.reportes.filter((r) => r.estado === 'Cumple');

  pendingBadge.textContent = state.solicitudes.filter((s) => s.estado === 'pendiente').length;
  $('#alert-badge').textContent = activeAlerts.length;
  $('#evaluated-rate').textContent = state.solicitudes.length ? `${Math.round((evaluated.length / state.solicitudes.length) * 100)}%` : '0%';
  $('#kpi-pending').textContent = state.solicitudes.filter((s) => s.estado === 'pendiente').length;
  $('#kpi-recommended').textContent = recommended.length;
  $('#kpi-alerts').textContent = activeAlerts.length;
  $('#kpi-compliance').textContent = state.reportes.length ? `${Math.round((compliant.length / state.reportes.length) * 100)}%` : '—';
  $('#priority-list').innerHTML = evaluated.slice().sort((a, b) => b.puntaje - a.puntaje).slice(0, 4).map((s) => `<button class="priority-item detail-trigger" data-id="${s.id}"><span class="company-initial">${escapeHtml(s.empresa[0])}</span><span><strong>${escapeHtml(s.empresa)}</strong><small>${escapeHtml(s.sector)} · ${money(s.inversionProyectada)}</small></span><span class="score">${s.puntaje}<small>/100</small></span>${badge(s.estado)}</button>`).join('') || '<p class="empty">Aún no hay solicitudes evaluadas.</p>';
  $('#recent-alerts').innerHTML = activeAlerts.slice(0, 4).map((a) => `<div class="alert-row"><span class="alert-dot ${statusClass(a.nivel)}"></span><span><strong>${escapeHtml(a.titulo)}</strong><small>${escapeHtml(a.empresa)} · ${escapeHtml(a.creadoEn)}</small></span>${badge(a.nivel)}</div>`).join('') || '<p class="empty">No hay alertas activas.</p>';
}

function renderRequests() { const el = $('#requests-table'); if (el) el.innerHTML = `<table><thead><tr><th>Empresa</th><th>Sector</th><th>Inversión</th><th>IA</th><th>Estado</th><th></th></tr></thead><tbody>${state.solicitudes.map((s) => `<tr><td><strong>${escapeHtml(s.empresa)}</strong><small>${escapeHtml(s.cedulaJuridica)}</small></td><td>${escapeHtml(s.sector)}</td><td>${money(s.inversionProyectada)}</td><td>${s.puntaje ?? '—'}</td><td>${badge(s.estado)}</td><td><button class="table-action detail-trigger" data-id="${s.id}">Ver análisis</button></td></tr>`).join('')}</tbody></table>`; }
function renderReports() { const el = $('#reports-table'); if (el) el.innerHTML = `<table><thead><tr><th>Empresa</th><th>Periodo</th><th>Empleos reales</th><th>Inversión ejecutada</th><th>Exportaciones</th><th>Estado</th></tr></thead><tbody>${state.reportes.map((r) => `<tr><td><strong>${escapeHtml(r.empresa)}</strong></td><td>${escapeHtml(r.periodo)}</td><td>${r.empleosReales}</td><td>${money(r.inversionEjecutada)}</td><td>${money(r.exportaciones)}</td><td>${badge(r.estado)}</td></tr>`).join('')}</tbody></table>`; }
function renderAlerts() { const el = $('#all-alerts'); if (el) el.innerHTML = state.alertas.map((a) => `<article class="alert-card"><div class="alert-card-icon ${statusClass(a.nivel)}">!</div><div><div class="alert-card-heading"><div><h3>${escapeHtml(a.titulo)}</h3><p>${escapeHtml(a.empresa)} · ${escapeHtml(a.creadoEn)}</p></div>${badge(a.nivel)}</div><p>${escapeHtml(a.descripcion)}</p><small>Estado: ${escapeHtml(a.estado)}</small></div></article>`).join('') || '<p class="empty">No hay alertas registradas.</p>'; }

function renderDetail(id) {
  const s = state.solicitudes.find((item) => String(item.id) === String(id));
  if (!s) return;
  state.seleccion = s;
  const z = state.zonas[0];
  const detailContent = $('#detail-content');
  if (detailContent) {
    detailContent.innerHTML = `<div class="detail-header"><div><p class="eyebrow">ANÁLISIS DE IA</p><h2>${escapeHtml(s.empresa)}</h2><p>${escapeHtml(s.cedulaJuridica)} · ${escapeHtml(s.correo)}</p></div>${badge(s.estado)}</div><div class="detail-grid"><article class="panel score-panel"><p>Puntaje de elegibilidad</p><strong>${s.puntaje ?? '—'}<small>/100</small></strong><div class="score-track"><span style="width:${s.puntaje ?? 0}%"></span></div><p>${s.estado === 'pendiente' ? 'Pendiente de evaluación.' : escapeHtml(s.justificacion)}</p></article><article class="panel"><h3>Datos declarados</h3><dl><dt>Sector</dt><dd>${escapeHtml(s.sector)}</dd><dt>Inversión proyectada</dt><dd>${money(s.inversionProyectada)}</dd><dt>Empleos proyectados</dt><dd>${s.empleosProyectados}</dd><dt>Zona evaluada</dt><dd>${escapeHtml(z?.nombre || '—')}</dd></dl></article></div><article class="human-note"><span>✓</span><div><strong>Decisión final pendiente de analista</strong><p>La IA entrega una recomendación explicable; no sustituye la aprobación humana.</p></div></article>`;
    showView('detalle');
  }
}

function showView(view) {
  document.querySelectorAll('.view').forEach((section) => section.classList.toggle('active', section.id === view));
  document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.dataset.view === view));
  const titles = { dashboard: 'Dashboard de gestión', solicitudes: 'Solicitudes de ingreso', reportes: 'Reporte de cumplimiento', alertas: 'Panel de alertas', detalle: 'Detalle y análisis de IA' };
  const titleEl = $('#page-title');
  if (titleEl) titleEl.textContent = titles[view];
}

async function processPending() {
  const button = $('#evaluate-pending');
  const pending = state.solicitudes.filter((s) => s.estado === 'pendiente');
  if (!pending.length) return showStatus('No hay solicitudes pendientes por evaluar.', 'info');
  setLoading(button, true, 'Evaluando…');
  try {
    const zone = state.zonas[0] || await api('/zonas/1');
    const results = await Promise.all(pending.map(async (s) => {
      const evaluation = await evaluarConIA(s, zone);
      return api(`/solicitudes/${s.id}`, { method: 'PATCH', body: JSON.stringify({ ...evaluation, estado: evaluation.clasificacion }) });
    }));
    await Promise.all(results);
    showStatus(`${results.length} solicitud(es) evaluada(s) correctamente.`, 'success');
    await loadData();
  } catch (error) {
    showStatus(error.message, 'error');
  } finally {
    setLoading(button, false);
  }
}

async function submitRequest(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formError = $('#form-error');
  formError.textContent = '';
  if (!form.checkValidity()) {
    formError.textContent = 'Revise los campos obligatorios y los formatos indicados.';
    form.reportValidity();
    return;
  }
  const button = form.querySelector('[type="submit"]');
  setLoading(button, true, 'Guardando…');
  const values = Object.fromEntries(new FormData(form));
  const request = { ...values, inversionProyectada: Number(values.inversionProyectada), empleosProyectados: Number(values.empleosProyectados), estado: 'pendiente', creadoEn: new Date().toISOString().slice(0, 10) };
  try {
    const created = await api('/solicitudes', { method: 'POST', body: JSON.stringify(request) });
    const evaluation = await evaluarConIA(created, state.zonas[0]);
    await api(`/solicitudes/${created.id}`, { method: 'PATCH', body: JSON.stringify({ ...evaluation, estado: evaluation.clasificacion }) });
    form.reset();
    showStatus('Solicitud guardada y evaluada por la IA.', 'success');
    await loadData();
    renderDetail(created.id);
  } catch (error) {
    showStatus(error.message, 'error');
  } finally {
    setLoading(button, false);
  }
}

function initializeTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(saved || preferred);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const toggleBtn = $('#theme-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = theme === 'dark' ? '☀' : '☾';
    toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
  }
  localStorage.setItem(THEME_KEY, theme);
}

// Global click event delegate
app.addEventListener('click', (event) => {
  const viewButton = event.target.closest('[data-view]');
  if (viewButton) showView(viewButton.dataset.view);
  const detailButton = event.target.closest('.detail-trigger');
  if (detailButton) renderDetail(detailButton.dataset.id);
  if (event.target.closest('#theme-toggle')) setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  if (event.target.closest('[data-open-form]')) window.setTimeout(() => $('#request-form')?.querySelector('input')?.focus(), 50);
});

// App Initialization
function init() {
  if (state.user) {
    renderAppShell();
    loadData();
  } else {
    renderLoginForm();
    initializeTheme();
  }
}

init();
