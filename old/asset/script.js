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








const track = document.querySelector(".services-track");
let cards = document.querySelectorAll(".service-box");
const visible = 6;
let index = visible;


// Clonar últimos 6 al inicio
for (let i = cards.length - visible; i < cards.length; i++) {
    track.prepend(cards[i].cloneNode(true));
}

// Clonar primeros 6 al final
for (let i = 0; i < visible; i++) {
    track.appendChild(cards[i].cloneNode(true));
}

// Recalcular
cards = document.querySelectorAll(".service-box");
function move() {
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index * (210 / visible)}%)`;
}


track.style.transition = "none";
track.style.transform = `translateX(-${index * (210 / visible)}%)`;
// Flecha →
document.getElementById("next").onclick = () => {
    index++;
    move();
};

// Flecha ←
document.getElementById("prev").onclick = () => {
    if (index === 0) {
        index = allCards.length - visible;
        track.style.transition = "none";
        track.style.transform = `translateX(-${index * (100 / visible)}%)`;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                index--;
                move();
            });
        });
    } else {
        index--;
        move();
    }
};
// Cuando llegue al final falso → volver al inicio real
track.addEventListener("transitionend", () => {
    if (index >= cards.length - visible) {
        track.style.transition = "none";
        index = 0;
        track.style.transform = "translateX(0)";
    }
});

// Autoplay: 1 tarjeta cada segundo → siempre a la derecha
setInterval(() => {
    index++;
    move();
}, 3000);