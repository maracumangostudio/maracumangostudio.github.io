const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

let lastScroll = 0;
const navbar = document.querySelector(".navbar");
const scrollThreshold = 50;

window.addEventListener("scroll", () => {

    let currentScroll = window.pageYOffset;

    if (Math.abs(currentScroll - lastScroll) < scrollThreshold)
        return;

    if (currentScroll > lastScroll) {
        navbar.classList.add("hide");
    } else {
        navbar.classList.remove("hide");
    }

    lastScroll = currentScroll;
});





document.addEventListener("DOMContentLoaded", function () {

    const container = document.querySelector(".hero-image");
    const img = container.querySelector("img");

    if (!container || !img) {
        console.log("No se encontró .hero-image");
        return;
    }

    const maxRotation = 5;

    container.addEventListener("mousemove", function (e) {

        const rect = container.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const percentX = (x / rect.width) - 0.5;
        const percentY = (y / rect.height) - 0.5;

        const rotateY = -percentX * maxRotation;
        const rotateX = percentY * maxRotation;

        img.style.transform =
            "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(1.05)";
    });

    container.addEventListener("mouseleave", function () {
        img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });

});