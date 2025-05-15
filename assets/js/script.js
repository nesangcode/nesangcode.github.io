// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            
            // Change menu icon
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active state in navigation
                document.querySelectorAll('.navbar a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                if (navbar && navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.skill-card, .project-card');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            revealObserver.observe(el);
        });
        
        document.addEventListener('scroll', () => {
            document.querySelectorAll('.revealed').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, { passive: true });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    // Highlight active nav item based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.navbar a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Typing animation for hero section
    const typingElement = document.querySelector('#typing-text');
    
    if (typingElement) {
        const phrases = [
            'Full Stack Developer',
            'UI/UX Enthusiast',
            'Problem Solver',
            'Tech Innovator'
        ];
        
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeText() {
            const phrase = phrases[currentPhrase];
            
            if (isDeleting) {
                typingElement.textContent = phrase.substring(0, currentChar - 1);
                currentChar--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = phrase.substring(0, currentChar + 1);
                currentChar++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentChar === phrase.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at end
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        setTimeout(typeText, 1000);
    }
});