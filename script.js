document.addEventListener('DOMContentLoaded', () => {

    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    /* =========================
       STICKY NAVBAR
    ========================= */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    /* =========================
       MOBILE MENU TOGGLE
    ========================= */
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });
    }

    /* =========================
       CLOSE MENU ON CLICK
    ========================= */
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
        });
    });

    /* =========================
       ACTIVE MENU (MULTI PAGE FIX)
    ========================= */

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    navItems.forEach(link => {

        let linkPath = link.getAttribute("href");

        // remove "./"
        if (linkPath) {
            linkPath = linkPath.replace("./", "");
        }

        // reset
        link.classList.remove("active");

        // match page
        if (linkPath === currentPage) {
            link.classList.add("active");
        }

        // home fallback
        if (currentPage === "" && linkPath === "index.html") {
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

});


/* =========================
   CONTACT FORM
========================= */
window.dataLayer = window.dataLayer || [];
const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const btn = this.querySelector("button");
        btn.innerHTML = "Submitting...";
        btn.disabled = true;

        // 🔥 GTM EVENT TRACKING (ADD THIS)
        window.dataLayer.push({
            event: "form_submit",
            form_name: "contact_form"
        });

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
        .then(() => {
            alert("✅ Message sent successfully!");
            form.reset();
        })
        .catch(() => {
            alert("❌ Something went wrong!");
        })
        .finally(() => {
            btn.innerHTML = "Submit Inquiry";
            btn.disabled = false;
        });
    });
}