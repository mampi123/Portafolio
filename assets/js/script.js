document.addEventListener('DOMContentLoaded', function () {
  // Reemplaza iconos feather
  feather.replace();

  // Botón de cambiar tema, flecha, etc. (opcional)
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function () {
      const aboutSection = document.getElementById('skills');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Manejo de pestañas
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Quita la clase 'active' de todos los botones y contenidos
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Activa la pestaña correspondiente
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');

      // Lanza la animación de barras
      animateSkillBars();
    });
  });

  // Animar las barras al hacer scroll
  window.addEventListener('scroll', animateSkillBars);

  // Llamada inicial (por si ya están en viewport)
  animateSkillBars();
});

function animateSkillBars() {
  // Selecciona todas las barras de progreso
  const skillBars = document.querySelectorAll('.skill-progress-bar');

  skillBars.forEach(bar => {
    // Evita que la animación se repita
    if (!bar.classList.contains('animated')) {
      // Verifica si la barra está en viewport (opcional)
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (barPosition < screenPosition) {
        // Toma el porcentaje del data-width
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
        bar.classList.add('animated');
      }
    }
  });
}

  // Funcionalidad de pestañas en habilidades
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
      button.addEventListener('click', function () {
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
          animateSkillBars(tabId);
      });
  });

  // Animar barras de progreso en scroll y al cambiar de pestaña
  function animateSkillBars(tabId = null) {
      let skillBars;
      if (tabId) {
          skillBars = document.querySelectorAll(`#${tabId} .skill-progress-bar`);
      } else {
          skillBars = document.querySelectorAll('.skill-progress-bar');
      }
      skillBars.forEach(bar => {
          if (!bar.classList.contains('animated')) {
              const width = bar.getAttribute('data-width');
              bar.style.width = width;
              bar.classList.add('animated');
          }
      });
  }
  
  window.addEventListener('scroll', () => animateSkillBars());
  animateSkillBars();


// Animar las barras de progreso en el scroll
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  skillBars.forEach(bar => {
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (barPosition < screenPosition && !bar.classList.contains('animated')) {
          const width = bar.getAttribute('data-width');  // Leer el data-width
          bar.style.width = width;
          bar.classList.add('animated');
      }
  });
}

// Datos de los proyectos con múltiples imágenes y video
const projectsData = {
  lapacho: {
    title: "Talabartería",
    description: "Landing page y e-commerce para Talabartería con integración de pagos y gestión de inventario.",
    images: [
          "assets/img/lapacho1.png",
          "assets/img/lapacho2.png",
          "assets/img/lapacho3.png",
          "assets/img/lapacho4.png",
          "assets/img/LAPACHO5.png",
          "assets/img/lapacho6.png",
          "assets/img/lapacho7.png",
          "assets/img/lapacho8.png",
          "assets/img/lapacho9.png",
          "assets/img/lapacho10.png",
      ],
      video: "assets/videos/lapacho.mp4",
      description: "Landing page y e-commerce desarrollado con WordPress, WooCommerce y JavaScript."
  },
};

let currentProject = '';
let currentSlide = 0;

