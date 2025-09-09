document.addEventListener('DOMContentLoaded', function() {
    // --- Tabbed Navigation Logic ---
    const navButtons = document.querySelectorAll('.nav-button');
    const mainContent = document.getElementById('main-content');
    const tabContents = document.querySelectorAll('.tab-content');
    let activeTab = null;

    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            const targetContent = document.getElementById(targetId);

            // If the clicked tab is already active, deactivate it
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                targetContent.style.display = 'none';
                mainContent.style.display = 'block';
                activeTab = null;
            } else {
                // Deactivate any previously active tab
                if (activeTab) {
                    activeTab.classList.remove('active');
                }
                navButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.style.display = 'none');

                // Activate the new tab
                this.classList.add('active');
                mainContent.style.display = 'none';
                targetContent.style.display = 'block';
                activeTab = this;
            }
        });
    });

    // --- Sub-Tab Navigation Logic (for "How it Works") ---
    const subNavButtons = document.querySelectorAll('.sub-nav-button');
    const subTabContents = document.querySelectorAll('.sub-tab-content');

    subNavButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.target;
            
            // Deactivate all sub-nav buttons and hide all sub-tab content
            subNavButtons.forEach(btn => btn.classList.remove('active'));
            subTabContents.forEach(content => content.style.display = 'none');

            // Activate the clicked button and show the corresponding content
            this.classList.add('active');
            document.getElementById(targetId).style.display = 'block';
        });
    });

    // --- Video Modal Logic ---
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const modal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    const closeModal = document.querySelector('.close-modal');

    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.style.display = 'flex';
        });
    });

    function closeVideoModal() {
        modal.style.display = 'none';
        videoPlayer.src = ''; // Stop the video from playing in the background
    }

    closeModal.addEventListener('click', closeVideoModal);

    // Also close the modal if the user clicks on the background overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    // --- Contact Form Modal Logic ---
    const contactLinks = document.querySelectorAll('.contact-link');
    const contactModal = document.getElementById('contact-modal');
    const closeContactModalBtn = document.querySelector('.close-contact-modal');

    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            contactModal.style.display = 'flex';
        });
    });

    function closeContactModal() {
        contactModal.style.display = 'none';
    }

    closeContactModalBtn.addEventListener('click', closeContactModal);

    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    // --- Original App Tile Logic ---
    const inactiveTiles = document.querySelectorAll('.app-tile:not(a.app-tile)');
    
    inactiveTiles.forEach(tile => {
        tile.addEventListener('click', function(e) {
            this.classList.add('pulse');
            
            setTimeout(() => {
                this.classList.remove('pulse');
                const appName = this.querySelector('h3').textContent;
                let category = '';
                if (this.classList.contains('creator')) category = 'Music Creator';
                else if (this.classList.contains('instrument')) category = 'Instrument';
                else if (this.classList.contains('activity')) category = 'Activity';
                alert(`${category} App: ${appName} - Coming soon!`);
            }, 300);
        });
    });

    if (!document.getElementById('pulse-style')) {
        const style = document.createElement('style');
        style.id = 'pulse-style';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(0.95); }
                100% { transform: scale(1); }
            }
            .pulse {
                animation: pulse 0.3s ease-in-out;
            }
            .app-tile::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0);
                transition: background-color 0.3s ease;
                pointer-events: none;
                z-index: 1;
            }
            .app-tile:active::after {
                background-color: rgba(255, 255, 255, 0.3);
            }
        `;
        document.head.appendChild(style);
    }
});
