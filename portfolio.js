document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!isExpanded));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Active nav highlighting
    const sections = document.querySelectorAll('section[id]');
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) link?.classList.add('active');
            else link?.classList.remove('active');
        });
    }
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();

    // Image carousels
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const indicators = carousel.querySelectorAll('.indicator');
        let index = 0;

        if (images.length > 1) {
            function show(i) {
                images.forEach((img, ii) => img.classList.toggle('active', ii === i));
                indicators.forEach((dot, ii) => dot.classList.toggle('active', ii === i));
                index = i;
            }
            function next() { show((index + 1) % images.length); }
            function prev() { show((index - 1 + images.length) % images.length); }
            nextBtn?.addEventListener('click', next);
            prevBtn?.addEventListener('click', prev);
            indicators.forEach((dot, ii) => dot.addEventListener('click', () => show(ii)));
            carousel.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); });
            let timer; const start = () => timer = setInterval(next, 5000); const stop = () => clearInterval(timer);
            start(); carousel.addEventListener('mouseenter', stop); carousel.addEventListener('mouseleave', start);
        } else { prevBtn && (prevBtn.style.display = 'none'); nextBtn && (nextBtn.style.display = 'none'); }
    });

    // Contact form validation
    const form = document.getElementById('contactForm');
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const subjectEl = document.getElementById('subject');
    const messageEl = document.getElementById('message');
    const success = document.getElementById('successMessage');

    function showError(input, el, msg) { input.classList.add('error'); el.textContent = msg; el.classList.add('show'); }
    function clearError(input, el) { input.classList.remove('error'); el.textContent = ''; el.classList.remove('show'); }

    function validateName() { const v = nameEl.value.trim(); const e = document.getElementById('nameError'); if (!v) return showError(nameEl, e, 'Name is required'), false; if (v.length < 2) return showError(nameEl, e, 'At least 2 characters'), false; return clearError(nameEl, e), true; }
    function validateEmail() { const v = emailEl.value.trim(); const e = document.getElementById('emailError'); const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; if (!v) return showError(emailEl, e, 'Email is required'), false; if (!re.test(v)) return showError(emailEl, e, 'Enter a valid email'), false; return clearError(emailEl, e), true; }
    function validateSubject() { const v = subjectEl.value.trim(); const e = document.getElementById('subjectError'); if (!v) return showError(subjectEl, e, 'Subject is required'), false; if (v.length < 3) return showError(subjectEl, e, 'At least 3 characters'), false; return clearError(subjectEl, e), true; }
    function validateMessage() { const v = messageEl.value.trim(); const e = document.getElementById('messageError'); if (!v) return showError(messageEl, e, 'Message is required'), false; if (v.length < 10) return showError(messageEl, e, 'At least 10 characters'), false; return clearError(messageEl, e), true; }

    nameEl.addEventListener('blur', validateName); emailEl.addEventListener('blur', validateEmail); subjectEl.addEventListener('blur', validateSubject); messageEl.addEventListener('blur', validateMessage);
    ;[nameEl,emailEl,subjectEl,messageEl].forEach(el => el.addEventListener('input', () => el.classList.contains('error') && ({nameEl:validateName,emailEl:validateEmail,subjectEl:validateSubject,messageEl:validateMessage}[el.id+'El']?.())));

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const ok = validateName() & validateEmail() & validateSubject() & validateMessage();
        if (ok) {
            success.classList.add('show');
            form.reset();
            setTimeout(() => success.classList.remove('show'), 5000);
            // Hook for backend service like Formspree can be added here
        } else {
            if (document.querySelector('.error')) document.querySelector('.error').focus();
        }
    });

    // Intersection Observer animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; } });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.project-card, .skill-category').forEach(el => {
        el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; el.style.transition = 'opacity .6s ease, transform .6s ease'; observer.observe(el);
    });

    // Keyboard navigation mode helper
    document.addEventListener('keydown', e => { if (e.key === 'Tab') document.body.classList.add('keyboard-navigation'); });
    document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-navigation'));
});
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== HAMBURGER MENU ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    // Toggle hamburger menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // ========== SMOOTH SCROLLING ==========
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== ACTIVE NAVIGATION HIGHLIGHTING ==========
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink?.classList.add('active');
            } else {
                navLink?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ========== IMAGE CAROUSEL ==========
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        const indicators = carousel.querySelectorAll('.indicator');
        let currentIndex = 0;

        // Only setup carousel if there are multiple images
        if (images.length > 1) {
            
            function showImage(index) {
                images.forEach((img, i) => {
                    img.classList.remove('active');
                    if (i === index) {
                        img.classList.add('active');
                    }
                });

                indicators.forEach((indicator, i) => {
                    indicator.classList.remove('active');
                    if (i === index) {
                        indicator.classList.add('active');
                    }
                });

                currentIndex = index;
            }

            function nextImage() {
                let newIndex = (currentIndex + 1) % images.length;
                showImage(newIndex);
            }

            function prevImage() {
                let newIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(newIndex);
            }

            // Event listeners for carousel buttons
            if (nextBtn) {
                nextBtn.addEventListener('click', nextImage);
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', prevImage);
            }

            // Event listeners for indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showImage(index);
                });
            });

            // Keyboard navigation for carousel
            carousel.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevImage();
                } else if (e.key === 'ArrowRight') {
                    nextImage();
                }
            });

            // Optional: Auto-play carousel
            let autoPlayInterval;
            
            function startAutoPlay() {
                autoPlayInterval = setInterval(nextImage, 5000);
            }

            function stopAutoPlay() {
                clearInterval(autoPlayInterval);
            }

            // Start auto-play
            startAutoPlay();

            // Pause on hover
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);

        } else {
            // Hide carousel controls if only one image
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        }
    });

    // ========== FORM VALIDATION ==========
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    // Validation functions
    function validateName() {
        const nameError = document.getElementById('nameError');
        const name = nameInput.value.trim();

        if (name === '') {
            showError(nameInput, nameError, 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            return false;
        } else {
            clearError(nameInput, nameError);
            return true;
        }
    }

    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            showError(emailInput, emailError, 'Email is required');
            return false;
        } else if (!emailPattern.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            clearError(emailInput, emailError);
            return true;
        }
    }

    function validateSubject() {
        const subjectError = document.getElementById('subjectError');
        const subject = subjectInput.value.trim();

        if (subject === '') {
            showError(subjectInput, subjectError, 'Subject is required');
            return false;
        } else if (subject.length < 3) {
            showError(subjectInput, subjectError, 'Subject must be at least 3 characters');
            return false;
        } else {
            clearError(subjectInput, subjectError);
            return true;
        }
    }

    function validateMessage() {
        const messageError = document.getElementById('messageError');
        const message = messageInput.value.trim();

        if (message === '') {
            showError(messageInput, messageError, 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters');
            return false;
        } else {
            clearError(messageInput, messageError);
            return true;
        }
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);

    // Input event for live feedback
    nameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateName();
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateEmail();
        }
    });

    subjectInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateSubject();
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateMessage();
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        // If all fields are valid
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Show success message
            successMessage.classList.add('show');

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);

            // In a real application, you would send the form data to a server here
            // Example with Formspree:
            // fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: new FormData(contactForm),
            //     headers: {
            //         'Accept': 'application/json'
            //     }
            // }).then(response => {
            //     if (response.ok) {
            //         successMessage.classList.add('show');
            //         contactForm.reset();
            //     }
            // });
        } else {
            // Focus on first error field
            if (!isNameValid) {
                nameInput.focus();
            } else if (!isEmailValid) {
                emailInput.focus();
            } else if (!isSubjectValid) {
                subjectInput.focus();
            } else if (!isMessageValid) {
                messageInput.focus();
            }
        }
    });

    // ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ========== KEYBOARD ACCESSIBILITY ==========
    // Add focus visible for better keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Initial highlight on page load
    highlightNavigation();
});