// Función para abrir el lightbox
function openLightbox(projectId) {
  // Verificar si el proyecto existe
  if (!projectsData[projectId]) return;
  
  currentProject = projectId;
  currentSlide = 0;
  
  // Obtener datos del proyecto
  const project = projectsData[projectId];
  
  // Establecer título y descripción
  document.getElementById('lightbox-title').textContent = project.title;
  document.getElementById('lightbox-description').textContent = project.description;
  
  // Limpiar el contenedor del carrusel
  const carouselContainer = document.getElementById('carousel-container');
  carouselContainer.innerHTML = '';
  
  // Crear elementos para cada imagen
  project.images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${project.title} - Imagen ${index + 1}`;
    img.className = index === 0 ? 'active' : '';
    carouselContainer.appendChild(img);
  });
  
  // Crear indicadores (opcional)
  createIndicators(project.images.length);
  
  // Mostrar el lightbox
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('active');
  
  // Prevenir scroll del body
  document.body.style.overflow = 'hidden';
}

// Función para cerrar el lightbox
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  
  // Restaurar scroll
  document.body.style.overflow = '';
}

// Función para cambiar de slide
function changeSlide(direction) {
  if (!currentProject) return;
  
  const project = projectsData[currentProject];
  const slides = document.querySelectorAll('.carousel-container img, .carousel-container video');
  
  // Ocultar slide actual
  slides[currentSlide].classList.remove('active');
  
  // Calcular nuevo índice
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  
  // Mostrar nuevo slide
  slides[currentSlide].classList.add('active');
  
  // Actualizar indicadores
  updateIndicators();
}

// Función para crear indicadores
function createIndicators(count) {
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'slide-indicators';
  
  for (let i = 0; i < count; i++) {
    const indicator = document.createElement('div');
    indicator.className = i === 0 ? 'indicator active' : 'indicator';
    indicator.onclick = () => goToSlide(i);
    indicatorsContainer.appendChild(indicator);
  }
  
  // Añadir al lightbox
  const lightboxContent = document.querySelector('.lightbox-content');
  
  // Eliminar indicadores anteriores si existen
  const oldIndicators = document.querySelector('.slide-indicators');
  if (oldIndicators) {
    oldIndicators.remove();
  }
  
  lightboxContent.appendChild(indicatorsContainer);
}

// Función para ir a un slide específico
function goToSlide(index) {
  if (!currentProject) return;
  
  const slides = document.querySelectorAll('.carousel-container img, .carousel-container video');
  
  // Ocultar slide actual
  slides[currentSlide].classList.remove('active');
  
  // Establecer nuevo índice
  currentSlide = index;
  
  // Mostrar nuevo slide
  slides[currentSlide].classList.add('active');
  
  // Actualizar indicadores
  updateIndicators();
}

// Función para actualizar indicadores
function updateIndicators() {
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Cerrar lightbox al hacer clic fuera del contenido
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
    
    // Navegación con flechas
    if (lightbox.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        changeSlide(-1);
      } else if (e.key === 'ArrowRight') {
        changeSlide(1);
      }
    }
  });
});

(function($) {
  $(document).ready(function() {
    $('.contact-form').each(function() {
      var formInstance = $(this);
      formInstance.submit(function(e) {
        e.preventDefault();
        var action = $(this).attr('action');

        // Oculta y desliza el contenedor de respuesta, si existe
        $("#response-message").slideUp(750, function() {
          $('#response-message').hide();

          // Desactiva el botón de submit y muestra un loader
          $('#submit')
            .after('<img src="assets/img/ajax-loader.gif" class="loader" />')
            .attr('disabled', 'disabled');

          // Envía los datos vía POST
          $.post(action, {
              name: $('#name').val(),
              email: $('#email').val(),
              subject: $('#subject').val(),
              message: $('#message').val()
            },
            function(data) {
              // Coloca la respuesta en el contenedor de mensaje
              document.getElementById('response-message').innerHTML = data;
              $('#response-message').slideDown('slow');
              $('.contact-form img.loader').fadeOut('slow', function() {
                $(this).remove();
              });
              $('#submit').removeAttr('disabled');
            }
          );
        });
        return false;
      });
    });
  });
})


document.addEventListener("DOMContentLoaded", function() {
      const faders = document.querySelectorAll(".fade-in");

      // Puedes ajustar threshold y rootMargin según necesites
      const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      };

      const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Una vez visible, se deja de observar
        });
      }, appearOptions);

      faders.forEach(fader => {
        appearOnScroll.observe(fader);
      });
    });

    (function($) {
      $(document).ready(function() {
        $('#contact-form').submit(function(e) {
          e.preventDefault(); // Evita la recarga
    
          var action = $(this).attr('action'); // assets/mail/contact.php
          $('#response-message').slideUp(750, function() {
            $(this).hide();
          });
    
          // Muestra un loader o desactiva el botón
          $('#submit')
            .after('<img src="assets/img/ajax-loader.gif" class="loader" />')
            .attr('disabled', 'disabled');
    
          // Envía los datos del formulario vía POST (AJAX)
          $.post(action, {
              name: $('#name').val(),
              email: $('#email').val(),
              subject: $('#subject').val(),
              message: $('#message').val()
            },
            function(data) {
              // Inyecta la respuesta (éxito/error) en #response-message
              $('#response-message').html(data).slideDown('slow');
    
              // Quita el loader
              $('.contact-form img.loader').fadeOut('slow', function() {
                $(this).remove();
              });
    
              // Reactiva el botón
              $('#submit').removeAttr('disabled');
            }
          );
        });
      });
    })(jQuery);
    