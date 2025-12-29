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

  // Listeners de los botones de inscripción SIEMPRE activos
  const abrirModal = () => {
    if (!modal || !formInscribir || !msgConfirmacion) return;
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
    setTimeout(() => (nombreInput || correoInput)?.focus(), 100);
    msgConfirmacion.hidden = true;
    formInscribir.hidden = false;
  };
  const cerrarModal = () => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
  };
  btnsInscribir.forEach(btn => btn.addEventListener('click', abrirModal));
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.hasAttribute('data-close')) {
        cerrarModal();
      }
    });
  }
  d.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      cerrarModal();
    }
  });

  // --- INTEGRACIÓN SUPABASE GLOBAL ---
  // Cliente Supabase disponible globalmente por el script CDN (esperar a que esté inicializado)
  let supabase = window.supabase;
  
  // Si Supabase aún no está inicializado, esperar a que esté listo
  if (!supabase) {
    const waitForSupabase = setInterval(() => {
      if (window.supabase) {
        supabase = window.supabase;
        clearInterval(waitForSupabase);
        console.log('✅ Supabase inicializado correctamente');
      }
    }, 100);
  }

  // Listener del formulario SIEMPRE activo
  if (formInscribir) {
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
      let errorSupabase = null;
      let errorFlask = null;
      // Enviar a Supabase
      try {
        // Usar el cliente Supabase inicializado globalmente
        if (window.supabaseClient && typeof window.supabaseClient.from === 'function') {
          const { data, error } = await window.supabaseClient.from('inscripciones').insert([
            { nombre, edad: Number(edad), telefono, programa, correo }
          ]);
          console.log('Resultado insert Supabase:', { data, error });
          if (error) errorSupabase = error.message;
        } else {
          console.warn('Supabase no está inicializado aún. Solo se enviará al backend Flask.');
        }
      } catch (err) {
        console.error('Error JS al insertar en Supabase:', err);
        errorSupabase = err.message || 'Error desconocido en Supabase';
      }
      // Enviar a Flask
      try {
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('email', correo);
        formData.append('mensaje', `Edad: ${edad}\nTeléfono: ${telefono}\nPrograma: ${programa}`);
        const response = await fetch('/enviar-correo', {
          method: 'POST',
          body: formData
        });
        const text = await response.text();
        if (!text.includes('Correo enviado correctamente')) {
          errorFlask = text;
        }
      } catch (err) {
        errorFlask = err.message || 'Error desconocido en backend';
      }
      // Mostrar resultado
      let mensaje = '';
      if (!errorSupabase && !errorFlask) {
        mensaje = '¡Gracias! Hemos recibido tus datos y te contactaremos pronto.';
      } else {
        mensaje = 'Hubo problemas:';
        if (errorSupabase) mensaje += `<br>Supabase: ${errorSupabase}`;
        if (errorFlask) mensaje += `<br>Correo: ${errorFlask}`;
      }
      msgConfirmacion.innerHTML = mensaje + '<br><button id="btnCerrarModal" class="btn-secundario ancho" style="margin-top:1em;">Cerrar</button>';
      // Agregar evento al botón cerrar
      const btnCerrar = document.getElementById('btnCerrarModal');
      if (btnCerrar) {
// ...existing code...
      }
    });
  }
    // Permitir scroll en el modal si el contenido es largo
    if (modal) {
      modal.style.overflowY = 'auto';
      modal.style.maxHeight = '90vh';
    }

  // --- MANEJO DEL MENÚ MÓVIL ---
  const menuToggle = d.getElementById('menuToggle');
  const mobileDrawer = d.getElementById('menuMovil');
  const drawerLinks = d.querySelectorAll('.drawer-link');
  const mobileDrawerClose = d.querySelector('.mobile-drawer-close');

  if (menuToggle && mobileDrawer) {
    const toggleMenu = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      mobileDrawer.classList.toggle('open');
      mobileDrawer.setAttribute('aria-hidden', String(isExpanded));
    };

    menuToggle.addEventListener('click', toggleMenu);
    drawerLinks.forEach(link => link.addEventListener('click', toggleMenu));
    
    // Botón X para cerrar
    if (mobileDrawerClose) {
      mobileDrawerClose.addEventListener('click', toggleMenu);
    }
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
  // --- CHAT DE AYUDA BÁSICO ---
  const chatAyudaBtn = document.getElementById('chatAyudaBtn');
  const chatAyudaVentana = document.getElementById('chatAyudaVentana');
  const chatAyudaCerrarBtn = document.getElementById('chatAyudaCerrarBtn');
  const chatAyudaMensajes = document.getElementById('chatAyudaMensajes');
  const chatAyudaInput = document.getElementById('chatAyudaInput');
  const chatAyudaEnviar = document.getElementById('chatAyudaEnviar');

  if (chatAyudaBtn && chatAyudaVentana && chatAyudaCerrarBtn) {
    // Abrir chat
    chatAyudaBtn.onclick = function() {
      chatAyudaVentana.style.display = 'block';
      chatAyudaBtn.style.display = 'none';
      if (chatAyudaInput) chatAyudaInput.focus();
    };
    
    // Cerrar chat
    chatAyudaCerrarBtn.onclick = function() {
      chatAyudaVentana.style.display = 'none';
      chatAyudaBtn.style.display = '';
    };
    
    // Escape para cerrar
    document.onkeydown = function(e) {
      if (e.key === 'Escape' && chatAyudaVentana.style.display === 'block') {
        chatAyudaVentana.style.display = 'none';
        chatAyudaBtn.style.display = '';
      }
    };
    
    // Enviar mensaje
    if (chatAyudaEnviar && chatAyudaInput) {
      chatAyudaEnviar.onclick = function() {
        const pregunta = chatAyudaInput.value.trim();
        if (!pregunta) return;
        
        // Mensaje usuario
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-ayuda-msg chat-ayuda-user';
        userMsg.textContent = pregunta;
        chatAyudaMensajes.appendChild(userMsg);
        chatAyudaInput.value = '';
        chatAyudaMensajes.scrollTop = chatAyudaMensajes.scrollHeight;
        
        // Respuesta bot
        setTimeout(function() {
          const botMsg = document.createElement('div');
          botMsg.className = 'chat-ayuda-msg chat-ayuda-bot';
          botMsg.textContent = obtenerRespuestaChat(pregunta);
          chatAyudaMensajes.appendChild(botMsg);
          chatAyudaMensajes.scrollTop = chatAyudaMensajes.scrollHeight;
        }, 600);
      };
      
      // Enviar con Enter
      chatAyudaInput.onkeypress = function(e) {
        if (e.key === 'Enter') {
          chatAyudaEnviar.onclick();
        }
      };
    }
  }

  // Respuestas automáticas simples
  function obtenerRespuestaChat(pregunta) {
    const texto = pregunta.toLowerCase();
    if (texto.includes('inscripción') || texto.includes('inscribir')) {
      return 'Puedes inscribirte usando el botón "Inscribirse" en la parte superior o en el modal de inscripción.';
    }
    if (texto.includes('programa') || texto.includes('carrera')) {
      return 'Consulta la sección "Programas universitarios" para ver todas las carreras disponibles.';
    }
    if (texto.includes('contacto') || texto.includes('correo')) {
      return 'Nuestro correo de contacto es contacto@universidadexponencial.com.';
    }
    if (texto.includes('beca') || texto.includes('ayuda económica')) {
      return 'Las becas se informan al finalizar el proceso de admisión. ¡Postula y consulta!';
    }
    if (texto.includes('admisión') || texto.includes('requisitos')) {
      return 'El proceso de admisión está detallado en la sección "Admisiones".';
    }
    if (texto.includes('hola') || texto.includes('buenas')) {
      return '¡Hola! ¿En qué puedo ayudarte hoy?';
    }
    return 'Gracias por tu mensaje. Un asesor te responderá pronto.';
  }
});