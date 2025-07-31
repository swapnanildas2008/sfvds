// Romantic App JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Love messages data
    const loveMessages = [
        "You make my world brighter every single day",
        "In your eyes, I found my home",
        "Every moment with you is a treasure",
        "You are my favorite hello and hardest goodbye",
        "Your smile is my daily dose of magic",
        "With you, I am exactly who I want to be",
        "You turn ordinary moments into extraordinary memories",
        "My heart beats in rhythm with yours"
    ];

    // Initialize floating hearts
    function createFloatingHearts() {
        const heartsContainer = document.getElementById('floatingHearts');
        const heartEmojis = ['💖', '💕', '💝', '💜', '🩷', '💞', 'ðŸ’œ', 'ðŸ¤'];
        
        function addHeart() {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 20000);
        }
        
        // Create initial hearts
        for (let i = 0; i < 15; i++) {
            addHeart();
        }
        
        // Continuously add hearts
        setInterval(addHeart, 2000);
    }

    // Love messages carousel
    function initLoveMessagesCarousel() {
        const messageCards = document.querySelectorAll('.message-card');
        const dots = document.querySelectorAll('.dot');
        let currentMessage = 0;
        
        function showMessage(index) {
            // Remove active class from all cards and dots
            messageCards.forEach(card => {
                card.classList.remove('active');
            });
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Activate current message and dot
            if (messageCards[index]) {
                messageCards[index].classList.add('active');
            }
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            
            currentMessage = index;
        }
        
        // Auto-rotate messages
        function nextMessage() {
            currentMessage = (currentMessage + 1) % loveMessages.length;
            showMessage(currentMessage);
        }
        
        // Set up dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showMessage(index);
                // Reset auto-rotation timer
                clearInterval(autoRotateInterval);
                autoRotateInterval = setInterval(nextMessage, 4000);
            });
        });
        
        // Auto-rotate every 4 seconds
        let autoRotateInterval = setInterval(nextMessage, 4000);
        
        // Initialize first message
        showMessage(0);
    }

    // Smooth scrolling for navigation
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Sparkle effect on click
    function createSparkleEffect(x, y) {
        const sparkleCount = 8;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.animationDelay = (i * 0.1) + 's';
            
            // Random direction for sparkles
            const angle = (360 / sparkleCount) * i;
            const distance = 30 + Math.random() * 20;
            const endX = x + Math.cos(angle * Math.PI / 180) * distance;
            const endY = y + Math.sin(angle * Math.PI / 180) * distance;
            
            sparkle.style.setProperty('--end-x', endX + 'px');
            sparkle.style.setProperty('--end-y', endY + 'px');
            
            document.body.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }
    }

    // Add click effects to interactive elements
    function initClickEffects() {
        const clickableElements = document.querySelectorAll('.reason-card, .note-card, .memory-card, .hero-hearts .heart, .letter-content');
        
        clickableElements.forEach(element => {
            element.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY;
                
                createSparkleEffect(x, y);
                
                // Add a pulse effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // Intersection Observer for scroll animations
    function initScrollAnimations() {
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
        
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.reason-card, .note-card, .memory-card, .letter-content');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Heart pulse effect on hover
    function initHeartEffects() {
        const hearts = document.querySelectorAll('.heart, .reason-heart, .note-heart, .letter-seal');
        
        hearts.forEach(heart => {
            heart.addEventListener('mouseenter', function() {
                this.style.animation = 'pulse 0.5s ease-in-out';
            });
            
            heart.addEventListener('mouseleave', function() {
                this.style.animation = '';
            });
            
            heart.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });
    }

    // Random gentle movements for poem and letter hearts
    function initPoemHeartAnimations() {
        const poemHearts = document.querySelectorAll('.poem-heart, .letter-heart');
        
        poemHearts.forEach((heart, index) => {
            setInterval(() => {
                const randomX = (Math.random() - 0.5) * 10;
                const randomY = (Math.random() - 0.5) * 10;
                heart.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 10 - 5}deg)`;
                
                setTimeout(() => {
                    heart.style.transform = '';
                }, 2000);
            }, 3000 + (index * 1000));
        });
    }

    // Add typing effect to hero title
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.opacity = '1';
            
            let i = 0;
            function typeText() {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeText, 100);
                }
            }
            
            // Start typing after a short delay
            setTimeout(typeText, 500);
        }
    }

    // Add parallax effect to hero section
    function initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero && scrolled < window.innerHeight) {
                const rate = scrolled * -0.3;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Add active navigation highlighting
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = sectionId;
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Add gentle shake animation to reason cards on hover
    function initReasonCardEffects() {
        const reasonCards = document.querySelectorAll('.reason-card');
        
        reasonCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.animation = 'gentle-shake 0.5s ease-in-out';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.animation = '';
            });
        });
        
        // Add the gentle shake keyframe to CSS dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gentle-shake {
                0%, 100% { transform: translateX(0) translateY(-10px); }
                25% { transform: translateX(-2px) translateY(-10px); }
                75% { transform: translateX(2px) translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }

    // Add special click effects for memory cards
    function initMemoryCardEffects() {
        const memoryCards = document.querySelectorAll('.memory-card');
        
        memoryCards.forEach(card => {
            card.addEventListener('click', function() {
                // Create floating hearts around the clicked card
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                for (let i = 0; i < 5; i++) {
                    const heart = document.createElement('div');
                    heart.textContent = ['ðŸ’•', 'ðŸ’–', 'ðŸ’', 'ðŸ’—', 'â¤ï¸'][i];
                    heart.style.position = 'fixed';
                    heart.style.left = centerX + 'px';
                    heart.style.top = centerY + 'px';
                    heart.style.fontSize = '20px';
                    heart.style.pointerEvents = 'none';
                    heart.style.zIndex = '9999';
                    heart.style.animation = `memory-heart-float 2s ease-out forwards`;
                    heart.style.animationDelay = (i * 0.2) + 's';
                    
                    // Random direction
                    const angle = (Math.random() * 360) * Math.PI / 180;
                    const distance = 100 + Math.random() * 50;
                    heart.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
                    heart.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
                    
                    document.body.appendChild(heart);
                    
                    setTimeout(() => {
                        if (heart.parentNode) heart.parentNode.removeChild(heart);
                    }, 2000);
                }
            });
        });
        
        // Add the memory heart float animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes memory-heart-float {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--end-x), var(--end-y)) scale(0.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add special effects for love letter section
    function initLoveLetterEffects() {
        const letterContent = document.querySelector('.letter-content');
        const letterSeal = document.querySelector('.letter-seal');
        
        if (letterContent) {
            letterContent.addEventListener('mouseenter', function() {
                // Add gentle glow effect
                this.style.boxShadow = '0 25px 50px rgba(255, 105, 180, 0.2)';
            });
            
            letterContent.addEventListener('mouseleave', function() {
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            });
        }
        
        if (letterSeal) {
            letterSeal.addEventListener('click', function() {
                // Create special heart explosion effect
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                for (let i = 0; i < 8; i++) {
                    const heart = document.createElement('div');
                    heart.textContent = '💖';
                    heart.style.position = 'fixed';
                    heart.style.left = centerX + 'px';
                    heart.style.top = centerY + 'px';
                    heart.style.fontSize = '24px';
                    heart.style.pointerEvents = 'none';
                    heart.style.zIndex = '9999';
                    heart.style.animation = `seal-heart-explosion 1.5s ease-out forwards`;
                    heart.style.animationDelay = (i * 0.1) + 's';
                    
                    // Circular explosion pattern
                    const angle = (360 / 8) * i * Math.PI / 180;
                    const distance = 120;
                    heart.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
                    heart.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
                    
                    document.body.appendChild(heart);
                    
                    setTimeout(() => {
                        if (heart.parentNode) heart.parentNode.removeChild(heart);
                    }, 1500);
                }
                
                // Pulse the seal
                this.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        }
        
        // Add the seal heart explosion animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes seal-heart-explosion {
                0% {
                    transform: translate(0, 0) scale(1) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5)) scale(1.2) rotate(180deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--end-x), var(--end-y)) scale(0.3) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add scroll to top functionality
    function initScrollToTop() {
        // Create scroll to top button
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '💖';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(135deg, #FFB6C1, #FF69B4);
            color: white;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        `;
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.transform = 'scale(1)';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.transform = 'scale(0.8)';
            }
        });
        
        // Scroll to top on click
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Hover effects
        scrollBtn.addEventListener('mouseenter', () => {
            scrollBtn.style.transform = 'scale(1.1)';
            scrollBtn.style.boxShadow = '0 6px 20px rgba(255, 105, 180, 0.4)';
        });
        
        scrollBtn.addEventListener('mouseleave', () => {
            scrollBtn.style.transform = window.pageYOffset > 300 ? 'scale(1)' : 'scale(0.8)';
            scrollBtn.style.boxShadow = '0 4px 15px rgba(255, 105, 180, 0.3)';
        });
    }

    // Initialize all features
    function init() {
        createFloatingHearts();
        initLoveMessagesCarousel();
        initSmoothScrolling();
        initClickEffects();
        initScrollAnimations();
        initHeartEffects();
        initPoemHeartAnimations();
        initTypingEffect();
        initParallaxEffect();
        initActiveNavigation();
        initReasonCardEffects();
        initMemoryCardEffects();
        initLoveLetterEffects();
        initScrollToTop();
        
        // Add some initial sparkles
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    createSparkleEffect(x, y);
                }, i * 200);
            }
        }, 1000);
    }

    // Start the magic
    init();

    // Add some special interactions
    document.addEventListener('click', function(e) {
        // Create hearts on any click
        if (Math.random() > 0.7) { // 30% chance
            const heart = document.createElement('div');
            heart.textContent = ['ðŸ’•', 'ðŸ’–', 'ðŸ’'][Math.floor(Math.random() * 3)];
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.fontSize = '16px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = 'float-away 2s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) heart.parentNode.removeChild(heart);
            }, 2000);
        }
    });

    // Add the float-away animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-away {
            0% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Special message for Valentine's Day or other occasions
    const currentDate = new Date();
    
    if (currentDate.getMonth() === 1 && currentDate.getDate() === 14) {
        setTimeout(() => {
            const specialMessage = document.createElement('div');
            specialMessage.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #FF69B4, #FFB6C1);
                    color: white;
                    padding: 30px;
                    border-radius: 20px;
                    text-align: center;
                    z-index: 10000;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    font-family: 'Dancing Script', cursive;
                    font-size: 1.5rem;
                ">
                    ðŸ’– Happy Valentine's Day, Beautiful! ðŸ’–<br>
                    <small style="font-size: 1rem; opacity: 0.9;">You make every day feel like Valentine's Day</small>
                    <br><br>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        background: white;
                        color: #FF69B4;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 15px;
                        cursor: pointer;
                        font-weight: 600;
                    ">ðŸ’• Close</button>
                </div>
            `;
            document.body.appendChild(specialMessage);
        }, 3000);
    }
});

// Add some CSS for the sparkle effect animation
const sparkleStyles = document.createElement('style');
sparkleStyles.textContent = `
    .sparkle {
        animation: sparkle-move 1s ease-out forwards;
    }
    
    @keyframes sparkle-move {
        0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translate(var(--end-x, 20px), var(--end-y, -20px)) scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x, 40px), var(--end-y, -40px)) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyles);