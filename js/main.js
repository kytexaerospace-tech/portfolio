/**
 * KYTEX - Lets Reach The Sky
 * Main Interactive JS Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initGalleryFilter();
  initLightbox();
  initProductTabs();
  initContactForm();
});

/* --- Navbar Interactivity --- */
function initNavbar() {
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');

  // Change header styling on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle mobile menu
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }
}

/* --- Hero Slider (Carousels) --- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  const indicatorsContainer = document.querySelector('.slider-indicators');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 6000; // 6 seconds

  // Dynamically generate indicators if element exists and is empty
  if (indicatorsContainer && indicatorsContainer.children.length === 0) {
    slides.forEach((_, idx) => {
      const ind = document.createElement('div');
      ind.classList.add('indicator');
      if (idx === 0) ind.classList.add('active');
      ind.addEventListener('click', () => {
        goToSlide(idx);
        resetTimer();
      });
      indicatorsContainer.appendChild(ind);
    });
  }

  const indicators = document.querySelectorAll('.indicator');

  function updateIndicators() {
    indicators.forEach((ind, idx) => {
      if (idx === currentSlide) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  }

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateIndicators();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });
  }

  function startTimer() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
  }

  // Start slideshow
  startTimer();
}

/* --- Gallery Filter --- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length === 0 || galleryItems.length === 0) return;

  // Initial load - show all items
  filterItems('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      filterItems(filterValue);
    });
  });

  function filterItems(filterValue) {
    galleryItems.forEach(item => {
      const categories = item.getAttribute('data-category').split(' ');
      if (filterValue === 'all' || categories.includes(filterValue)) {
        item.classList.add('show');
      } else {
        item.classList.remove('show');
      }
    });
  }
}

/* --- Lightbox Modal --- */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-item-title');
      const cat = item.querySelector('.gallery-item-category');

      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        
        if (lightboxCaption && title && cat) {
          lightboxCaption.innerHTML = `<strong>${title.textContent}</strong> - ${cat.textContent}`;
        }
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
}

/* --- Product Spec Tabs --- */
function initProductTabs() {
  const tabContainers = document.querySelectorAll('.spec-tabs');

  tabContainers.forEach(container => {
    const headers = container.querySelectorAll('.tab-header');
    const contents = container.querySelectorAll('.tab-content');

    headers.forEach(header => {
      header.addEventListener('click', () => {
        const tabTarget = header.getAttribute('data-tab');

        // Remove active class from all headers & contents in this block
        headers.forEach(h => h.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked header & target contents
        header.classList.add('active');
        const activeContent = container.querySelector(`.tab-content[data-tab-content="${tabTarget}"]`);
        if (activeContent) {
          activeContent.classList.add('active');
        }
      });
    });
  });
}

/* --- Contact Form Handling --- */
function initContactForm() {
  const form = document.getElementById('militaryContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect values
    const name = document.getElementById('name').value.trim();
    const rank = document.getElementById('rank').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.querySelector('input[name="service"]:checked')?.value || 'Not Specified';
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    // Display a high-tech success dashboard overlay message
    const formPanel = form.closest('.panel-glass');
    const originalContent = formPanel.innerHTML;

    formPanel.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;" class="corner-decors">
        <div style="font-size: 3rem; color: var(--accent-gold); margin-bottom: 1.5rem;">
          <i class="fas fa-shield-alt"></i>
        </div>
        <h3 style="color: var(--text-white); font-family: var(--font-title); margin-bottom: 1rem;">TRANSMISSION ENCRYPTED</h3>
        <p style="font-family: var(--font-mono); color: var(--accent-gold); font-size: 0.9rem; margin-bottom: 2rem;">
          SECURE LOG REF: ${Math.floor(Math.random() * 900000 + 100000)} // Noida HQ
        </p>
        <div style="text-align: left; max-width: 450px; margin: 0 auto 2rem; background: rgba(52, 71, 45, 0.2); padding: 1.5rem; border: var(--border-tactical); border-radius: 3px;">
          <p style="margin-bottom: 0.8rem; font-size: 0.95rem;"><strong>Officer/Contact:</strong> ${rank ? rank + ' ' : ''}${name}</p>
          <p style="margin-bottom: 0.8rem; font-size: 0.95rem;"><strong>Service Wing:</strong> ${service}</p>
          <p style="margin-bottom: 0.8rem; font-size: 0.95rem;"><strong>Secure Email:</strong> ${email}</p>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Your tactical drone inquiry has been received at our Noida Sector 62 defense facility. Clearance verification is underway. A commanding representative will establish contact via secure lines.</p>
        </div>
        <button id="resetFormBtn" class="btn-tactical corner-decors">Submit New Inquiry</button>
      </div>
    `;

    // Re-initialize reset button
    document.getElementById('resetFormBtn').addEventListener('click', () => {
      formPanel.innerHTML = originalContent;
      initContactForm(); // Re-bind form events
    });
  });
}
