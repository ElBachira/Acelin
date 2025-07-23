document.addEventListener('DOMContentLoaded', function() {

    // --- PARCHE PARA AUTOPLAY EN MÓVILES Y NAVEGADORES ESTRICTOS ---
    const audio = document.getElementById('song');
    // Esta función 'desbloquea' el audio la primera vez que el usuario toca la pantalla.
    function unlockAudio() {
        if (audio.paused) {
            audio.play().catch(() => {}); // Intenta reproducir
            audio.pause(); // Y pausa inmediatamente
        }
        // Se elimina a sí misma para no ejecutarse más de una vez.
        document.body.removeEventListener('click', unlockAudio);
        document.body.removeEventListener('touchstart', unlockAudio);
    }
    document.body.addEventListener('click', unlockAudio);
    document.body.addEventListener('touchstart', unlockAudio);
    // --- FIN DEL PARCHE ---

    // --- PRE-LOADER ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('loaded');
    });

    // --- EFECTOS DE SONIDO ---
    const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
    const swooshSound = new Audio('https://www.fesliyanstudios.com/play-mp3/570');
    
    document.querySelectorAll('.tab-button, .close-btn, .play-button, .links-grid a').forEach(element => {
        element.addEventListener('click', () => {
            if (element.matches('.links-grid a')) {
                swooshSound.currentTime = 0;
                swooshSound.play().catch(e => console.log("Error al reproducir swoosh:", e));
            } else {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log("Error al reproducir click:", e));
            }
        });
    });

    // --- ANIMACIÓN DE TEXTO "MÁQUINA DE ESCRIBIR" ---
    // (Tu código de máquina de escribir va aquí, sin cambios)
    document.querySelectorAll('.typewriter').forEach((element, index) => {
        const text = element.innerHTML;
        element.innerHTML = '';
        element.style.opacity = 1;
        let i = 0;
        setTimeout(() => {
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, 25);
        }, 500 + index * 100); 
    });

    // --- EFECTO PARALLAX (CON MEJORA PARA MÓVILES) ---
    // (Tu código de parallax va aquí, sin cambios)
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xOffset = (clientX / innerWidth - 0.5) * -2;
        const yOffset = (clientY / innerHeight - 0.5) * -2;
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.style.backgroundPosition = `calc(50% + ${xOffset}%) calc(50% + ${yOffset}%)`;
        }
    });

    // --- LÓGICA DE PESTAÑAS ---
    // (Tu código de pestañas va aquí, sin cambios)
    const tabButtons = document.querySelectorAll('.tab-button');
    const closeButtons = document.querySelectorAll('.close-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const paneId = button.dataset.tab;
            document.getElementById(paneId).classList.add('active');
            if (paneId === 'stats-tab') { animateStats(); }
        });
    });
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.overlay-pane').classList.remove('active');
        });
    });
    function animateStats(){document.querySelectorAll('.overlay-pane.active .fill').forEach(bar=>{bar.style.width='0%';const percentage=bar.getAttribute('data-p');setTimeout(()=>{bar.style.width=percentage+'%'},100)})}
    
    // --- LÓGICA DEL REPRODUCTOR DE MÚSICA (CORREGIDO) ---
    const playPauseBtn = document.getElementById('play-pause-btn');
    const spotifyIcon = document.querySelector('.spotify-icon');
    const playIcon = '<i class="fas fa-play"></i>';
    const pauseIcon = '<i class="fas fa-pause"></i>';

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = pauseIcon;
            spotifyIcon.classList.add('is-spinning');
        } else {
            audio.pause();
            playPauseBtn.innerHTML = playIcon;
            spotifyIcon.classList.remove('is-spinning');
        }
    });

    audio.addEventListener('ended', () => {
        playPauseBtn.innerHTML = playIcon;
        spotifyIcon.classList.remove('is-spinning');
    });

    // --- EASTER EGG Y BOTÓN DE COPIAR ---
    // (El resto de tu código, sin cambios)
    const fnafSticker=document.getElementById('fnaf-sticker');const honkSound=new Audio('https://www.myinstants.com/media/sounds/fnaf-nose-honk.mp3');fnafSticker.addEventListener('click',()=>{honkSound.currentTime=0;honkSound.play().catch(e => {})});
    const copyBtn = document.getElementById('copy-link-btn');
    const originalBtnText = copyBtn.innerHTML;
    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href).then(() => {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            copyBtn.classList.add('copied');
            swooshSound.currentTime = 0;
            swooshSound.play().catch(err => {});
            setTimeout(() => {
                copyBtn.innerHTML = originalBtnText;
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
});
