// Get elements
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const copyBtn = document.getElementById("copyBtn");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const copyMessage = document.getElementById("copyMessage");

// Quotes database
const quotes = [
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "In the end, we only regret the chances we didn't take.",
    author: "Lewis Carroll",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    text: "You learn more from failure than from success. Don't let it stop you.",
    author: "Unknown",
  },
  {
    text: "It's not whether you get knocked down, it's whether you get up.",
    author: "Vince Lombardi",
  },
  {
    text: "If you are working on something that you really care about, you don't have to be pushed.",
    author: "Steve Jobs",
  },
  {
    text: "People who are crazy enough to think they can change the world, are the ones who do.",
    author: "Rob Siltanen",
  },
  {
    text: "Failure will never overtake me if my determination to succeed is strong enough.",
    author: "Og Mandino",
  },
];

// Current quote index
let currentQuoteIndex = 0;

// Copy quote to clipboard
copyBtn.addEventListener("click", async function () {
  const textToCopy = `${quoteText.textContent}\n${quoteAuthor.textContent}`;

  try {
    await navigator.clipboard.writeText(textToCopy);
    showCopyMessage();

    // Add success animation to button
    this.style.background = "rgba(16, 185, 129, 0.2)";
    this.style.borderColor = "rgba(16, 185, 129, 0.5)";

    setTimeout(() => {
      this.style.background = "transparent";
      this.style.borderColor = "rgba(255, 255, 255, 0.2)";
    }, 300);
  } catch (err) {
    console.error("Failed to copy:", err);
    // Fallback for older browsers
    fallbackCopy(textToCopy);
  }
});

// Fallback copy method for older browsers
function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand("copy");
    showCopyMessage();
  } catch (err) {
    console.error("Fallback copy failed:", err);
  }

  document.body.removeChild(textArea);
}

// Show copy success message
function showCopyMessage() {
  copyMessage.classList.remove("hidden");

  setTimeout(() => {
    copyMessage.classList.add("hidden");
  }, 2000);
}

// Get new random quote
newQuoteBtn.addEventListener("click", function () {
  getNewQuote();
});

function getNewQuote() {
  // Add loading state
  newQuoteBtn.classList.add("loading");
  newQuoteBtn.textContent = "";
  // Fade out current quote
  quoteText.classList.add("fade-out");
  quoteAuthor.classList.add("fade-out");

  setTimeout(() => {
    // Get random quote (different from current)
    let newIndex = Math.floor(Math.random() * quotes.length);

    currentQuoteIndex = newIndex;
    const newQuote = quotes[currentQuoteIndex];

    // Update quote
    quoteText.textContent = newQuote.text;
    quoteAuthor.textContent = `- ${newQuote.author}`;

    // Fade in new quote
    setTimeout(() => {
      quoteText.classList.remove("fade-out");
      quoteAuthor.classList.remove("fade-out");
      newQuoteBtn.classList.remove("loading");
      newQuoteBtn.textContent = "New Quote";
    }, 50);
  }, 400);
}

// Initialize with random quote on load
window.addEventListener("load", function () {
  // Start with a random quote
  currentQuoteIndex = Math.floor(Math.random() * quotes.length);
  const initialQuote = quotes[currentQuoteIndex];
  quoteText.textContent = initialQuote.text;
  quoteAuthor.textContent = `- ${initialQuote.author}`;
});

