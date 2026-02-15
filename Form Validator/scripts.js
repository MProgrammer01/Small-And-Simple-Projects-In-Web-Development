"use strict";
let registrationForm = document.getElementById("RegistrationForm");
let userNameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirm_password");
let registerButton = document.getElementById("registerButton");
let requiredUsernameError = document.getElementById("requiredUsernameError");
let invalidUsernameError = document.getElementById("invalidUsernameError");
let requiredEmailError = document.getElementById("requiredEmailError");
let invalidEmailError = document.getElementById("invalidEmailError");
let requiredPasswordError = document.getElementById("requiredPasswordError");
let invalidPasswordError = document.getElementById("invalidPasswordError");
let requiredConfirmPasswordError = document.getElementById("requiredConfirmPasswordError");
let invalidConfirmPasswordError = document.getElementById("invalidConfirmPasswordError");
function validateForm() {
    if (isValidInputs()) {
        alert("Registration successful!");
        registrationForm.reset();
        resetInputStyles();
    }
}
function isValidInputs() {
    let isUserNameValid = validateInput(userNameInput, requiredUsernameError, invalidUsernameError);
    let isEmailValid = validateInput(emailInput, requiredEmailError, invalidEmailError);
    let isPasswordValid = validateInput(passwordInput, requiredPasswordError, invalidPasswordError);
    let isConfirmPasswordValid = validateInput(confirmPasswordInput, requiredConfirmPasswordError, invalidConfirmPasswordError);
    console.log(isUserNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid);
    return (isUserNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid);
}
function validateInput(input, requiredError, invalidError) {
    let isValid = false;
    let count = 0;
    if (inputIsEmpty(input, requiredError) === false) {
        count++;
    }
    if (inputIsInvalid(input, invalidError) === false) {
        count++;
    }
    isValid = (count === 2);
    return isValid;
}
function inputIsEmpty(input, errorElement) {
    if (input.value.trim() === "") {
        isNotGreatInput(true, input, errorElement);
        return true;
    }
    isNotGreatInput(false, input, errorElement);
    return false;
}
function inputIsInvalid(input, errorElement) {
    if (input.value.trim() !== "") {
        switch (input.name) {
            case "username":
                if (input.value.trim().length < 3) {
                    isNotGreatInput(true, input, errorElement);
                    return true;
                }
                else {
                    isNotGreatInput(false, input, errorElement);
                    return false;
                }
            case "email":
                let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isNotGreatInput(true, input, errorElement);
                    return true;
                }
                else {
                    isNotGreatInput(false, input, errorElement);
                    return false;
                }
            case "password":
                if (input.value.trim().length < 6) {
                    isNotGreatInput(true, input, errorElement);
                    return true;
                }
                else {
                    isNotGreatInput(false, input, errorElement);
                    return false;
                }
            case "confirm_password":
                let passwordValue = passwordInput.value.trim();
                if (input.value.trim() !== passwordValue) {
                    isNotGreatInput(true, input, errorElement);
                    return true;
                }
                else {
                    isNotGreatInput(false, input, errorElement);
                    return false;
                }
        }
    }
    isNotGreatInput(false, input, errorElement);
    return false;
}
function isNotGreatInput(isGreat, input, errorElement) {
    if (!isGreat) {
        input.classList.remove("InvalidInput");
        input.classList.add("ValidInput");
        errorElement.style.display = "none";
    }
    else {
        input.classList.remove("ValidInput");
        input.classList.add("InvalidInput");
        errorElement.style.display = "block";
    }
}
function resetInputStyles() {
    let inputs = [userNameInput, emailInput, passwordInput, confirmPasswordInput];
    let errorElements = document.querySelectorAll(".errorParagraph");
    inputs.forEach((input) => {
        input.classList.remove("ValidInput");
        input.classList.remove("InvalidInput");
    });
    errorElements.forEach((errorElement) => {
        errorElement.style.display = "none";
    });
}
registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    validateForm();
});
//# sourceMappingURL=scripts.js.map