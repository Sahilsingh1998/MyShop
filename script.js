// script.js
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    // Sticky Navbar & Scroll Spy
    window.addEventListener('scroll', () => {
        // Sticky logic
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Scroll Spy logic (highlight active nav link)
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});


document.getElementById("contactForm").addEventListener("submit", function(e) {
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
        document.getElementById("contactForm").reset();
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