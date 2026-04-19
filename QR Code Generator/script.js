
const qrInput = document.getElementById('qrInput');
        const sizeSelect = document.getElementById('sizeSelect');
        const generateBtn = document.getElementById('generateBtn');
        const errorMsg = document.getElementById('errorMsg');
        const loading = document.getElementById('loading');
        const qrResult = document.getElementById('qrResult');
        const qrImage = document.getElementById('qrImage');
        const downloadBtn = document.getElementById('downloadBtn');

        // ── Generate QR Code ─
        generateBtn.addEventListener('click', () => {
            const text = qrInput.value.trim();
            
            // Validation
            if (!text) {
                errorMsg.classList.add('active');
                qrResult.classList.remove('active');
                setTimeout(() => errorMsg.classList.remove('active'), 2000);
                return;
            }

            // Hide error and show loading
            errorMsg.classList.remove('active');
            qrResult.classList.remove('active');
            loading.classList.add('active');

            const size = sizeSelect.value;
            // Using qrserver.com API
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

            // Simulate loading delay for better UX
            setTimeout(() => {
                qrImage.src = qrUrl;
                
                qrImage.onload = () => {
                    loading.classList.remove('active');
                    qrResult.classList.add('active');
                };

                qrImage.onerror = () => {
                    loading.classList.remove('active');
                    errorMsg.textContent = '⚠️ Failed to generate QR code. Please try again!';
                    errorMsg.classList.add('active');
                    setTimeout(() => errorMsg.classList.remove('active'), 3000);
                };
            }, 800);
        });

        // ── Download QR Code ─
        downloadBtn.addEventListener('click', async () => {
            const text = qrInput.value.trim();
            const size = sizeSelect.value;

            try {
                const response = await fetch(
                    `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
                );
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = url;
                link.download = 'qrcode.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Download failed:', error);
            }
        });

        // ─ Enter key to generate ──
        qrInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                generateBtn.click();
            }
        });