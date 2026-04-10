/* =========================
   MAIN SCRIPT
========================= */

document.addEventListener('DOMContentLoaded', () => {

    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    /* =========================
       STICKY NAVBAR + SCROLL SPY
    ========================= */
    window.addEventListener('scroll', () => {

        // Sticky Navbar
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Scroll Spy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });

    });

    /* =========================
       MOBILE MENU TOGGLE
    ========================= */
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Optional: toggle icon (☰ → ✖)
            menuToggle.classList.toggle('open');
        });
    }

    /* =========================
       CLOSE MENU ON LINK CLICK
    ========================= */
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });

    /* =========================
       MOBILE DROPDOWN FIX (CLICK)
    ========================= */
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(drop => {
        const link = drop.querySelector('a');

        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                drop.classList.toggle('active');
            }
        });
    });

});


/* =========================
   CONTACT FORM SUBMIT
========================= */

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const btn = this.querySelector("button");
        btn.innerHTML = "Submitting...";
        btn.disabled = true;

        const data = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        fetch("https://script.google.com/macros/s/AKfycbwRL0gWQop5u_mt-L11irlqGZbnBt_-cJynMqEJ-OwQ1ssY6csJseDa1CTAGFehw3Vl/exec", {
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            alert("✅ Message sent successfully!");
            form.reset();
            btn.innerHTML = "Submit Inquiry";
            btn.disabled = false;
        })
        .catch(error => {
            alert("❌ Something went wrong!");
            btn.innerHTML = "Submit Inquiry";
            btn.disabled = false;
            console.error(error);
        });
    });
}