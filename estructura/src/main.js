import './style.css';

const API_URL = 'http://127.0.0.1:3002';
const THEME_KEY = 'zonex-theme';
<<<<<<< HEAD
const AUTH_KEY = 'zonex-user-session';
=======
const SESSION_KEY = 'zonex-session';

const currentUser = JSON.parse(localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY) || 'null');
if (!currentUser) window.location.replace('/login/index.html');
>>>>>>> 70026656c5ae9b5f64c90fa89653be891b4c626a

const state = {
  solicitudes: [],
  reportes: [],
  alertas: [],
  zonas: [],
  seleccion: null,
  user: JSON.parse(localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY) || 'null')
};

const app = document.querySelector('#app');

<<<<<<< HEAD
=======
app.innerHTML = `
  <aside class="sidebar">
    <a class="brand" href="#dashboard" aria-label="ZoneX inicio"><span class="brand-mark">Z</span><span>Zone<span>X</span></span></a>
    <p class="sidebar-label">OPERACIÓN</p>
    <nav class="nav" aria-label="Navegación principal">
      <button class="nav-link active" data-view="dashboard"><span>▦</span> Dashboard</button>
      <button class="nav-link" data-view="solicitudes"><span>⌁</span> Solicitudes <b id="pending-badge">0</b></button>
      <button class="nav-link" data-view="historial"><span>◷</span> Historial</button>
      <button class="nav-link" data-view="reportes"><span>▤</span> Cumplimiento</button>
      <button class="nav-link" data-view="alertas"><span>◉</span> Alertas <b id="alert-badge">0</b></button>
    </nav>
    <div class="sidebar-footer"><div id="user-avatar" class="user-avatar">ZX</div><div><strong id="current-user-name">Usuario ZoneX</strong><small id="current-user-role">Sin rol</small></div></div>
    <button id="logout-button" class="logout-button">↪ Cerrar sesión</button>
  </aside>
  <main class="content">
    <header class="topbar">
      <button class="mobile-menu" aria-label="Abrir menú">☰</button>
      <div><p class="eyebrow">ZONA FRANCA · COSTA RICA</p><h1 id="page-title">Dashboard de gestión</h1></div>
      <div class="header-actions"><button id="theme-toggle" class="icon-button" aria-label="Cambiar tema">☾</button><button class="primary-button" data-view="solicitudes" data-open-form>+ Nueva solicitud</button></div>
    </header>
    <div id="global-status" class="status-message" role="status" aria-live="polite"></div>

    <section id="dashboard" class="view active">
      <div class="hero-banner"><div><span class="pill light">OPERACIÓN EN LÍNEA</span><h2>Gestión inteligente,<br>decisiones humanas.</h2><p>Priorice solicitudes y detecte riesgos de cumplimiento antes de que escalen.</p></div><div class="hero-stat"><span>Solicitudes evaluadas</span><strong id="evaluated-rate">—</strong><small>del total registrado</small></div></div>
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
          <div class="form-row"><label>Sector *<select name="sector" required><option value="">Seleccione</option><option value="tecnologia">Tecnología</option><option value="manufactura">Manufactura</option><option value="bpo">BPO</option><option value="otro">Otro</option></select></label><label>Cédula jurídica *<input name="cedulaJuridica" required inputmode="numeric" maxlength="12" title="Use 3-101-123456 o 3101123456" placeholder="3-101-123456"><small class="field-hint">Formato: 3-101-123456</small></label></div>
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

    <section id="historial" class="view">
      <div class="section-heading"><div><h2>Historial de solicitudes</h2><p>Registro trazable de todas las solicitudes ingresadas y sus resultados.</p></div></div>
      <article class="panel table-panel"><div class="history-toolbar"><label for="history-search">Buscar solicitud<input id="history-search" type="search" placeholder="Empresa, sector o estado"></label><span id="history-count" class="history-count"></span></div><div id="history-table" class="table-wrap"></div></article>
    </section>

    <section id="alertas" class="view"><div class="section-heading"><div><h2>Panel de alertas</h2><p>Señales generadas automáticamente que requieren revisión humana.</p></div></div><div id="all-alerts" class="alert-card-list"></div></section>

    <section id="detalle" class="view"><button class="back-button" data-view="solicitudes">← Volver a solicitudes</button><div id="detail-content"></div></section>
  </main>`;

