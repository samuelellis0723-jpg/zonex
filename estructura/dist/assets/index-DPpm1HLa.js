(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`http://127.0.0.1:3002`,t=`zonex-theme`,n=`zonex-user-session`,r={solicitudes:[],reportes:[],alertas:[],zonas:[],seleccion:null,user:JSON.parse(localStorage.getItem(n)||sessionStorage.getItem(n)||`null`)},i=document.querySelector(`#app`),a=e=>document.querySelector(e),o=e=>new Intl.NumberFormat(`es-CR`,{style:`currency`,currency:`USD`,maximumFractionDigits:0}).format(Number(e)),s=(e=``)=>String(e).replace(/[&<>'"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&#39;`,'"':`&quot;`})[e]);function c(){i.style.display=`block`,i.innerHTML=`
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
  `;let e=a(`#login-form`),t=a(`#toggle-pwd-btn`),o=a(`#login-password`),s=a(`#login-email`);t?.addEventListener(`click`,()=>{let e=o.type===`password`;o.type=e?`text`:`password`,t.textContent=e?`🙈`:`👁`}),e?.addEventListener(`submit`,e=>{e.preventDefault();let t=s.value.trim(),i=o.value,c=a(`#remember-me`).checked;if(!t||!i){l(`Por favor complete todos los campos.`,`error`);return}let d=t.toLowerCase().includes(`admin`),f={name:d?`Carlos Mendoza`:`Equipo ZoneX`,role:d?`Administrador`:`Analista Senior`,initials:d?`CM`:`ZX`,email:t};r.user=f,c?localStorage.setItem(n,JSON.stringify(f)):sessionStorage.setItem(n,JSON.stringify(f)),u(),_()}),document.querySelectorAll(`[data-demo]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.demo;t===`admin`?(s.value=`admin@zonex.com`,o.value=`admin123`):(s.value=`analista@zonex.com`,o.value=`zonex123`),l(`Credenciales de ${t===`admin`?`Administrador`:`Analista`} cargadas. Presione Iniciar Sesión.`,`info`)})}),a(`#forgot-password-link`)?.addEventListener(`click`,e=>{e.preventDefault(),l(`Utilice las credenciales demo para ingresar al prototipo.`,`info`)})}function l(e,t=`info`){let n=a(`#login-status`);n&&(n.textContent=e,n.className=`status-message show ${t}`,window.setTimeout(()=>n.classList.remove(`show`),4e3))}function u(){i.style.display=`grid`,i.innerHTML=`
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
        <div class="user-avatar">${s(r.user?.initials||`ZX`)}</div>
        <div style="flex: 1; overflow: hidden;">
          <strong>${s(r.user?.name||`Equipo ZoneX`)}</strong>
          <small>${s(r.user?.role||`Analista`)}</small>
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
            <p>Bienvenido, <strong>${s(r.user?.name||`Usuario`)}</strong>. Priorice solicitudes y detecte riesgos de cumplimiento.</p>
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
  `,a(`#request-form`)?.addEventListener(`submit`,k),a(`#report-form`)?.addEventListener(`submit`,A),a(`#evaluate-pending`)?.addEventListener(`click`,O),a(`#logout-btn`)?.addEventListener(`click`,d),P()}function d(){r.user=null,localStorage.removeItem(n),sessionStorage.removeItem(n),c(),P()}function f(e,t=`info`){let n=a(`#global-status`);n&&(n.textContent=e,n.className=`status-message show ${t}`,window.setTimeout(()=>n.classList.remove(`show`),4500))}function p(e,t,n){e&&(e.disabled=t,e.dataset.original=e.dataset.original||e.textContent,e.textContent=t?n:e.dataset.original)}async function m(t,n={}){let r=await fetch(`${e}${t}`,{headers:{"Content-Type":`application/json`,...n.headers},...n});if(!r.ok)throw Error(`No fue posible completar la operación (${r.status}). Verifique que JSON-Server esté activo.`);return r.status===204?null:r.json()}function h(e){return e>=75?`Recomendada`:e>=50?`Revisar`:`Rechazada`}function g(e,t){return new Promise((n,r)=>{window.setTimeout(()=>{if(!e?.sector||!t)return r(Error(`Datos de solicitud o zona incompletos.`));let i=t.sectoresPermitidos.some(t=>t.toLowerCase().replace(/s$/,``)===e.sector.toLowerCase().replace(/s$/,``)),a=Math.min(Number(e.inversionProyectada)/t.inversionMinima,1)*30,o=Math.min(Number(e.empleosProyectados)/t.empleosMinimos,1)*30,s=Math.round((i?40:0)+a+o);n({puntaje:s,clasificacion:h(s),justificacion:`Sector ${i?`permitido`:`no permitido`}; inversión ${Number(e.inversionProyectada)>=t.inversionMinima?`cumple`:`bajo mínimo`} y empleos ${Number(e.empleosProyectados)>=t.empleosMinimos?`cumplen`:`bajo mínimo`} frente a los requisitos de ${t.nombre}.`,evaluadoEn:new Date().toISOString()})},700)})}async function _(){try{let[e,t,n,i]=await Promise.all([m(`/solicitudes`),m(`/reportes`),m(`/alertas`),m(`/zonas`)]),a=(e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``));Object.assign(r,{solicitudes:e.sort(a),reportes:t.sort((e,t)=>String(t.periodo||``).localeCompare(String(e.periodo||``))),alertas:n.sort(a),zonas:i}),v()}catch(e){f(e.message,`error`),y()}}function v(){S(),C(),w(),T()}function y(){let e=a(`#priority-list`);e&&(e.innerHTML=`<p class="empty">No se pudo conectar con la API.</p>`)}function b(e){return{Recomendada:`success`,Revisar:`warning`,Rechazada:`danger`,pendiente:`neutral`,Cumple:`success`,Riesgo:`danger`,"En revisión":`warning`,Alta:`danger`,Media:`warning`,Baja:`info`}[e]||`neutral`}function x(e){return`<span class="badge ${b(e)}">${s(e)}</span>`}function S(){let e=a(`#pending-badge`);if(!e)return;let t=r.solicitudes.filter(e=>e.estado!==`pendiente`),n=r.solicitudes.filter(e=>e.estado===`Recomendada`),i=r.alertas.filter(e=>e.estado===`activa`),c=r.reportes.filter(e=>e.estado===`Cumple`);e.textContent=r.solicitudes.filter(e=>e.estado===`pendiente`).length,a(`#alert-badge`).textContent=i.length,a(`#evaluated-rate`).textContent=r.solicitudes.length?`${Math.round(t.length/r.solicitudes.length*100)}%`:`0%`,a(`#kpi-pending`).textContent=r.solicitudes.filter(e=>e.estado===`pendiente`).length,a(`#kpi-recommended`).textContent=n.length,a(`#kpi-alerts`).textContent=i.length,a(`#kpi-compliance`).textContent=r.reportes.length?`${Math.round(c.length/r.reportes.length*100)}%`:`—`,a(`#priority-list`).innerHTML=t.slice().sort((e,t)=>t.puntaje-e.puntaje).slice(0,4).map(e=>`<button class="priority-item detail-trigger" data-id="${e.id}"><span class="company-initial">${s(e.empresa[0])}</span><span><strong>${s(e.empresa)}</strong><small>${s(e.sector)} · ${o(e.inversionProyectada)}</small></span><span class="score">${e.puntaje}<small>/100</small></span>${x(e.estado)}</button>`).join(``)||`<p class="empty">Aún no hay solicitudes evaluadas.</p>`,a(`#recent-alerts`).innerHTML=i.slice(0,4).map(e=>`<div class="alert-row"><span class="alert-dot ${b(e.nivel)}"></span><span><strong>${s(e.titulo)}</strong><small>${s(e.empresa)} · ${s(e.creadoEn)}</small></span>${x(e.nivel)}</div>`).join(``)||`<p class="empty">No hay alertas activas.</p>`}function C(){let e=a(`#requests-table`);e&&(e.innerHTML=`<table><thead><tr><th>Empresa</th><th>Sector</th><th>Inversión</th><th>IA</th><th>Estado</th><th></th></tr></thead><tbody>${r.solicitudes.map(e=>`<tr><td><strong>${s(e.empresa)}</strong><small>${s(e.cedulaJuridica)}</small></td><td>${s(e.sector)}</td><td>${o(e.inversionProyectada)}</td><td>${e.puntaje??`—`}</td><td>${x(e.estado)}</td><td><button class="table-action detail-trigger" data-id="${e.id}">Ver análisis</button></td></tr>`).join(``)}</tbody></table>`)}function w(){let e=a(`#reports-table`);e&&(e.innerHTML=`<table><thead><tr><th>Empresa</th><th>Periodo</th><th>Empleos reales</th><th>Inversión ejecutada</th><th>Exportaciones</th><th>Estado</th></tr></thead><tbody>${r.reportes.map(e=>`<tr><td><strong>${s(e.empresa)}</strong></td><td>${s(e.periodo)}</td><td>${e.empleosReales}</td><td>${o(e.inversionEjecutada)}</td><td>${o(e.exportaciones)}</td><td>${x(e.estado)}</td></tr>`).join(``)}</tbody></table>`)}function T(){let e=a(`#all-alerts`);e&&(e.innerHTML=r.alertas.map(e=>`<article class="alert-card"><div class="alert-card-icon ${b(e.nivel)}">!</div><div><div class="alert-card-heading"><div><h3>${s(e.titulo)}</h3><p>${s(e.empresa)} · ${s(e.creadoEn)}</p></div>${x(e.nivel)}</div><p>${s(e.descripcion)}</p><small>Estado: ${s(e.estado)}</small>${e.estado===`activa`?`<button class="table-action resolve-alert" data-id="${e.id}">Marcar como resuelta</button>`:``}</div></article>`).join(``)||`<p class="empty">No hay alertas registradas.</p>`)}function E(e){let t=r.solicitudes.find(t=>String(t.id)===String(e));if(!t)return;r.seleccion=t;let n=r.zonas[0],i=a(`#detail-content`);i&&(i.innerHTML=`<div class="detail-header"><div><p class="eyebrow">ANÁLISIS DE IA</p><h2>${s(t.empresa)}</h2><p>${s(t.cedulaJuridica)} · ${s(t.correo)}</p></div>${x(t.estado)}</div><div class="detail-grid"><article class="panel score-panel"><p>Puntaje de elegibilidad</p><strong>${t.puntaje??`—`}<small>/100</small></strong><div class="score-track"><span style="width:${t.puntaje??0}%"></span></div><p>${t.estado===`pendiente`?`Pendiente de evaluación.`:s(t.justificacion)}</p></article><article class="panel"><h3>Datos declarados</h3><dl><dt>Sector</dt><dd>${s(t.sector)}</dd><dt>Inversión proyectada</dt><dd>${o(t.inversionProyectada)}</dd><dt>Empleos proyectados</dt><dd>${t.empleosProyectados}</dd><dt>Zona evaluada</dt><dd>${s(n?.nombre||`—`)}</dd></dl></article></div><article class="human-note"><span>✓</span><div><strong>${t.decisionFinal?`Decisión humana: ${s(t.decisionFinal)}`:`Decisión final pendiente de analista`}</strong><p>La IA entrega una recomendación explicable; no sustituye la aprobación humana.</p>${t.decisionFinal?`<small>Registrada por ${s(t.decididoPor||`analista`)} el ${s(t.decididoEn||``)}</small>`:`<div class="decision-actions"><button class="secondary-button decision-button" data-decision="Aprobada" data-id="${t.id}">Aprobar solicitud</button><button class="danger-button decision-button" data-decision="Rechazada" data-id="${t.id}">Rechazar solicitud</button></div>`}</div></article>`,D(`detalle`))}function D(e){document.querySelectorAll(`.view`).forEach(t=>t.classList.toggle(`active`,t.id===e)),document.querySelectorAll(`.nav-link`).forEach(t=>t.classList.toggle(`active`,t.dataset.view===e));let t={dashboard:`Dashboard de gestión`,solicitudes:`Solicitudes de ingreso`,reportes:`Reporte de cumplimiento`,alertas:`Panel de alertas`,detalle:`Detalle y análisis de IA`},n=a(`#page-title`);n&&(n.textContent=t[e])}async function O(){let e=a(`#evaluate-pending`),t=r.solicitudes.filter(e=>e.estado===`pendiente`);if(!t.length)return f(`No hay solicitudes pendientes por evaluar.`,`info`);p(e,!0,`Evaluando…`);try{let e=r.zonas[0]||await m(`/zonas/1`),n=await Promise.all(t.map(async t=>{let n=await g(t,e);return m(`/solicitudes/${t.id}`,{method:`PATCH`,body:JSON.stringify({...n,estado:n.clasificacion})})}));await Promise.all(n),f(`${n.length} solicitud(es) evaluada(s) correctamente.`,`success`),await _()}catch(e){f(e.message,`error`)}finally{p(e,!1)}}async function k(e){e.preventDefault();let t=e.currentTarget,n=a(`#form-error`);if(n.textContent=``,!t.checkValidity()){n.textContent=`Revise los campos obligatorios y los formatos indicados.`,t.reportValidity();return}let i=t.querySelector(`[type="submit"]`);p(i,!0,`Guardando…`);let o=Object.fromEntries(new FormData(t)),s={...o,inversionProyectada:Number(o.inversionProyectada),empleosProyectados:Number(o.empleosProyectados),estado:`pendiente`,creadoEn:new Date().toISOString().slice(0,10)};try{let e=await m(`/solicitudes`,{method:`POST`,body:JSON.stringify(s)}),n=await g(e,r.zonas[0]);await m(`/solicitudes/${e.id}`,{method:`PATCH`,body:JSON.stringify({...n,estado:n.clasificacion})}),t.reset(),f(`Solicitud guardada y evaluada por la IA.`,`success`),await _(),E(e.id)}catch(e){f(e.message,`error`)}finally{p(i,!1)}}async function A(e){e.preventDefault();let t=e.currentTarget,n=a(`#report-form-error`);if(n.textContent=``,!t.checkValidity()){n.textContent=`Revise los campos obligatorios y el formato del periodo.`,t.reportValidity();return}let i=t.querySelector(`[type="submit"]`);p(i,!0,`Procesando…`);let o=Object.fromEntries(new FormData(t)),s=r.zonas[0],c={...o,empleosReales:Number(o.empleosReales),inversionEjecutada:Number(o.inversionEjecutada),exportaciones:Number(o.exportaciones),estado:`En revisión`,creadoEn:new Date().toISOString()};try{let e=await m(`/reportes`,{method:`POST`,body:JSON.stringify(c)}),n=e.empleosReales<s.empleosMinimos,r=j(n,e.inversionEjecutada<s.inversionMinima);await m(`/reportes/${e.id}`,{method:`PATCH`,body:JSON.stringify({estado:r})}),r===`Riesgo`&&await m(`/alertas`,{method:`POST`,body:JSON.stringify({empresa:e.empresa,titulo:`Reporte bajo los mínimos`,descripcion:`El reporte ${e.periodo} registra ${n?`empleos`:`inversión`} por debajo del umbral configurado.`,nivel:`Alta`,estado:`activa`,creadoEn:new Date().toLocaleDateString(`es-CR`,{day:`2-digit`,month:`short`,year:`numeric`})})}),t.reset(),f(r===`Riesgo`?`Reporte guardado y alerta generada para revisión.`:`Reporte guardado correctamente.`,r===`Riesgo`?`info`:`success`),await _()}catch(e){f(e.message,`error`)}finally{p(i,!1)}}function j(e,t){return e||t?`Riesgo`:`Cumple`}async function M(e,t){try{await m(`/solicitudes/${e}`,{method:`PATCH`,body:JSON.stringify({decisionFinal:t,decididoPor:r.user?.name||`Analista`,decididoEn:new Date().toISOString(),estado:t})}),f(`Decisión ${t.toLowerCase()} registrada en la auditoría.`,`success`),await _(),E(e)}catch(e){f(e.message,`error`)}}async function N(e){try{await m(`/alertas/${e}`,{method:`PATCH`,body:JSON.stringify({estado:`resuelta`,resueltaPor:r.user?.name||`Analista`,resueltaEn:new Date().toISOString()})}),f(`Alerta marcada como resuelta.`,`success`),await _()}catch(e){f(e.message,`error`)}}function P(){let e=localStorage.getItem(t),n=window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`;F(e||n)}function F(e){document.documentElement.dataset.theme=e;let n=a(`#theme-toggle`);n&&(n.textContent=e===`dark`?`☀`:`☾`,n.setAttribute(`aria-label`,e===`dark`?`Activar modo claro`:`Activar modo oscuro`)),localStorage.setItem(t,e)}i.addEventListener(`click`,e=>{let t=e.target.closest(`[data-view]`);t&&D(t.dataset.view);let n=e.target.closest(`.detail-trigger`);n&&E(n.dataset.id),e.target.closest(`#theme-toggle`)&&F(document.documentElement.dataset.theme===`dark`?`light`:`dark`),e.target.closest(`[data-open-form]`)&&window.setTimeout(()=>a(`#request-form`)?.querySelector(`input`)?.focus(),50);let r=e.target.closest(`.decision-button`);r&&M(r.dataset.id,r.dataset.decision);let i=e.target.closest(`.resolve-alert`);i&&N(i.dataset.id)});function I(){r.user?(u(),_()):(c(),P())}I();