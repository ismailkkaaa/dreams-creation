document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') ? 
      '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (this.getAttribute('href') === '#') return;
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });

  // Form submission → send to WhatsApp
  const form = document.getElementById('orderForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = document.getElementById("name")?.value || "";
    let email = document.getElementById("email")?.value || "";
    let customerNumber = document.getElementById("customerNumber")?.value || "";
    let orderType = document.getElementById("orderType")?.value || "";
    let budget = document.getElementById("budget")?.value || "";
    let message = document.getElementById("message")?.value || "";

    // Your WhatsApp number (with country code, no + sign)
    let phoneNumber = "917025362767";  // 91 = India country code

    let text = 
      "🛍️ New Inquiry:%0a" +
      "👤 Name: " + encodeURIComponent(name) + "%0a" +
      "📧 Email: " + encodeURIComponent(email) + "%0a" +
      "📱 Customer WhatsApp: " + encodeURIComponent(customerNumber) + "%0a" +
      "📂 Product Category: " + encodeURIComponent(orderType) + "%0a" +
      "💰 Budget: " + encodeURIComponent(budget) + "%0a" +
      "📝 Message: " + encodeURIComponent(message);

    let url = "https://wa.me/" + phoneNumber + "?text=" + text;
    window.open(url, "_blank").focus();

    // Optional confetti effect
    if (typeof confetti === 'function') {
      const confettiSettings = { 
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      };
      confetti(confettiSettings);
    }

    // Reset form after submission
    form.reset();
  });

  // Simple testimonial slider
  const testimonials = [
    {
      content: "The craftsmanship is exceptional! I ordered a custom piece and it exceeded all my expectations. The attention to detail is remarkable.",
      rating: 5,
      author: "- Sarah J."
    },
    {
      content: "Beautiful eco-friendly products that make perfect gifts. The packaging was lovely and delivery was faster than expected!",
      rating: 4,
      author: "- Athmika."
    },
    {
      content: "I've purchased multiple items and each one is unique and high quality. The customer service is outstanding too!",
      rating: 5,
      author: "- Priya K."
    }
  ];

  const testimonialContainer = document.querySelector('.testimonial-slider');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    const testimonial = testimonials[index];
    const stars = Array(testimonial.rating).fill('<i class="fas fa-star checked"></i>').join('');
    
    testimonialContainer.innerHTML = `
      <div class="testimonial">
        <div class="testimonial-content">"${testimonial.content}"</div>
        <div class="testimonial-rating">${stars}</div>
        <div class="testimonial-author">${testimonial.author}</div>
      </div>
    `;
  }

  // Initialize first testimonial
  showTestimonial(currentTestimonial);

  // Rotate testimonials every 5 seconds
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 5000);

  // Load confetti library if not already loaded
  if (typeof confetti !== 'function') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js';
    document.head.appendChild(script);
  }
  
  // FAQ toggle
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const toggleIcon = otherItem.querySelector('.faq-toggle i');
          if (toggleIcon) {
            toggleIcon.className = 'fas fa-plus';
          }
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
      
      // Change icon - FIX: Added null check
      const icon = item.querySelector('.faq-toggle i');
      if (icon) {
        icon.className = item.classList.contains('active') ? 'fas fa-minus' : 'fas fa-plus';
      }
    });
  });

  // Enhanced mobile menu behavior
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      nav.classList.remove('active');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
  
  // Lazy load images for better performance
  if ('IntersectionObserver' in window) {
    const imgOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px 100px 0px"
    };
    
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          
          imgObserver.unobserve(img);
        }
      });
    }, imgOptions);
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imgObserver.observe(img));
  }
  
  // Adjust header height on resize
  function updateHeaderHeight() {
    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    
    if (window.innerWidth <= 768 && nav.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  window.addEventListener('resize', updateHeaderHeight);
  updateHeaderHeight();
});
