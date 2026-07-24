document.addEventListener('DOMContentLoaded', () => {

    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
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
            menuToggle.classList.toggle('open');
        });
    }

    /* =========================
       CLOSE MENU ON CLICK
    ========================= */
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && menuToggle) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            }
        });
    });

    /* =========================
       ACTIVE MENU (MULTI PAGE FIX)
    ========================= */
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    navItems.forEach(link => {
        let linkPath = link.getAttribute("href");

        if (linkPath) {
            linkPath = linkPath.replace("./", "");
        }

        link.classList.remove("active");

        if (linkPath === currentPage) {
            link.classList.add("active");
        }

        if ((currentPage === "" || currentPage === "/") && linkPath === "index.html") {
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
   CONTACT FORM SUBMISSION
========================= */
window.dataLayer = window.dataLayer || [];
const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const btn = this.querySelector("button");
        if (!btn) return;

        const originalBtnText = btn.innerHTML;
        btn.innerHTML = "Submitting...";
        btn.disabled = true;

        // GTM Event Tracking
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
            btn.innerHTML = originalBtnText;
            btn.disabled = false;
        });
    });
}