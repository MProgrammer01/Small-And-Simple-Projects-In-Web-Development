// ---------- استهداف العناصر ----------
let randomPasswordOutput = document.getElementById("randomPasswordOutput");
let btnCopyPassword = document.getElementById("btnCopyPassword");
let rangInput = document.getElementById("rangInput");
let rangeDisplay = document.getElementById("rangeValue");
let btnGeneratePassword = document.getElementById("btnGeneratePassword");
let levelOfPassword = document.getElementById("levelOfPassword");
let progBarFill = document.getElementById("progBarFill");
// Checkboxes
let upperCaseCheckInput = document.getElementById("uppercaseCheckboxInput");
let lowerCaseCheckInput = document.getElementById("lowercaseCheckboxInput");
let numbersCaseCheckInput = document.getElementById("numberscaseCheckboxInput");
let symbolsCaseCheckInput = document.getElementById("symbolscaseCheckboxInput");
// ---------- مجموعات الحروف ----------
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
function rangeChanging() {
    let valueOfRange = parseInt(rangInput.value);
    rangeDisplay.textContent = valueOfRange.toString();
}
function copyToClipboard() {
    let text = randomPasswordOutput.textContent.toString();
    navigator.clipboard.writeText(text);
    btnCopyPassword.className = "fa-solid fa-check CopyIcon";
    setTimeout(() => (btnCopyPassword.className = "fa-solid fa-copy CopyIcon"), 800);
}
// ---------- الدالة الرئيسية: توليد كلمة السر ----------
function generateRandomPassword(length, options) {
    let allowedChars = "";
    if (options.uppercase)
        allowedChars += UPPERCASE;
    if (options.lowercase)
        allowedChars += LOWERCASE;
    if (options.numbers)
        allowedChars += NUMBERS;
    if (options.symbols)
        allowedChars += SYMBOLS;
    if (allowedChars.length === 0) {
        return "";
    }
    // 3. توليد كلمة السر
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    return password;
}
function computeStrength(length, selectedCount) {
    // Formula: (length/24 * 60%) + (selectedCount/4 * 40%)
    const lengthScore = (length / 24) * 60;
    const varietyScore = (selectedCount / 4) * 40;
    const totalScore = lengthScore + varietyScore;
    // تحويل إلى نسبة مئوية
    const percent = Math.round(totalScore);
    // تحديد المستوى
    if (percent <= 20) {
        return { level: "Very weak", color: "#d32f2f", percent };
    }
    else if (percent <= 40) {
        return { level: "Weak", color: "#f57c00", percent };
    }
    else if (percent <= 60) {
        return { level: "Medium", color: "#ffa726", percent };
    }
    else if (percent <= 80) {
        return { level: "Strong", color: "#388e3c", percent };
    }
    else {
        return { level: "Very strong", color: "#7b1fa2", percent };
    }
}
function countOfCheckedInputs() {
    const selectedCount = [
        upperCaseCheckInput.checked,
        lowerCaseCheckInput.checked,
        numbersCaseCheckInput.checked,
        symbolsCaseCheckInput.checked,
    ].filter(Boolean).length;
    return selectedCount;
}
// ---------- الدالة الخاصة بمستوى و قوة الباسورد ----------
function PasswordStrengthAndLevel() {
    const length = parseInt(rangInput.value);
    const selectedCount = countOfCheckedInputs();
    const strength = computeStrength(length, selectedCount);
    levelOfPassword.textContent = strength.level;
    levelOfPassword.style.color = strength.color;
    progBarFill.style.width = `${strength.percent}%`;
    progBarFill.style.backgroundColor = strength.color;
}
// ---------- الدالة الخاصة بزر توليد كلمة المرور ----------
function generatePassword() {
    const selectedCount = countOfCheckedInputs();
    if (selectedCount === 0) {
        alert("One Element Checked At List Required");
        randomPasswordOutput.textContent = "...";
        levelOfPassword.textContent = "...";
        levelOfPassword.style.color = "#000000";
        progBarFill.style.width = `${0}%`;
        return;
    }
    let passwordGenerated = generateRandomPassword(parseInt(rangInput.value), {
        uppercase: upperCaseCheckInput.checked,
        lowercase: lowerCaseCheckInput.checked,
        numbers: numbersCaseCheckInput.checked,
        symbols: symbolsCaseCheckInput.checked,
    });
    randomPasswordOutput.textContent = passwordGenerated;
    PasswordStrengthAndLevel();
}
rangInput.addEventListener("input", rangeChanging);
btnCopyPassword.addEventListener("click", copyToClipboard);
btnGeneratePassword.addEventListener("click", generatePassword);
export {};
//# sourceMappingURL=scripts.js.map