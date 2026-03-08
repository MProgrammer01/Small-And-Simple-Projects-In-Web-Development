// API Base URL
const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// DOM Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error");

// Event Listeners
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});
searchInput.addEventListener("input", function () {
  if (this.value.trim() === "") {
    initialRecipesOnPageLoadOrSearchInputEmpty();
  }
});

// Search Handler
async function handleSearch() {
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        alert("Please enter a recipe name to search!");
        return;
    }

    // Show loading, hide results and error
    showLoading();
    hideError();
    clearResults();

    try {
        const response = await fetch(`${API_BASE_URL}/search.php?s=${searchTerm}`);
        const data = await response.json();

        hideLoading();

        if (data.meals && data.meals.length > 0) {
            displayResults(data.meals);
        } else {
            showError();
        }
    } catch (error) {
        hideLoading();
        showError();
        console.error("Error fetching recipes:", error);
    }
}

// Display search results
function displayResults(meals) {
    resultsContainer.innerHTML = "";

    meals.forEach((meal) => {
        const recipeCard = createRecipeCard(meal);
        resultsContainer.appendChild(recipeCard);
    });
}

// Create recipe card
function createRecipeCard(meal) {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.onclick = () => goToDetails(meal.idMeal);

    card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-image">
        <div class="recipe-info">
            <h3 class="recipe-title">${meal.strMeal}</h3>
            <span class="recipe-category">${meal.strCategory}</span>
        </div>
    `;

    return card;
}

// Navigate to details page
function goToDetails(mealId) {
    window.location.href = `details.html?id=${mealId}`;
}

// UI Helper Functions
function showLoading() {
    loadingElement.classList.remove("hidden");
}

function hideLoading() {
    loadingElement.classList.add("hidden");
}

function showError() {
    errorElement.classList.remove("hidden");
}

function hideError() {
    errorElement.classList.add("hidden");
}

function clearResults() {
    resultsContainer.innerHTML = "";
}

async function initialRecipesOnPageLoadOrSearchInputEmpty() {
    hideError();
    showLoading();
    try {
        const response = await fetch(`${API_BASE_URL}/search.php?s=chicken`);
        const data = await response.json();
        hideLoading();

        if (data.meals) {
            displayResults(data.meals);
        }
    } catch (error) {
        hideLoading();
        console.error("Error loading initial recipes:", error);
    }
}

// Load some initial recipes on page load
window.addEventListener("DOMContentLoaded", initialRecipesOnPageLoadOrSearchInputEmpty);
