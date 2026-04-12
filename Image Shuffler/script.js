// ── Image URLs (Unsplash random) ──
        const imageUrls = [
            'https://picsum.photos/id/10/600/450',
            'https://picsum.photos/id/16/600/450',
            'https://picsum.photos/id/20/600/450',
            'https://picsum.photos/id/26/600/450',
            'https://picsum.photos/id/29/600/450',
            'https://picsum.photos/id/37/600/450',
            'https://picsum.photos/id/40/600/450',
            'https://picsum.photos/id/42/600/450',
            'https://picsum.photos/id/50/600/450',
            'https://picsum.photos/id/59/600/450',
            'https://picsum.photos/id/64/600/450',
            'https://picsum.photos/id/72/600/450',
        ];

        const gallery    = document.getElementById('gallery');
        const shuffleBtn = document.getElementById('shuffleBtn');
        const count    = document.getElementById('shuffleCount');
        let shuffleTimes = 0;

        // ── Fisher-Yates Shuffle ──
        function shuffleArray(arr) {
            const shuffled = [...arr];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        // ── Build gallery ──
        function renderGallery(urls) {
            gallery.innerHTML = '';
            urls.forEach(url => {
                const item = document.createElement('div');
                item.classList.add('gallery-item', 'shuffling');
                item.innerHTML = `<img src="${url}" alt="Gallery Image" loading="lazy">`;
                gallery.appendChild(item);
            });
        }

        // ── Initial render ──
        renderGallery(imageUrls);

        // ── Shuffle on click ──
        shuffleBtn.addEventListener('click', () => {
            shuffleTimes++;
            count.textContent = `Shuffled ${shuffleTimes} time${shuffleTimes > 1 ? 's' : ''}`;

            const shuffledUrls = shuffleArray(imageUrls);
            renderGallery(shuffledUrls);
        });