
// Alternative: Using a free API without key requirement
const FREE_API_URL = 'https://api.exchangerate-api.com/v4/latest/';

// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const swapBtn = document.getElementById('swapBtn');
const resultDiv = document.getElementById('result');
const resultText = document.getElementById('resultText');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const errorText = document.getElementById('errorText');
const rateInfo = document.getElementById('rateInfo');
const rateText = document.getElementById('rateText');
const lastUpdate = document.getElementById('lastUpdate');

// Popular currencies with full names
const popularCurrencies = {
    'USD': 'US Dollar',
    'EUR': 'Euro',
    'GBP': 'British Pound',
    'JPY': 'Japanese Yen',
    'AUD': 'Australian Dollar',
    'CAD': 'Canadian Dollar',
    'CHF': 'Swiss Franc',
    'CNY': 'Chinese Yuan',
    'INR': 'Indian Rupee',
    'MXN': 'Mexican Peso',
    'BRL': 'Brazilian Real',
    'ZAR': 'South African Rand',
    'RUB': 'Russian Ruble',
    'KRW': 'South Korean Won',
    'SGD': 'Singapore Dollar',
    'HKD': 'Hong Kong Dollar',
    'NOK': 'Norwegian Krone',
    'SEK': 'Swedish Krona',
    'DKK': 'Danish Krone',
    'PLN': 'Polish Zloty',
    'THB': 'Thai Baht',
    'IDR': 'Indonesian Rupiah',
    'MYR': 'Malaysian Ringgit',
    'PHP': 'Philippine Peso',
    'CZK': 'Czech Koruna',
    'ILS': 'Israeli Shekel',
    'CLP': 'Chilean Peso',
    'TRY': 'Turkish Lira',
    'AED': 'UAE Dirham',
    'SAR': 'Saudi Riyal',
    'MAD': 'Moroccan Dirham'
};

let exchangeRates = {};
let lastUpdateTime = '';

// Initialize app
async function init() {
    await loadCurrencies();
    setupEventListeners();
    
    // Set default values
    fromCurrencySelect.value = 'MAD';
    toCurrencySelect.value = 'EUR';
}

// Load currencies from API
async function loadCurrencies() {
    try {
        // Using free API to get all available currencies
        const response = await fetch(`${FREE_API_URL}USD`);
        const data = await response.json();
        
        if (data.rates) {
            exchangeRates = data.rates;
            populateCurrencySelects(data.rates);
            lastUpdateTime = new Date(data.date).toLocaleString();
        }
    } catch (error) {
        console.error('Error loading currencies:', error);
        // Fallback to popular currencies only
        populateCurrencySelects(popularCurrencies);
    }
}

// Populate currency dropdowns
function populateCurrencySelects(rates) {
    const currencies = Object.keys(rates).sort();
    
    // Clear existing options
    fromCurrencySelect.innerHTML = '';
    toCurrencySelect.innerHTML = '';
    
    currencies.forEach(currency => {
        // Create option for "From" select
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        const currencyName = popularCurrencies[currency] || currency;
        optionFrom.textContent = `${currency} - ${currencyName}`;
        fromCurrencySelect.appendChild(optionFrom);
        
        // Create option for "To" select
        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = `${currency} - ${currencyName}`;
        toCurrencySelect.appendChild(optionTo);
    });
}

// Setup event listeners
function setupEventListeners() {
    convertBtn.addEventListener('click', convertCurrency);
    swapBtn.addEventListener('click', swapCurrencies);
    
    // Allow Enter key to convert
    amountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            convertCurrency();
        }
    });
}

// Convert currency
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    
    // Validation
    if (!amount || amount <= 0) {
        showError('Please enter a valid amount');
        return;
    }
    
    if (!fromCurrency || !toCurrency) {
        showError('Please select currencies');
        return;
    }
    
    // Show loading
    hideAll();
    loadingDiv.classList.remove('hidden');
    convertBtn.disabled = true;
    
    try {
        // Fetch latest rates for the source currency
        const response = await fetch(`${FREE_API_URL}${fromCurrency}`);
        const data = await response.json();
        
        if (data.rates && data.rates[toCurrency]) {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            
            // Display result
            hideAll();
            resultDiv.classList.remove('hidden');
            resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            
            // Show exchange rate info
            rateInfo.classList.remove('hidden');
            rateText.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
            lastUpdate.textContent = new Date(data.date).toLocaleString();
            
        } else {
            showError('Unable to get exchange rate');
        }
    } catch (error) {
        console.error('Conversion error:', error);
        showError('Failed to convert. Please try again.');
    } finally {
        convertBtn.disabled = false;
    }
}

// Swap currencies
function swapCurrencies() {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;
    
    // If there's already a result, convert again automatically
    if (!resultDiv.classList.contains('hidden')) {
        convertCurrency();
    }
}

// Show error message
function showError(message) {
    hideAll();
    errorDiv.classList.remove('hidden');
    errorText.textContent = message;
    
    // Hide error after 3 seconds
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 3000);
}

// Hide all message divs
function hideAll() {
    loadingDiv.classList.add('hidden');
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    rateInfo.classList.add('hidden');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Update exchange rates every 5 minutes
setInterval(() => {
    loadCurrencies();
}, 300000);