/* ==========================================================================
   AETHELIS Executive Academy - Interactive Client Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initMetricCounters();
});

// Modal Controls
function openRegisterModal() {
    const modal = document.getElementById('register-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeRegisterModal() {
    const modal = document.getElementById('register-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on escape key or clicking outside content
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeRegisterModal();
    }
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('register-modal');
    if (e.target === modal) {
        closeRegisterModal();
    }
});

// Handle Enrollment Form Submission
function handleEnrollment(event) {
    event.preventDefault();

    const name = document.getElementById('full-name').value;
    const email = document.getElementById('work-email').value;
    const trackSelect = document.getElementById('program-track');
    const selectedTrack = trackSelect.options[trackSelect.selectedIndex].text;

    alert(`Application Received!\n\nThank you, ${name}.\nYour application for '${selectedTrack}' has been submitted for review. An admissions director will reach out to ${email} within 48 hours.`);

    closeRegisterModal();
    document.getElementById('enrollment-form').reset();
}

// Pillar Details Popups
function showPillarDetails(pillarKey) {
    const details = {
        courses: {
            title: "Our Professional Courses",
            tagline: "Structured Rigor. Industry-Aligned Excellence.",
            body: "Our 6-12 week structured courses combine university-level academic depth with real-world enterprise frameworks. Taught asynchronously with weekly live office hours with senior partners."
        },
        interactive: {
            title: "Our Interactive Activities",
            tagline: "Immersive Practice. Unshakable Mastery.",
            body: "Participate in real-time strategic war rooms, crisis management simulations, and technical lab environments designed to build high-stress decision instinct."
        },
        seminars: {
            title: "Our Executive Seminars",
            tagline: "Direct Access to Visionary Industry Leadership.",
            body: "Exclusive closed-door symposiums and executive roundtables. Engage in direct Q&A and confidential strategic discussions with global C-suite leaders and academic founders."
        }
    };

    const pillar = details[pillarKey];
    if (pillar) {
        alert(`${pillar.title}\n\nTagline: ${pillar.tagline}\n\n${pillar.body}`);
    }
}

// Animated Metric Counters
function initMetricCounters() {
    const metrics = document.querySelectorAll('.metric-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                metrics.forEach(metric => {
                    const target = parseInt(metric.getAttribute('data-target'));
                    if (!isNaN(target)) {
                        animateCount(metric, target);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.getElementById('hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

function animateCount(element, target) {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            clearInterval(timer);
            if (target === 98) {
                element.textContent = "98.4%";
            } else if (target === 15000) {
                element.textContent = "15,000+";
            } else if (target === 450) {
                element.textContent = "450+";
            } else {
                element.textContent = Math.floor(target).toLocaleString() + "+";
            }
        } else {
            if (target === 98) {
                element.textContent = start.toFixed(1) + "%";
            } else {
                element.textContent = Math.floor(start).toLocaleString() + "+";
            }
        }
    }, 16);
}

// Fade-in Scroll Animations
function initScrollAnimations() {
    const cards = document.querySelectorAll('.pillar-card, .comparison-card, .cta-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(card);
    });
}
