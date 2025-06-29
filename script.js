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

      // Form submission with confetti
      const form = document.getElementById('orderForm');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(() => {
          // Create confetti effect
          const confettiSettings = { 
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          };
          
          if (typeof confetti === 'function') {
            confetti(confettiSettings);
          }
          
          // Show success message
          alert('Thank you for your inquiry! We will contact you shortly.');
          form.reset();
        }, 500);
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
    });