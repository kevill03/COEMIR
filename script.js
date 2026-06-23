document.addEventListener("DOMContentLoaded", function() {
    const heroSection = document.querySelector('.hero');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');

    // Array de imágenes para el carrusel
    const images = [
        "url('https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?auto=format&fit=crop&q=80&w=1920')",
        "url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1920')",
        "url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1920')"
    ];

    let currentIndex = 0;

    function changeImage(index) {
        heroSection.style.backgroundImage = images[index];
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        changeImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        changeImage(currentIndex);
    }

    // Rotar automáticamente cada 5 segundos (5000ms)
    let carouselInterval = setInterval(nextImage, 5000);

    // Controles manuales
    nextBtn.addEventListener('click', function() {
        nextImage();
        resetInterval();
    });

    prevBtn.addEventListener('click', function() {
        prevImage();
        resetInterval();
    });

    // Reiniciar el temporizador al interactuar manualmente
    function resetInterval() {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextImage, 5000);
    }
});
