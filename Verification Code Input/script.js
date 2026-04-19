const inputs = document.querySelectorAll(".code-inputs input");
const inputState = document.getElementById("inputState");
const successState = document.getElementById("successState");
const resendBtn = document.getElementById("resendBtn");
const resendTimer = document.getElementById("resendTimer");
const continueBtn = document.getElementById("continueBtn");

let resendCooldown = 0;
let cooldownInterval = null;

// ── Auto-focus and auto-submit ──
inputs.forEach((input, index) => {
  // Focus on click
  input.addEventListener("click", () => {
    input.select();
  });

  // Handle input
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      e.target.value = "";
      return;
    }

    if (value.length === 1) {
      input.classList.add("filled");

      // Move to next input
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      }

      // Check if all inputs are filled
      const allFilled = Array.from(inputs).every(
        (inp) => inp.value.length === 1,
      );
      
      if (allFilled) {
        setTimeout(verifyCode, 300);
      }
    }
  });

  // Handle backspace
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs[index - 1].focus();
      inputs[index - 1].value = "";
      inputs[index - 1].classList.remove("filled");
    }
  });

  // Handle paste
  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (/^\d+$/.test(pastedData)) {
      pastedData.split("").forEach((char, i) => {
        if (inputs[i]) {
          inputs[i].value = char;
          inputs[i].classList.add("filled");
        }
      });

      // Focus on last filled input or next empty one
      const nextIndex = Math.min(pastedData.length, inputs.length - 1);
      inputs[nextIndex].focus();

      // Verify if all filled
      if (pastedData.length === 6) {
        setTimeout(verifyCode, 300);
      }
    }
  });
});

// ── Verify Code (Simulation) ──
function verifyCode() {
  // Simulate verification (always succeeds for demo)
  setTimeout(() => {
    // Show success state
    inputState.classList.add("hidden");
    successState.classList.add("active");
  }, 500);
}

// ── Resend Code ──
resendBtn.addEventListener("click", () => {
  if (resendCooldown > 0) return;

  // Clear inputs
  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("filled");
  });

  // Focus first input
  inputs[0].focus();

  // Start cooldown
  resendCooldown = 30;
  resendBtn.disabled = true;
  updateTimerDisplay();

  cooldownInterval = setInterval(() => {
    resendCooldown--;
    updateTimerDisplay();

    if (resendCooldown <= 0) {
      clearInterval(cooldownInterval);
      resendBtn.disabled = false;
      resendTimer.textContent = "";
    }
  }, 1000);

  // Show feedback
  resendBtn.textContent = "Code Sent!";
  setTimeout(() => {
    resendBtn.textContent = "Resend Code";
  }, 2000);
});

function updateTimerDisplay() {
  if (resendCooldown > 0) {
    resendTimer.textContent = `Resend available in ${resendCooldown}s`;
  }
}

// ── Continue Button ──
continueBtn.addEventListener("click", () => {
  alert("Proceeding to next step...");
  // Here you would redirect or perform next action
});

// Focus first input on load
inputs[0].focus();
