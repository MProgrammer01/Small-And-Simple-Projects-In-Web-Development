// API Base URL
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// DOM Elements
const loadingElement = document.getElementById('loading');
const recipeDetailsElement = document.getElementById('recipeDetails');
const mealImage = document.getElementById('mealImage');
const mealTitle = document.getElementById('mealTitle');
const mealCategory = document.getElementById('mealCategory');
const mealArea = document.getElementById('mealArea');
const ingredientsList = document.getElementById('ingredientsList');
const instructions = document.getElementById('instructions');
const tagsSection = document.getElementById('tagsSection');
const tags = document.getElementById('tags');
const videoSection = document.getElementById('videoSection');
const videoLink = document.getElementById('videoLink');

// Get meal ID from URL parameters
function getMealIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Fetch meal details
async function fetchMealDetails(mealId) {
    try {
        const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
            displayMealDetails(data.meals[0]);
        } else {
            showError();
        }
    } catch (error) {
        console.error('Error fetching meal details:', error);
        showError();
    }
}

// Display meal details
function displayMealDetails(meal) {
    // Hide loading and show details
    loadingElement.classList.add('hidden');
    recipeDetailsElement.classList.remove('hidden');

    // Set basic information
    mealImage.src = meal.strMealThumb;
    mealImage.alt = meal.strMeal;
    mealTitle.textContent = meal.strMeal;
    mealCategory.textContent = meal.strCategory;
    mealArea.textContent = meal.strArea;

    // Set instructions
    instructions.textContent = meal.strInstructions;

    // Display ingredients
    displayIngredients(meal);

    // Display tags
    displayTags(meal.strTags);

    // Display video link
    displayVideoLink(meal.strYoutube);
}

// Display ingredients
function displayIngredients(meal) {
    ingredientsList.innerHTML = '';

    // Loop through 20 possible ingredients
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== '') {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${ingredient}</strong> - ${measure}`;
            ingredientsList.appendChild(li);
        }
    }
}

// Display tags
function displayTags(tagsString) {
    if (tagsString && tagsString.trim() !== '') {
        tagsSection.classList.remove('hidden');
        tags.innerHTML = '';

        const tagsArray = tagsString.split(',');
        tagsArray.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag.trim();
            tags.appendChild(tagSpan);
        });
    } else {
        tagsSection.style.display = 'none';
    }
}

// Display video link
function displayVideoLink(youtubeUrl) {
    if (youtubeUrl && youtubeUrl.trim() !== '') {
        videoSection.classList.remove('hidden');
        videoLink.href = youtubeUrl;
    } else {
        videoSection.style.display = 'none';
    }
}

// Show error message
function showError() {
    loadingElement.classList.add('hidden');
    recipeDetailsElement.innerHTML = `
        <div class="error">
            <p>Failed to load recipe details. Please try again.</p>
            <a href="index.html" class="search-btn" style="margin-top: 20px; display: inline-block;">
                Back to Search
            </a>
        </div>
    `;
    recipeDetailsElement.classList.remove('hidden');
}

// Initialize page
window.addEventListener('DOMContentLoaded', () => {
    const mealId = getMealIdFromURL();

    if (mealId) {
        fetchMealDetails(mealId);
    } else {
        showError();
    }
});