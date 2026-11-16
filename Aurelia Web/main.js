document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Menú Hamburguesa para Teléfonos
  const burgerBtn = document.getElementById('burger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 2. Intersection Observer para Animación "Fade-In" al hacer Scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  fadeElements.forEach(element => {
    appearOnScroll.observe(element);
  });

  // 3. Confirmación simulada del Formulario de Contacto
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por tu mensaje! El equipo de Novella se pondrá en contacto contigo muy pronto.');
      contactForm.reset();
    });
  }

});