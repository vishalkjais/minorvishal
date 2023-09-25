document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".carousel-slide");
    let currentSlide = 0;

    function showSlide(slideIndex) {
        slides[currentSlide].classList.remove("active");
        currentSlide = slideIndex;
        slides[currentSlide].classList.add("active");
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function previousSlide() {
        showSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    setInterval(nextSlide, 20000);

    const nextButton = document.getElementById("nextButton");
    nextButton.addEventListener("click", nextSlide);

    // Add Previous Button
    const previousButton = document.createElement("button");
    previousButton.id = "previousButton"; // Set button id
    previousButton.innerText = "Previous";
    previousButton.addEventListener("click", previousSlide);
    document.querySelector(".carousel-container").appendChild(previousButton);

    slides[currentSlide].classList.add("active");




    
});
