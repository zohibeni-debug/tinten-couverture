// ===========================
// TINTEN COUVERTURE - JS
// ===========================

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animate hamburger
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

// FAQ accordion
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('open');
  });

  // Open clicked if it was closed
  if (!isOpen) {
    item.classList.add('open');
  }
}

// Form submission
function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = document.getElementById('name-hero').value;
  const phone = document.getElementById('phone-hero').value;
  const subject = document.getElementById('subject-hero').value;

  if (!name || !phone) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return false;
  }

  // Show success message
  form.innerHTML = `
    <div class="form-success">
      <p>✓ Merci ${name} ! Votre demande a bien été envoyée.</p>
      <p style="margin-top:8px;font-weight:400;">Nous vous recontactons au ${phone} sous 24h.</p>
    </div>
  `;

  return false;
}

// Header scroll effect
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.service-card, .avantage-item, .faq-item, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Filtre galerie réalisations
function filterGallery(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// Formulaire contact
function handleContactForm(e) {
  e.preventDefault();
  alert('Merci pour votre message ! Nous vous recontactons sous 24h.');
  e.target.reset();
  return false;
}
