document.addEventListener('DOMContentLoaded', () => {
  // Enhanced mobile detection and optimization
  const isMobile = window.innerWidth <= 768;
  const isTouch = 'ontouchstart' in window;
  
  // Add mobile class to body for enhanced styling
  if (isMobile) {
    document.body.classList.add('mobile-device');
  }
  
  // Enhanced touch feedback for mobile
  if (isTouch) {
    document.body.classList.add('touch-device');
    
    // Add touch feedback to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .combo-btn, .feature, .gallery-item, .pricing-card');
    
    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
      });
      
      element.addEventListener('touchend', function() {
        this.style.transform = '';
      });
    });
  }
  
  // Intersection Observer for mobile animations
  if ('IntersectionObserver' in window) {
    const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Add staggered animation for child elements
          const children = entry.target.querySelectorAll('.feature, .combo-card, .gallery-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.animationDelay = `${index * 0.1}s`;
              child.classList.add('slide-up');
            }, index * 100);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      animateOnScroll.observe(section);
    });
  }
  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Enhanced mobile menu toggle with animations
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    nav.classList.toggle('active');
    
    // Animate hamburger icon
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('active')) {
      icon.className = 'fas fa-times';
      menuToggle.style.transform = 'rotate(180deg)';
      
      // Animate menu items
      const menuItems = nav.querySelectorAll('a');
      menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          item.style.transition = 'all 0.3s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, index * 50);
      });
      
      // Prevent body scroll on mobile
      if (isMobile) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      icon.className = 'fas fa-bars';
      menuToggle.style.transform = 'rotate(0deg)';
      document.body.style.overflow = '';
    }
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

  // Enhanced form submission with better mobile feedback
  const form = document.getElementById('orderForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add loading state to button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Get form data
    const name = form.querySelector('input[placeholder="Your Name"]').value;
    const email = form.querySelector('input[placeholder="Your Email"]').value;
    const whatsapp = form.querySelector('input[placeholder="Your WhatsApp Number"]').value;
    const orderType = document.getElementById('orderType').value;
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;
    const budget = document.getElementById('budget').value;
    const message = form.querySelector('textarea[placeholder="Your Message or Order Details"]').value;
    
    // Create WhatsApp message in the requested format
    const whatsappMessage = `New Order:
Name: ${name}
Product: ${orderType}
Quantity: ${quantity}
Address: ${address}
Phone: ${whatsapp}${email ? `
Email: ${email}` : ''}${budget ? `
Budget: ₹${budget}` : ''}${message ? `
Additional Details: ${message}` : ''}`;
    
    // Enhanced confetti effect for mobile
    const confettiSettings = { 
      particleCount: isMobile ? 60 : 100,
      spread: isMobile ? 50 : 70,
      origin: { y: isMobile ? 0.7 : 0.6 },
      colors: ['#FFD700', '#FF8C00', '#228B22', '#69ad7c'],
      shapes: ['square', 'circle'],
      gravity: isMobile ? 0.8 : 1
    };
    
    if (typeof confetti === 'function') {
      // Multiple confetti bursts for better effect
      confetti(confettiSettings);
      setTimeout(() => confetti({...confettiSettings, particleCount: 30}), 200);
      setTimeout(() => confetti({...confettiSettings, particleCount: 20}), 400);
    }
    
    // Enhanced success feedback with vibration on mobile
    setTimeout(() => {
      // Haptic feedback for mobile
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
      
      // Show success message with better styling
      const successMessage = isMobile 
        ? '🎉 Order submitted! Opening WhatsApp...'
        : 'Thank you for your order! Redirecting to WhatsApp...';
      
      alert(successMessage);
      
      // Redirect to WhatsApp with the message
      const whatsappURL = `https://wa.me/917025362767?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappURL, '_blank');
      
      // Reset form and button
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1000);
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
  
  // Onam Combo Pack Add to Cart functionality
  const comboButtons = document.querySelectorAll('.combo-btn');
  
  comboButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.combo-card');
      const comboName = card.querySelector('h3').textContent;
      const comboPrice = card.querySelector('.combo-price').textContent;
      
      // Create confetti effect
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.8 }
        });
      }
      
      // Show success message
      alert(`\ud83c\udf89 ${comboName} added to cart for ${comboPrice}!\n\nRedirecting to WhatsApp to complete your order...`);
      
      // Create WhatsApp message for the combo pack
      const whatsappMessage = `*Onam Combo Pack Order*\n\n*Product:* ${comboName}\n*Price:* ${comboPrice}\n\nI would like to order this Onam combo pack. Please confirm availability and delivery details.`;
      
      // Redirect to WhatsApp
      const whatsappURL = `https://wa.me/917025362767?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappURL, '_blank');
    });
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
  
  // Enhanced mobile-specific features
  if (isMobile) {
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      const heroImage = document.querySelector('.hero-image img');
      
      if (hero && heroImage) {
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
        heroImage.style.transform = `translateY(${scrolled * -0.1}px) rotate(${scrolled * 0.02}deg)`;
      }
    });
    
    // Add pull-to-refresh hint
    let startY = 0;
    let pullDistance = 0;
    
    document.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
      if (window.scrollY === 0) {
        pullDistance = e.touches[0].clientY - startY;
        if (pullDistance > 0 && pullDistance < 100) {
          document.body.style.transform = `translateY(${pullDistance * 0.5}px)`;
          document.body.style.opacity = `${1 - (pullDistance * 0.01)}`;
        }
      }
    });
    
    document.addEventListener('touchend', () => {
      document.body.style.transform = '';
      document.body.style.opacity = '';
      pullDistance = 0;
    });
    
    // Add swipe gestures for gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      let startX = 0;
      let currentX = 0;
      
      item.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      });
      
      item.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX;
        const diffX = currentX - startX;
        
        if (Math.abs(diffX) > 10) {
          item.style.transform = `translateX(${diffX * 0.3}px) scale(${1 + Math.abs(diffX) * 0.001})`;
        }
      });
      
      item.addEventListener('touchend', () => {
        item.style.transform = '';
      });
    });
  }
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