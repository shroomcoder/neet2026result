document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const revealBtn = document.getElementById('reveal-btn');
    const videoOverlay = document.getElementById('video-overlay');
    const video = document.getElementById('rickroll-video');

    // 1. Preloader Logic: Wait for video to load
    video.addEventListener('canplaythrough', () => {
        preloader.classList.add('hidden');
        mainContent.classList.remove('hidden');
    }, { once: true });

    // Fallback: show content after 3 seconds if video is slow
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            mainContent.classList.remove('hidden');
        }
    }, 3000);

    // 2. Rickroll Trigger
    revealBtn.addEventListener('click', async () => {
        try {
            if (videoOverlay.requestFullscreen) {
                await videoOverlay.requestFullscreen();
            } else if (videoOverlay.webkitRequestFullscreen) {
                await videoOverlay.webkitRequestFullscreen();
            } else if (videoOverlay.mozRequestFullscreen) {
                await videoOverlay.mozRequestFullscreen();
            } else if (videoOverlay.msRequestFullscreen) {
                await videoOverlay.msRequestFullscreen();
            }

            videoOverlay.classList.remove('hidden');
            video.muted = false;
            video.play();

            if (window.innerWidth < 768) {
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(err => {
                        console.log('Orientation lock failed, but continuing playback');
                    });
                }
            }
        } catch (error) {
            console.error('Error triggering Rickroll:', error);
            videoOverlay.classList.remove('hidden');
            video.muted = false;
            video.play();
        }
    });
});