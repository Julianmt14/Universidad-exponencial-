document.addEventListener('DOMContentLoaded', () => {
  const d = document;
  const body = d.body;

  // Debug: Verificar que elementos importantes existan
  console.log('🔧 Iniciando funciones.js');
  console.log('✅ Elementos encontrados:', {
    themeToggle: !!d.getElementById('themeToggle'),
    modal: !!d.getElementById('modal-inscribir'),
    menuToggle: !!d.getElementById('menuToggle'),
    btnsInscribir: d.querySelectorAll('.btn-inscribir').length,
    programaToggles: d.querySelectorAll('.programa-toggle').length,
    btnsInfoCarrera: d.querySelectorAll('.btn-info-carrera').length
  });

  // --- MANEJO DEL TEMA (MODO OSCURO/CLARO) ---
  const themeToggle = d.getElementById('themeToggle');
  if (themeToggle) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
      const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', newTheme);
      themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
      localStorage.setItem('theme', newTheme);
      // Actualizar paneles abiertos
      document.querySelectorAll('.programa-info:not([hidden]) .detalle').forEach(detalle => {
        detalle.classList.remove('tema-light', 'tema-dark');
        detalle.classList.add('tema-' + newTheme);
      });
    });
  }

  // --- MANEJO DEL MODAL DE INSCRIPCIÓN ---
  const modal = d.getElementById('modal-inscribir');
  const formInscribir = d.getElementById('form-inscribir');
  const msgConfirmacion = d.getElementById('mensaje-confirmacion');
  const btnsInscribir = d.querySelectorAll('.btn-inscribir');

  if (modal && formInscribir && msgConfirmacion && btnsInscribir.length > 0) {
    const abrirModal = () => {
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('open');
  const correoInput = d.getElementById('correo');
  const nombreInput = d.getElementById('nombre');
  const edadInput = d.getElementById('edad');
  const telefonoInput = d.getElementById('telefono');
  const programaSelect = d.getElementById('programa');
  if (correoInput) correoInput.value = '';
  if (nombreInput) nombreInput.value = '';
  if (edadInput) edadInput.value = '';
  if (telefonoInput) telefonoInput.value = '';
  if (programaSelect) programaSelect.value = '';
  // Enfocar el primer campo
  setTimeout(() => (nombreInput || correoInput)?.focus(), 100);
      msgConfirmacion.hidden = true;
      formInscribir.hidden = false;
    };

    const cerrarModal = () => {
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('open');
    };

    btnsInscribir.forEach(btn => btn.addEventListener('click', abrirModal));
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.hasAttribute('data-close')) {
        cerrarModal();
      }
    });
    d.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        cerrarModal();
      }
    });

    formInscribir.addEventListener('submit', async (e) => {
      e.preventDefault();
      const correoInput = d.getElementById('correo');
      const nombreInput = d.getElementById('nombre');
      const edadInput = d.getElementById('edad');
      const telefonoInput = d.getElementById('telefono');
      const programaSelect = d.getElementById('programa');
      const correo = correoInput ? correoInput.value.trim() : '';
      const nombre = nombreInput ? nombreInput.value.trim() : '';
      const edad = edadInput ? edadInput.value.trim() : '';
      const telefono = telefonoInput ? telefonoInput.value.trim() : '';
      const programa = programaSelect ? programaSelect.value : '';

      // Validaciones básicas
      if (!nombre) {
        msgConfirmacion.textContent = 'Por favor, ingresa tu nombre.';
        msgConfirmacion.hidden = false;
        nombreInput && nombreInput.focus();
        return;
      }
      if (!edad || isNaN(Number(edad)) || Number(edad) < 15 || Number(edad) > 99) {
        msgConfirmacion.textContent = 'Ingresa una edad válida (15-99).';
        msgConfirmacion.hidden = false;
        edadInput && edadInput.focus();
        return;
      }
      if (!telefono || !/^[0-9\-\+\s]{7,15}$/.test(telefono)) {
        msgConfirmacion.textContent = 'Ingresa un teléfono válido (7-15 dígitos).';
        msgConfirmacion.hidden = false;
        telefonoInput && telefonoInput.focus();
        return;
      }
      if (!programa) {
        msgConfirmacion.textContent = 'Selecciona un programa de interés.';
        msgConfirmacion.hidden = false;
        programaSelect && programaSelect.focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        msgConfirmacion.textContent = 'Ingresa un correo válido.';
        msgConfirmacion.hidden = false;
        correoInput && correoInput.focus();
        return;
      }
      formInscribir.hidden = true;
      msgConfirmacion.hidden = false;
      msgConfirmacion.textContent = 'Enviando...';
      try {
        // Simulación de envío. Reemplaza esto con tu llamada fetch real si es necesario.
        await new Promise(resolve => setTimeout(resolve, 1500));
  msgConfirmacion.textContent = '¡Gracias! Hemos recibido tus datos y te contactaremos pronto.';
  console.log(`Datos enviados (simulado): nombre=${nombre}, edad=${edad}, telefono=${telefono}, programa=${programa}, correo=${correo}`);
      } catch (err) {
        msgConfirmacion.textContent = 'Error al enviar. Intenta luego.';
      }
    });
  }

  // --- MANEJO DEL MENÚ MÓVIL ---
  const menuToggle = d.getElementById('menuToggle');
  const mobileDrawer = d.getElementById('menuMovil');
  const drawerLinks = d.querySelectorAll('.drawer-link');

  if (menuToggle && mobileDrawer) {
    const toggleMenu = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      mobileDrawer.classList.toggle('open');
      mobileDrawer.setAttribute('aria-hidden', String(isExpanded));
    };

    menuToggle.addEventListener('click', toggleMenu);
    drawerLinks.forEach(link => link.addEventListener('click', toggleMenu));
  }

  // --- INFORMACIÓN DE LAS CARRERAS (reutilizable) ---
  const infoCarreras = {
    'ingenieria': 'Ingeniería de Sistemas: Desarrolla software, inteligencia artificial y arquitectura cloud. Duración: 5 años. Campo laboral: DevOps, Data Science, Cloud Computing.',
    'derecho': 'Derecho: Formación en justicia, ética y litigio. Áreas: penal, civil, constitucional. Campo laboral: Abogacía, magistratura, consultoría legal.',
    'sociales': 'Ciencias Sociales: Psicología y sociedad. Objetivo: transformación social. Ámbitos: investigación e intervención social.',
    'medicina': 'Medicina: Ciencia y vocación de servicio. Prácticas clínicas y simulación. Áreas: medicina general y especialidades.',
    'arquitectura': 'Arquitectura: Diseño de espacios sostenibles. Competencias: diseño y modelado. Ámbitos: urbanismo e interiores.',
    'administracion': 'Administración de Empresas: Liderazgo y estrategia. Énfasis: innovación y finanzas. Roles: dirección y consultoría.',
    'civil': 'Ingeniería Civil: Infraestructura clave. Áreas: vías y estructuras. Impacto: desarrollo sostenible.',
    'educacion': 'Educación: Pedagogía innovadora. Metodologías activas e inclusivas. Oportunidades: docencia y gestión educativa.',
    'contaduria': 'Contaduría Pública: Finanzas y auditoría. Competencias: NIIF y análisis. Ámbitos: auditoría y fiscal.'
  };

  // --- MANEJO DE PANELES "VER MÁS" EN PROGRAMAS ---
  d.querySelectorAll('.programa-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = d.getElementById(panelId);
      const article = btn.closest('.programa-item');
      
      if (!panel || !article) return;

      const isExpanded = article.getAttribute('aria-expanded') === 'true';

      // Cerrar todos los demás paneles primero
      d.querySelectorAll('.programa-item').forEach(item => {
        if (item !== article) {
          item.setAttribute('aria-expanded', 'false');
          const otherPanelId = item.querySelector('.programa-toggle')?.getAttribute('aria-controls');
          if (otherPanelId) {
            const otherPanel = d.getElementById(otherPanelId);
            if (otherPanel) otherPanel.setAttribute('hidden', '');
          }
          const otherBtn = item.querySelector('.programa-toggle');
          if (otherBtn) otherBtn.textContent = 'Ver más';
        }
      });

      // Determinar clave del programa (preferir data-programa)
      const programaKey = article.dataset.programa || (panelId ? panelId.replace(/^info-/, '') : '');

      // Abrir o cerrar el panel actual
      if (!isExpanded) {
        // Inyectar contenido detallado si existe (HTML enriquecido: título + párrafo)
        const detalle = infoCarreras[programaKey];
        if (detalle) {
          const titulo = article.querySelector('.programa-title')?.textContent || programaKey;
          // Detectar tema actual
          const tema = document.body.getAttribute('data-theme') || 'light';
          panel.innerHTML = `
            <div class="detalle tema-${tema}">
              <h4 class="detalle-titulo">${titulo}</h4>
              <p class="detalle-texto">${detalle}</p>
            </div>
          `;
        }
        // En desktop, al abrir, todos los items de la misma fila reciben .fila-bajada y se elimina cualquier overlay/expandir-fila
        // Ya no se aplica fila-bajada, solo el item expandido recibe el margen por aria-expanded=true

        panel.removeAttribute('hidden');
        article.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Ver menos';
        // Llevar el panel a la vista
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // Cerrar
        panel.setAttribute('hidden', '');
        // limpiar posibles clases de posicionamiento o expansión
        panel.classList.remove('overlay-top');
        article.classList.remove('expandir-fila');
        // limpiar fila-bajada en el contenedor si existe
        const container = article.parentElement;
        if (container) {
          const items = Array.from(container.querySelectorAll('.programa-item'));
          items.forEach(it => { it.classList.remove('fila-bajada'); });
        }
        article.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Ver más';
      }
    });
  });
  
  // Eliminado: manejo legacy de botones .btn-info-carrera
  // Ahora la información se inyecta directamente en el panel .programa-info cuando se pulsa 'Ver más'.

  // --- MANEJO DEL FORMULARIO DEL BOLETÍN (NEWSLETTER) ---
  const miniNewsForm = d.getElementById('miniNews');
  if (miniNewsForm) {
    miniNewsForm.addEventListener('submit', e => {
      e.preventDefault();
      const mailInput = d.getElementById('miniEmail');
      const msgSpan = miniNewsForm.querySelector('.mini-msg');
      if (mailInput && msgSpan && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailInput.value.trim())) {
        msgSpan.textContent = '¡Gracias por suscribirte!';
        mailInput.value = '';
        setTimeout(() => { 
          if (msgSpan) msgSpan.textContent = ''; 
        }, 3000);
      } else if (msgSpan) {
        msgSpan.textContent = 'Correo inválido';
      }
    });
  }

  // --- ACTUALIZAR AÑO EN EL FOOTER ---
  const anioSpan = d.getElementById('anio');
  if (anioSpan) {
    anioSpan.textContent = new Date().getFullYear();
  }

  // Debug: Confirmar que todo se ha cargado correctamente
  console.log('🎉 Todas las funciones JavaScript han sido inicializadas correctamente');
});