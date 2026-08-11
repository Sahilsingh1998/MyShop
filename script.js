document.addEventListener('DOMContentLoaded', () => {

    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle'); // This is a <button> now
    const navLinks = document.querySelector('.nav-links'); // This is the <ul>
    const navItems = document.querySelectorAll('.nav-links a');
    
    /* =========================
       STICKY NAVBAR (Throttled for performance)
    ========================= */
    let isTicking = false;
    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    nav?.classList.add('scrolled');
                } else {
                    nav?.classList.remove('scrolled');
                }
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });

    /* =========================
       MOBILE MENU TOGGLE
    ========================= */
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.setAttribute('aria-label', isExpanded ? 'Close navigation' : 'Open navigation');
        });
    }

    /* =========================
       CLOSE MOBILE MENU ON LINK CLICK
    ========================= */
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Open navigation');
            }
        });
    });

    /* =========================
       ACTIVE MENU (MULTI PAGE FIX)
    ========================= */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navItems.forEach(link => {
        const linkPath = link.getAttribute('href').replace('./', '');
        link.classList.remove('active');
        if (linkPath === currentPage) {
            link.classList.add('active');
        // Handle root path for index.html
        } else if ((currentPage === '' || currentPage === 'index.html') && linkPath === 'index.html') {
            link.classList.add("active");
        }
    });

    /* =========================
       MOBILE DROPDOWN FIX
    ========================= */
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(drop => {
        const link = drop.querySelector('a');

        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    drop.classList.toggle('active');
                }
            });
        }
    });

    /* =========================
       UPDATE FOOTER YEAR
    ========================= */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* =========================
       CONTACT FORM SUBMISSION
    ========================= */
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const btn = this.querySelector("button[type='submit']");
            if (!btn) return;

            const originalBtnText = btn.innerHTML;
            btn.innerHTML = "Submitting...";
            btn.disabled = true;
            formStatus.textContent = "";
            formStatus.style.color = "";

            // GTM Event Tracking
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "form_submit",
                form_name: "contact_form"
            });

            const data = {
                name: document.getElementById("name")?.value || "",
                phone: document.getElementById("phone")?.value || "",
                email: document.getElementById("email")?.value || "",
                message: document.getElementById("message")?.value || ""
            };

            const endpoint = "https://script.google.com/macros/s/AKfycbwRL0gWQop5u_mt-L11irlqGZbnBt_-cJynMqEJ-OwQ1ssY6csJseDa1CTAGFehw3Vl/exec";

            fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                if (!res.ok) {
                    // Try to get error message from response, otherwise use a generic one
                    return res.json().catch(() => res.text()).then(errorPayload => {
                        const errorMessage = typeof errorPayload === 'object' ? errorPayload.message : errorPayload;
                        throw new Error(errorMessage || "Request failed");
                    });
                }
                return res.json();
            })
            .then(() => {
                formStatus.textContent = "✅ Message sent successfully!";
                formStatus.style.color = "green";
                contactForm.reset();
            })
            .catch((error) => {
                console.error("Form submission failed:", error);
                formStatus.textContent = "❌ Something went wrong. Please try again later.";
                formStatus.style.color = "red";
            })
            .finally(() => {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
                // Clear the message after a few seconds
                setTimeout(() => {
                    formStatus.textContent = "";
                }, 6000);
            });
        });
    }
});


/* =========================
   STICKY CALL + WHATSAPP BUTTONS
========================= */

const businessPhone = "917782864311";
const whatsappMessage =
    "Hello Chandan Cycle Store, I would like to know about your cycles and services.";

if (!document.querySelector(".contact-sticky-buttons")) {
    const stickyButtons = document.createElement("div");
    stickyButtons.className = "contact-sticky-buttons";

    stickyButtons.innerHTML = `
        <a
            class="sticky-call"
            href="tel:+${businessPhone}"
            aria-label="Call Chandan Cycle Store"
            title="Call Chandan Cycle Store">
            <i class="fas fa-phone" aria-hidden="true"></i>
            <span>Call Now</span>
        </a>

        <a
            class="sticky-whatsapp"
            href="https://wa.me/${businessPhone}?text=${encodeURIComponent(whatsappMessage)}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Chandan Cycle Store on WhatsApp"
            title="Chat with us on WhatsApp">
            <i class="fab fa-whatsapp" aria-hidden="true"></i>
            <span>WhatsApp</span>
        </a>
    `;

    document.body.appendChild(stickyButtons);
}