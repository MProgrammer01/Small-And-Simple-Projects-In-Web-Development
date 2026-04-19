const passwordInput = document.getElementById('password');
        const togglePassword = document.getElementById('togglePassword');
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        const strengthPercentage = document.getElementById('strengthPercentage');
        const criteriaGrid = document.getElementById('criteriaGrid');
        const signupForm = document.getElementById('signupForm');

        // ── Toggle Password Visibility ──
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
        });

        // ── Password Strength Checker ──
        const criteria = {
            length: { regex: /.{8,}/ },
            lowercase: { regex: /[a-z]/ },
            uppercase: { regex: /[A-Z]/ },
            number: { regex: /[0-9]/ },
            special: { regex: /[^A-Za-z0-9]/ }
        };

        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            let metCount = 0;
            
            // Check each criteria
            for (const key of Object.keys(criteria)) {
                const badge = criteriaGrid.querySelector(`[data-criteria="${key}"]`);
                const isMet = criteria[key].regex.test(password);

                if (isMet) {
                    metCount++;
                    badge.classList.remove('not-met');
                    badge.classList.add('met');
                    badge.querySelector('.icon').textContent = '✓';
                } else {
                    badge.classList.remove('met');
                    badge.classList.add('not-met');
                    badge.querySelector('.icon').textContent = '○';
                }
            }

            // Calculate strength percentage
            const percentage = (metCount / Object.keys(criteria).length) * 100;
            strengthBar.style.width = `${percentage}%`;
            strengthPercentage.textContent = `${Math.round(percentage)}%`;

            // Update strength label and bar color
            if (password.length === 0) {
                strengthText.textContent = '';
                strengthBar.style.background = '#333';
            } else if (percentage <= 20) {
                strengthText.textContent = 'Weak 😟';
                strengthText.style.color = '#e74c3c';
                strengthBar.style.background = '#e74c3c';
            } else if (percentage <= 40) {
                strengthText.textContent = 'Fair 😐';
                strengthText.style.color = '#e67e22';
                strengthBar.style.background = '#e67e22';
            } else if (percentage <= 60) {
                strengthText.textContent = 'Medium 🙂';
                strengthText.style.color = '#f1c40f';
                strengthBar.style.background = '#f1c40f';
            } else if (percentage <= 80) {
                strengthText.textContent = 'Good 😊';
                strengthText.style.color = '#27ae60';
                strengthBar.style.background = '#27ae60';
            } else {
                strengthText.textContent = 'Strong 💪';
                strengthText.style.color = '#2ecc71';
                strengthBar.style.background = '#2ecc71';
            }
        });

        // ── Form Submit ──
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = passwordInput.value;

            if (!firstName || !lastName || !email || !password) {
                alert('Please fill in all fields!');
                return;
            }

            // Check password strength
            const metCount = Object.keys(criteria).filter(key => {
                console.log("ee");
                return criteria[key].regex.test(password);
            }).length;

            if (metCount < 4) {
                alert('Password is too weak! Please meet more criteria.');
                return;
            }

            alert('Account created successfully! 🎉');
        });