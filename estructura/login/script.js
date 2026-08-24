const API_URL = 'http://localhost:3001';
const SESSION_KEY = 'zonex-session';
const form = document.querySelector('#login-form');
const passwordInput = document.querySelector('#password');
const togglePassword = document.querySelector('#toggle-password');
const message = document.querySelector('#login-message');
const loginButton = document.querySelector('#login-button');

function showMessage(text) { message.textContent = text; message.classList.add('show'); }
function setLoading(loading) { loginButton.disabled = loading; loginButton.textContent = loading ? 'Verificando…' : 'Entrar →'; }

togglePassword.addEventListener('click', () => { const visible = passwordInput.type === 'text'; passwordInput.type = visible ? 'password' : 'text'; togglePassword.textContent = visible ? '◉' : '◉̸'; togglePassword.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña'); });

form.addEventListener('submit', async (event) => {
  event.preventDefault(); message.classList.remove('show');
  if (!form.checkValidity()) { showMessage('Completa tu correo y contraseña para continuar.'); form.reportValidity(); return; }
  const { email, password } = Object.fromEntries(new FormData(form)); setLoading(true);
  try {
    // Producción: usar HTTPS y enviar las credenciales a un endpoint seguro, p. ej. POST https://api.zonex.cr/auth/login.
    const response = await fetch(`${API_URL}/usuarios?correo=${encodeURIComponent(email)}&contrasena=${encodeURIComponent(password)}`, { cache: 'no-store' });
    if (!response.ok) throw new Error('No se pudo conectar con el servicio de acceso.');
    const [user] = await response.json();
    if (!user || !user.activo) { showMessage('Correo o contraseña incorrectos.'); return; }
    const session = { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol };
    const remember = document.querySelector('#remember');
    const storage = remember?.checked ? localStorage : sessionStorage;
    storage.setItem(SESSION_KEY, JSON.stringify(session));
    window.location.replace('../');
  } catch (error) { showMessage(error.message); } finally { setLoading(false); }
});

document.querySelector('#forgot-link')?.addEventListener('click', (event) => { event.preventDefault(); showMessage('La recuperación de contraseña debe conectarse a un endpoint HTTPS de identidad.'); });
document.querySelector('#register-link')?.addEventListener('click', (event) => { event.preventDefault(); showMessage('El registro estará disponible tras la aprobación de un administrador.'); });
document.querySelectorAll('[data-social]').forEach((button) => button.addEventListener('click', () => showMessage(`El acceso con ${button.dataset.social} requiere configurar OAuth seguro en el backend.`)));
