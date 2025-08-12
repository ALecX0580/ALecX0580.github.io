// Mission Carousel
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".mission-slide");
  const slidesContainer = document.querySelector(".mission-slides");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  let currentIndex = 0; // Start at Mission 1
  const totalSlides = slides.length;

  // Update active slide & center container
  function updateCarousel() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });

    const slideWidth = slides[0].offsetWidth + 20; // slide width + margin
    const containerWidth = slidesContainer.offsetWidth;
    const totalWidth = slideWidth * totalSlides;

    // Calculate offset to center active slide
    let offset = (slideWidth * currentIndex) - (containerWidth / 2) + (slideWidth / 2);

    // If container wider than content, no scroll
    if (containerWidth >= totalWidth) {
      offset = 0;
    } else {
      // Clamp offset within bounds
      if (offset < 0) offset = 0;
      if (offset > totalWidth - containerWidth) offset = totalWidth - containerWidth;
    }

    slidesContainer.style.transform = `translateX(-${offset}px)`;
  }

  // Left arrow click
  leftArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Right arrow click
  rightArrow.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Click slide to activate
  slides.forEach((slide, i) => {
    slide.addEventListener("click", () => {
      if (i !== currentIndex) {
        currentIndex = i;
        updateCarousel();
      }
    });
  });

  // Center first mission on load
  window.addEventListener("load", updateCarousel);
});