>>>>>>> 70026656c5ae9b5f64c90fa89653be891b4c626a
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
          <p class="login-subtitle">Plataforma de Operación de Zonas Francas</p>
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
        <div class="request-layout report-layout">
          <article class="panel form-panel"><h3>Nuevo reporte</h3><p class="form-intro">Los datos se comparan con los compromisos de la zona.</p>
            <form id="report-form" novalidate>
              <label>Empresa *<input name="empresa" required minlength="3" maxlength="80" placeholder="Empresa registrada"></label>
              <label>Periodo *<input name="periodo" required pattern="^[0-9]{4}-Q[1-4]$" title="Use el formato AAAA-Q1" placeholder="2026-Q3"></label>
              <div class="form-row"><label>Empleos reales *<input name="empleosReales" required type="number" min="0" max="100000" step="1"></label><label>Inversión ejecutada (USD) *<input name="inversionEjecutada" required type="number" min="0" max="1000000000" step="0.01"></label></div>
              <label>Exportaciones (USD) *<input name="exportaciones" required type="number" min="0" max="10000000000" step="0.01"></label>
              <p id="report-form-error" class="form-error" aria-live="polite"></p><button class="primary-button full-width" type="submit">Guardar y generar alertas</button>
            </form>
          </article>
          <article class="panel table-panel"><div class="panel-heading"><div><h3>Reportes recibidos</h3><p>Resultados consolidados para auditoría.</p></div></div><div id="reports-table" class="table-wrap"></div></article>
        </div>
      </section>

      <section id="alertas" class="view"><div class="section-heading"><div><h2>Panel de alertas</h2><p>Señales generadas automáticamente que requieren revisión humana.</p></div></div><div id="all-alerts" class="alert-card-list"></div></section>

      <section id="detalle" class="view"><button class="back-button" data-view="solicitudes">← Volver a solicitudes</button><div id="detail-content"></div></section>
    </main>
  `;

  // Attach application listeners
  $('#request-form')?.addEventListener('submit', submitRequest);
  $('#report-form')?.addEventListener('submit', submitReport);
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
  const response = await fetch(`${API_URL}${path}`, { cache: 'no-store', headers: { 'Content-Type': 'application/json', ...options.headers }, ...options });
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
      const sectorValido = zonaFranca.sectoresPermitidos.some((sector) => sector.toLowerCase().replace(/s$/, '') === solicitud.sector.toLowerCase().replace(/s$/, ''));
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

async function loadData(silent = false) {
  try {
<<<<<<< HEAD
    const [solicitudes, reportes, alertas, zonas] = await Promise.all([
      api('/solicitudes'),
      api('/reportes'),
      api('/alertas'),
      api('/zonas')
    ]);
    const newest = (left, right) => String(right.creadoEn || '').localeCompare(String(left.creadoEn || ''));
    Object.assign(state, {
      solicitudes: solicitudes.sort(newest),
      reportes: reportes.sort((left, right) => String(right.periodo || '').localeCompare(String(left.periodo || ''))),
      alertas: alertas.sort(newest),
      zonas
    });
    renderAll();
  } catch (error) {
    showStatus(error.message, 'error');
    renderEmptyState();
  }
}

function renderAll() { renderDashboard(); renderRequests(); renderReports(); renderAlerts(); }
function renderEmptyState() { const p = $('#priority-list'); if (p) p.innerHTML = '<p class="empty">No se pudo conectar con la API.</p>'; }
function statusClass(status) { return ({ Recomendada: 'success', Revisar: 'warning', Rechazada: 'danger', pendiente: 'neutral', Cumple: 'success', Riesgo: 'danger', 'En revisión': 'warning', Alta: 'danger', Media: 'warning', Baja: 'info' })[status] || 'neutral'; }
=======
    const [solicitudes, reportes, alertas, zonas] = await Promise.all([api('/solicitudes?_sort=creadoEn&_order=desc'), api('/reportes?_sort=periodo&_order=desc'), api('/alertas?_sort=creadoEn&_order=desc'), api('/zonas')]);
    Object.assign(state, { solicitudes, reportes, alertas, zonas }); renderAll();
  } catch (error) { if (!silent) showStatus(error.message, 'error'); renderEmptyState(); }
}

function renderAll() { renderDashboard(); renderRequests(); renderReports(); renderHistory($('#history-search')?.value || ''); renderAlerts(); }
function renderEmptyState() { $('#priority-list').innerHTML = '<p class="empty">No se pudo conectar con la API.</p>'; }
function statusClass(status) { return ({ Recomendada: 'success', Aceptada: 'success', Revisar: 'warning', Rechazada: 'danger', pendiente: 'neutral', Cumple: 'success', Riesgo: 'danger', 'En revisión': 'warning', Alta: 'danger', Media: 'warning', Baja: 'info' })[status] || 'neutral'; }
>>>>>>> 70026656c5ae9b5f64c90fa89653be891b4c626a
function badge(status) { return `<span class="badge ${statusClass(status)}">${escapeHtml(status)}</span>`; }
function canViewAllHistories() { return ['Administradora', 'Supervisor'].includes(currentUser?.rol); }
function visibleRequests() { return canViewAllHistories() ? state.solicitudes : state.solicitudes.filter((s) => String(s.creadoPorId) === String(currentUser?.id)); }
function requestsAwaitingDecision() { return state.solicitudes.filter((s) => s.evaluadoEn && ['Recomendada', 'Revisar', 'Rechazada'].includes(s.estado) && !s.decisionFinal); }

function renderDashboard() {
<<<<<<< HEAD
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
=======
  const evaluated = state.solicitudes.filter((s) => s.evaluadoEn); const recommended = state.solicitudes.filter((s) => s.estado === 'Recomendada'); const activeAlerts = requestsAwaitingDecision(); const compliant = state.reportes.filter((r) => r.estado === 'Cumple');
  $('#pending-badge').textContent = state.solicitudes.filter((s) => s.estado === 'pendiente').length; $('#alert-badge').textContent = activeAlerts.length;
  $('#evaluated-rate').textContent = state.solicitudes.length ? `${Math.round((evaluated.length / state.solicitudes.length) * 100)}%` : '0%'; $('#kpi-pending').textContent = state.solicitudes.filter((s) => s.estado === 'pendiente').length; $('#kpi-recommended').textContent = recommended.length; $('#kpi-alerts').textContent = activeAlerts.length; $('#kpi-compliance').textContent = state.reportes.length ? `${Math.round((compliant.length / state.reportes.length) * 100)}%` : '—';
>>>>>>> 70026656c5ae9b5f64c90fa89653be891b4c626a
  $('#priority-list').innerHTML = evaluated.slice().sort((a, b) => b.puntaje - a.puntaje).slice(0, 4).map((s) => `<button class="priority-item detail-trigger" data-id="${s.id}"><span class="company-initial">${escapeHtml(s.empresa[0])}</span><span><strong>${escapeHtml(s.empresa)}</strong><small>${escapeHtml(s.sector)} · ${money(s.inversionProyectada)}</small></span><span class="score">${s.puntaje}<small>/100</small></span>${badge(s.estado)}</button>`).join('') || '<p class="empty">Aún no hay solicitudes evaluadas.</p>';
  $('#recent-alerts').innerHTML = activeAlerts.slice(0, 4).map((s) => `<div class="alert-row"><span class="alert-dot ${statusClass(s.estado)}"></span><span><strong>${escapeHtml(s.empresa)}</strong><small>IA: ${escapeHtml(s.estado)} · ${escapeHtml(s.evaluadoEn.slice(0, 10))}</small></span>${badge(s.estado)}</div>`).join('') || '<p class="empty">No hay solicitudes evaluadas pendientes de decisión.</p>';
}

<<<<<<< HEAD
function renderRequests() { const el = $('#requests-table'); if (el) el.innerHTML = `<table><thead><tr><th>Empresa</th><th>Sector</th><th>Inversión</th><th>IA</th><th>Estado</th><th></th></tr></thead><tbody>${state.solicitudes.map((s) => `<tr><td><strong>${escapeHtml(s.empresa)}</strong><small>${escapeHtml(s.cedulaJuridica)}</small></td><td>${escapeHtml(s.sector)}</td><td>${money(s.inversionProyectada)}</td><td>${s.puntaje ?? '—'}</td><td>${badge(s.estado)}</td><td><button class="table-action detail-trigger" data-id="${s.id}">Ver análisis</button></td></tr>`).join('')}</tbody></table>`; }
function renderReports() { const el = $('#reports-table'); if (el) el.innerHTML = `<table><thead><tr><th>Empresa</th><th>Periodo</th><th>Empleos reales</th><th>Inversión ejecutada</th><th>Exportaciones</th><th>Estado</th></tr></thead><tbody>${state.reportes.map((r) => `<tr><td><strong>${escapeHtml(r.empresa)}</strong></td><td>${escapeHtml(r.periodo)}</td><td>${r.empleosReales}</td><td>${money(r.inversionEjecutada)}</td><td>${money(r.exportaciones)}</td><td>${badge(r.estado)}</td></tr>`).join('')}</tbody></table>`; }
function renderAlerts() { const el = $('#all-alerts'); if (el) el.innerHTML = state.alertas.map((a) => `<article class="alert-card"><div class="alert-card-icon ${statusClass(a.nivel)}">!</div><div><div class="alert-card-heading"><div><h3>${escapeHtml(a.titulo)}</h3><p>${escapeHtml(a.empresa)} · ${escapeHtml(a.creadoEn)}</p></div>${badge(a.nivel)}</div><p>${escapeHtml(a.descripcion)}</p><small>Estado: ${escapeHtml(a.estado)}</small>${a.estado === 'activa' ? `<button class="table-action resolve-alert" data-id="${a.id}">Marcar como resuelta</button>` : ''}</div></article>`).join('') || '<p class="empty">No hay alertas registradas.</p>'; }

function renderDetail(id) {
  const s = state.solicitudes.find((item) => String(item.id) === String(id));
  if (!s) return;
  state.seleccion = s;
  const z = state.zonas[0];
  const detailContent = $('#detail-content');
  if (detailContent) {
    detailContent.innerHTML = `<div class="detail-header"><div><p class="eyebrow">ANÁLISIS DE IA</p><h2>${escapeHtml(s.empresa)}</h2><p>${escapeHtml(s.cedulaJuridica)} · ${escapeHtml(s.correo)}</p></div>${badge(s.estado)}</div><div class="detail-grid"><article class="panel score-panel"><p>Puntaje de elegibilidad</p><strong>${s.puntaje ?? '—'}<small>/100</small></strong><div class="score-track"><span style="width:${s.puntaje ?? 0}%"></span></div><p>${s.estado === 'pendiente' ? 'Pendiente de evaluación.' : escapeHtml(s.justificacion)}</p></article><article class="panel"><h3>Datos declarados</h3><dl><dt>Sector</dt><dd>${escapeHtml(s.sector)}</dd><dt>Inversión proyectada</dt><dd>${money(s.inversionProyectada)}</dd><dt>Empleos proyectados</dt><dd>${s.empleosProyectados}</dd><dt>Zona evaluada</dt><dd>${escapeHtml(z?.nombre || '—')}</dd></dl></article></div><article class="human-note"><span>✓</span><div><strong>${s.decisionFinal ? `Decisión humana: ${escapeHtml(s.decisionFinal)}` : 'Decisión final pendiente de analista'}</strong><p>La IA entrega una recomendación explicable; no sustituye la aprobación humana.</p>${s.decisionFinal ? `<small>Registrada por ${escapeHtml(s.decididoPor || 'analista')} el ${escapeHtml(s.decididoEn || '')}</small>` : `<div class="decision-actions"><button class="secondary-button decision-button" data-decision="Aprobada" data-id="${s.id}">Aprobar solicitud</button><button class="danger-button decision-button" data-decision="Rechazada" data-id="${s.id}">Rechazar solicitud</button></div>`}</div></article>`;
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

async function submitReport(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formError = $('#report-form-error');
  formError.textContent = '';
  if (!form.checkValidity()) {
    formError.textContent = 'Revise los campos obligatorios y el formato del periodo.';
    form.reportValidity();
    return;
  }
  const button = form.querySelector('[type="submit"]');
  setLoading(button, true, 'Procesando…');
  const values = Object.fromEntries(new FormData(form));
  const zone = state.zonas[0];
  const request = { ...values, empleosReales: Number(values.empleosReales), inversionEjecutada: Number(values.inversionEjecutada), exportaciones: Number(values.exportaciones), estado: 'En revisión', creadoEn: new Date().toISOString() };
  try {
    const created = await api('/reportes', { method: 'POST', body: JSON.stringify(request) });
    const riesgoEmpleo = created.empleosReales < zone.empleosMinimos;
    const riesgoInversion = created.inversionEjecutada < zone.inversionMinima;
    const estado = reportStatus(riesgoEmpleo, riesgoInversion);
    await api(`/reportes/${created.id}`, { method: 'PATCH', body: JSON.stringify({ estado }) });
    if (estado === 'Riesgo') {
      await api('/alertas', { method: 'POST', body: JSON.stringify({ empresa: created.empresa, titulo: 'Reporte bajo los mínimos', descripcion: `El reporte ${created.periodo} registra ${riesgoEmpleo ? 'empleos' : 'inversión'} por debajo del umbral configurado.`, nivel: 'Alta', estado: 'activa', creadoEn: new Date().toLocaleDateString('es-CR', { day: '2-digit', month: 'short', year: 'numeric' }) }) });
    }
    form.reset();
    showStatus(estado === 'Riesgo' ? 'Reporte guardado y alerta generada para revisión.' : 'Reporte guardado correctamente.', estado === 'Riesgo' ? 'info' : 'success');
    await loadData();
  } catch (error) {
    showStatus(error.message, 'error');
  } finally {
    setLoading(button, false);
  }
}

function reportStatus(riesgoEmpleo, riesgoInversion) {
  return riesgoEmpleo || riesgoInversion ? 'Riesgo' : 'Cumple';
}

async function registerDecision(id, decision) {
  try {
    await api(`/solicitudes/${id}`, { method: 'PATCH', body: JSON.stringify({ decisionFinal: decision, decididoPor: state.user?.name || 'Analista', decididoEn: new Date().toISOString(), estado: decision }) });
    showStatus(`Decisión ${decision.toLowerCase()} registrada en la auditoría.`, 'success');
    await loadData();
    renderDetail(id);
  } catch (error) {
    showStatus(error.message, 'error');
  }
}

async function resolveAlert(id) {
  try {
    await api(`/alertas/${id}`, { method: 'PATCH', body: JSON.stringify({ estado: 'resuelta', resueltaPor: state.user?.name || 'Analista', resueltaEn: new Date().toISOString() }) });
    showStatus('Alerta marcada como resuelta.', 'success');
    await loadData();
  } catch (error) {
    showStatus(error.message, 'error');
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
  const decisionButton = event.target.closest('.decision-button');
  if (decisionButton) registerDecision(decisionButton.dataset.id, decisionButton.dataset.decision);
  const resolveButton = event.target.closest('.resolve-alert');
  if (resolveButton) resolveAlert(resolveButton.dataset.id);
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
=======
function renderRequests() { $('#requests-table').innerHTML = `<table><thead><tr><th>Empresa</th><th>Sector</th><th>Inversión</th><th>IA</th><th>Estado</th><th></th></tr></thead><tbody>${state.solicitudes.map((s) => `<tr><td><strong>${escapeHtml(s.empresa)}</strong><small>${escapeHtml(s.cedulaJuridica)}</small></td><td>${escapeHtml(s.sector)}</td><td>${money(s.inversionProyectada)}</td><td>${s.puntaje ?? '—'}</td><td>${badge(s.estado)}</td><td><button class="table-action detail-trigger" data-id="${s.id}">Ver análisis</button></td></tr>`).join('')}</tbody></table>`; }
function renderReports() { $('#reports-table').innerHTML = `<table><thead><tr><th>Empresa</th><th>Periodo</th><th>Empleos reales</th><th>Inversión ejecutada</th><th>Exportaciones</th><th>Estado</th></tr></thead><tbody>${state.reportes.map((r) => `<tr><td><strong>${escapeHtml(r.empresa)}</strong></td><td>${escapeHtml(r.periodo)}</td><td>${r.empleosReales}</td><td>${money(r.inversionEjecutada)}</td><td>${money(r.exportaciones)}</td><td>${badge(r.estado)}</td></tr>`).join('')}</tbody></table>`; }
function renderHistory(query = '') { const term = query.trim().toLowerCase(); const records = visibleRequests().filter((s) => [s.empresa, s.sector, s.estado, s.cedulaJuridica].some((value) => String(value || '').toLowerCase().includes(term))); $('#history-count').textContent = `${records.length} registro(s) ${canViewAllHistories() ? 'de todo el equipo' : 'asignado(s) a usted'}`; $('#history-table').innerHTML = `<table><thead><tr><th>Fecha de registro</th><th>Empresa</th><th>Registrado por</th><th>Resultado IA</th><th>Decisión</th><th>Acción</th></tr></thead><tbody>${records.map((s) => `<tr><td>${escapeHtml(s.creadoEn || '—')}</td><td><strong>${escapeHtml(s.empresa)}</strong><small>${escapeHtml(s.cedulaJuridica)}</small></td><td>${escapeHtml(s.creadoPorNombre || 'Sin asignar')}</td><td>${s.puntaje ?? 'Pendiente'} ${badge(s.estado)}</td><td>${s.decisionFinal ? badge(s.decisionFinal) : 'Pendiente'}</td><td><button class="table-action detail-trigger" data-id="${s.id}">Ver detalle</button></td></tr>`).join('') || '<tr><td colspan="6" class="empty">No hay solicitudes en su historial.</td></tr>'}</tbody></table>`; }
function renderAlerts() { const reviews = requestsAwaitingDecision(); $('#all-alerts').innerHTML = reviews.map((s) => `<article class="alert-card"><div class="alert-card-icon ${statusClass(s.estado)}">!</div><div><div class="alert-card-heading"><div><h3>${escapeHtml(s.empresa)}</h3><p>Evaluada por IA el ${escapeHtml(s.evaluadoEn.slice(0, 10))} · Puntaje ${s.puntaje}/100</p></div>${badge(s.estado)}</div><p>${escapeHtml(s.justificacion)}</p><div class="alert-actions"><button class="secondary-button detail-trigger" data-id="${s.id}">Ver detalle</button><button class="approve-button decision-trigger" data-id="${s.id}" data-decision="Aceptada">Aceptar</button><button class="reject-button decision-trigger" data-id="${s.id}" data-decision="Rechazada">Rechazar</button><button class="email-button email-trigger" data-id="${s.id}">Enviar por Gmail</button></div></div></article>`).join('') || '<p class="empty">No hay solicitudes evaluadas por IA pendientes de revisión humana.</p>'; }

function renderDetail(id) { const s = state.solicitudes.find((item) => String(item.id) === String(id)); if (!s) return; state.seleccion = s; const z = state.zonas[0]; const decision = s.decisionFinal || 'Pendiente de decisión humana'; $('#detail-content').innerHTML = `<div class="detail-header"><div><p class="eyebrow">ANÁLISIS DE IA</p><h2>${escapeHtml(s.empresa)}</h2><p>${escapeHtml(s.cedulaJuridica)} · ${escapeHtml(s.correo)}</p></div>${badge(s.estado)}</div><div class="detail-grid"><article class="panel score-panel"><p>Puntaje de elegibilidad</p><strong>${s.puntaje ?? '—'}<small>/100</small></strong><div class="score-track"><span style="width:${s.puntaje ?? 0}%"></span></div><p>${s.estado === 'pendiente' ? 'Pendiente de evaluación.' : escapeHtml(s.justificacion)}</p></article><article class="panel"><h3>Datos declarados</h3><dl><dt>Sector</dt><dd>${escapeHtml(s.sector)}</dd><dt>Inversión proyectada</dt><dd>${money(s.inversionProyectada)}</dd><dt>Empleos proyectados</dt><dd>${s.empleosProyectados}</dd><dt>Registrado por</dt><dd>${escapeHtml(s.creadoPorNombre || 'Sin asignar')}</dd><dt>Decisión final</dt><dd>${escapeHtml(decision)}</dd><dt>Zona evaluada</dt><dd>${escapeHtml(z?.nombre || '—')}</dd></dl></article></div><article class="human-note"><span>✓</span><div><strong>${escapeHtml(decision)}</strong><p>${s.decisionPor ? `Decidida por ${escapeHtml(s.decisionPor)} el ${escapeHtml(s.decisionEn.slice(0, 10))}.` : 'La IA entrega una recomendación explicable; no sustituye la aprobación humana.'}</p></div></article>`; showView('detalle'); }

function showView(view) { document.querySelectorAll('.view').forEach((section) => section.classList.toggle('active', section.id === view)); document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.dataset.view === view)); if (view === 'historial') renderHistory($('#history-search').value); const titles = { dashboard: 'Dashboard de gestión', solicitudes: 'Solicitudes de ingreso', historial: 'Historial de solicitudes', reportes: 'Reporte de cumplimiento', alertas: 'Panel de alertas', detalle: 'Detalle y análisis de IA' }; $('#page-title').textContent = titles[view]; }

async function processPending() { const button = $('#evaluate-pending'); const pending = state.solicitudes.filter((s) => s.estado === 'pendiente'); if (!pending.length) return showStatus('No hay solicitudes pendientes por evaluar.', 'info'); setLoading(button, true, 'Evaluando…'); try { const zone = state.zonas[0] || await api('/zonas/1'); const results = await Promise.all(pending.map(async (s) => { const evaluation = await evaluarConIA(s, zone); return api(`/solicitudes/${s.id}`, { method: 'PATCH', body: JSON.stringify({ ...evaluation, clasificacionIA: evaluation.clasificacion, estado: evaluation.clasificacion }) }); })); await Promise.all(results); showStatus(`${results.length} solicitud(es) evaluada(s) correctamente y enviadas a Alertas.`, 'success'); await loadData(); } catch (error) { showStatus(error.message, 'error'); } finally { setLoading(button, false); } }

function normalizeCedulaJuridica(value) { const digits = value.replace(/\D/g, ''); if (!/^3\d{9}$/.test(digits)) return null; return `${digits[0]}-${digits.slice(1, 4)}-${digits.slice(4)}`; }
async function submitRequest(event) { event.preventDefault(); const form = event.currentTarget; const formError = $('#form-error'); formError.textContent = ''; if (!form.checkValidity()) { formError.textContent = 'Complete todos los campos obligatorios con valores válidos.'; form.reportValidity(); return; } const button = form.querySelector('[type="submit"]'); const values = Object.fromEntries(new FormData(form)); const cedulaJuridica = normalizeCedulaJuridica(values.cedulaJuridica); if (!cedulaJuridica) { formError.textContent = 'La cédula jurídica debe tener 10 dígitos y comenzar con 3. Ejemplo: 3-101-123456.'; form.elements.cedulaJuridica.focus(); return; } setLoading(button, true, 'Guardando…'); const request = { ...values, cedulaJuridica, inversionProyectada: Number(values.inversionProyectada), empleosProyectados: Number(values.empleosProyectados), estado: 'pendiente', creadoEn: new Date().toISOString().slice(0, 10), creadoPorId: currentUser.id, creadoPorNombre: currentUser.nombre }; try { const created = await api('/solicitudes', { method: 'POST', body: JSON.stringify(request) }); const evaluation = await evaluarConIA(created, state.zonas[0]); const updatedRequest = await api(`/solicitudes/${created.id}`, { method: 'PATCH', body: JSON.stringify({ ...evaluation, clasificacionIA: evaluation.clasificacion, estado: evaluation.clasificacion }) }); state.solicitudes = [updatedRequest, ...state.solicitudes.filter((item) => String(item.id) !== String(updatedRequest.id))]; renderAll(); form.reset(); showStatus('Solicitud guardada, evaluada y añadida a su historial.', 'success'); showView('historial'); await loadData(); } catch (error) { formError.textContent = error.message; showStatus(error.message, 'error'); } finally { setLoading(button, false); } }

function initializeTheme() { const saved = localStorage.getItem(THEME_KEY); const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; setTheme(saved || preferred); }
function setTheme(theme) { document.documentElement.dataset.theme = theme; $('#theme-toggle').textContent = theme === 'dark' ? '☀' : '☾'; $('#theme-toggle').setAttribute('aria-label', theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'); localStorage.setItem(THEME_KEY, theme); }
async function resolveDecision(id, decision) { const request = state.solicitudes.find((item) => String(item.id) === String(id)); if (!request) return; try { await api(`/solicitudes/${id}`, { method: 'PATCH', body: JSON.stringify({ decisionFinal: decision, decisionPor: currentUser.nombre, decisionEn: new Date().toISOString() }) }); showStatus(`Solicitud ${decision.toLowerCase()} y registrada en el historial.`, 'success'); await loadData(); } catch (error) { showStatus(error.message, 'error'); } }
function sendByGmail(id) { const request = state.solicitudes.find((item) => String(item.id) === String(id)); if (!request) return; const result = request.decisionFinal || request.clasificacionIA || request.clasificacion || request.estado; const subject = `ZoneX: resultado de su solicitud - ${request.empresa}`; const body = `Estimado equipo de ${request.empresa},\n\nEl resultado de la revisión es: ${result}.\nPuntaje de IA: ${request.puntaje ?? 'No disponible'}/100.\n\nDetalle: ${request.justificacion || 'Sin detalle disponible.'}\n\nSaludos,\nZoneX Costa Rica`;
  // Producción: sustituir esta apertura por POST HTTPS a un backend con Gmail API y OAuth, sin exponer credenciales en el navegador.
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(request.correo)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer'); }
function initializeSession() { const name = currentUser?.nombre || 'Usuario ZoneX'; $('#current-user-name').textContent = name; $('#current-user-role').textContent = currentUser?.rol || 'Usuario'; $('#user-avatar').textContent = name.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase(); }
function logout() { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY); window.location.replace('/login/index.html'); }

app.addEventListener('click', (event) => { const viewButton = event.target.closest('[data-view]'); if (viewButton) showView(viewButton.dataset.view); const detailButton = event.target.closest('.detail-trigger'); if (detailButton) renderDetail(detailButton.dataset.id); const decisionButton = event.target.closest('.decision-trigger'); if (decisionButton) resolveDecision(decisionButton.dataset.id, decisionButton.dataset.decision); const emailButton = event.target.closest('.email-trigger'); if (emailButton) sendByGmail(emailButton.dataset.id); if (event.target.closest('#theme-toggle')) setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); if (event.target.closest('[data-open-form]')) window.setTimeout(() => $('#request-form').querySelector('input').focus(), 50); });
$('#history-search').addEventListener('input', (event) => renderHistory(event.target.value));
$('#request-form').addEventListener('submit', submitRequest); $('#evaluate-pending').addEventListener('click', processPending); $('#logout-button').addEventListener('click', logout); initializeTheme(); initializeSession(); loadData(); window.setInterval(() => { if (!document.hidden) loadData(true); }, 5000);
>>>>>>> 70026656c5ae9b5f64c90fa89653be891b4c626a
