document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.getElementById('lightbox-close');
    const prevButton = document.getElementById('lightbox-prev');
    const nextButton = document.getElementById('lightbox-next');

    if (!lightbox || !lightboxImage || !closeButton || !prevButton || !nextButton) {
        console.error('Lightbox elements not found!');
        return;
    }

    const galleries = {};
    let currentGallery = null;
    let currentIndex = -1;

    // Find all gallery figures and prepare the galleries
    document.querySelectorAll('figure[data-gallery]').forEach(figure => {
        const galleryName = figure.dataset.gallery;
        if (!galleries[galleryName]) {
            galleries[galleryName] = [];
        }
        const imageSrc = figure.dataset.src;
        const imageAlt = figure.querySelector('img').alt;
        galleries[galleryName].push({ src: imageSrc, alt: imageAlt });

        figure.addEventListener('click', () => {
            currentGallery = galleryName;
            // Find the index of the clicked item in the prepared gallery
            currentIndex = galleries[currentGallery].findIndex(item => item.src === imageSrc);
            showLightbox();
            updateImage();
        });
    });

    function showLightbox() {
        lightbox.classList.add('visible');
        lightbox.classList.remove('hidden');
        document.addEventListener('keydown', handleKeydown);
        document.body.style.overflow = 'hidden';
    }

    function hideLightbox() {
        lightbox.classList.remove('visible');
        lightbox.classList.add('hidden');
        document.removeEventListener('keydown', handleKeydown);
        document.body.style.overflow = '';
    }

    function updateImage() {
        if (currentGallery && currentIndex !== -1) {
            const image = galleries[currentGallery][currentIndex];
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
        }
    }

    function showPrev() {
        if (currentGallery) {
            currentIndex = (currentIndex - 1 + galleries[currentGallery].length) % galleries[currentGallery].length;
            updateImage();
        }
    }

    function showNext() {
        if (currentGallery) {
            currentIndex = (currentIndex + 1) % galleries[currentGallery].length;
            updateImage();
        }
    }

    function handleKeydown(e) {
        if (e.key === 'Escape') {
            hideLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        } else if (e.key === 'ArrowRight') {
            showNext();
        }
    }

    closeButton.addEventListener('click', hideLightbox);
    prevButton.addEventListener('click', showPrev);
    nextButton.addEventListener('click', showNext);

    // Close lightbox when clicking on the backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            hideLightbox();
        }
    });
});