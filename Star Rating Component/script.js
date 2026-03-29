// Get elements
const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("ratingText");
const submitBtn = document.getElementById("submitBtn");
const ratingCard = document.getElementById("ratingCard");
const successCard = document.getElementById("successCard");

// Rating data
let selectedRating = 0;
const ratingLabels = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

// Add event listeners to stars
stars.forEach((star, index) => {
  // Click event
  star.addEventListener("click", () => {
    const rating = parseInt(star.dataset.rating);
    selectRating(rating);
  });

  // Hover event
  star.addEventListener("mouseenter", () => {
    if (selectedRating === 0) {
      const rating = parseInt(star.dataset.rating);
      highlightStars(rating, true);
    }
  });

  // Mouse leave event
  star.addEventListener("mouseleave", () => {
    if (selectedRating === 0) {
      clearHover();
    }
  });
});

// Select rating function
function selectRating(rating) {
  selectedRating = rating;

  // Update stars
  stars.forEach((star, index) => {
    star.classList.remove("hovered");
    if (index < rating) {
      star.classList.add("filled");
    } else {
      star.classList.remove("filled");
    }
  });

  // Update text
  ratingText.textContent = `You rated: ${ratingLabels[rating]}`;
  ratingText.classList.add("selected");

  // Enable submit button
  submitBtn.disabled = false;
}

// Highlight stars on hover
function highlightStars(rating, isHover) {
  stars.forEach((star, index) => {
    if (index < rating) {
      if (isHover) {
        star.classList.add("hovered");
      }
    } else {
      star.classList.remove("hovered");
    }
  });
}

// Clear hover effect
function clearHover() {
  stars.forEach((star) => {
    star.classList.remove("hovered");
  });
}

// Submit button click
submitBtn.addEventListener("click", () => {
  if (selectedRating > 0) {
    // Add loading state
    submitBtn.classList.add("loading");
    submitBtn.textContent = "Submitting...";

    // Simulate API call
    setTimeout(() => {
      // Hide rating card
      ratingCard.classList.add("hidden");

      // Show success card
      successCard.classList.remove("hidden");
    }, 1000);

    setTimeout(() => {
      resetRating();
    }, 4000);
  }
});

// Reset functionality
function resetRating() {
  ratingCard.classList.remove("hidden");
  successCard.classList.add("hidden");
  selectedRating = 0;
  stars.forEach((star) => {
    star.classList.remove("filled", "hovered");
  });
  ratingText.textContent = "Click to rate";
  ratingText.classList.remove("selected");
  submitBtn.disabled = true;
  submitBtn.classList.remove("loading");
  submitBtn.textContent = "Submit Rating";
}
