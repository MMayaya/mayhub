(function () {
    'use strict';

    const scriptUrl = new URL(document.currentScript.src);
    const siteRoot = new URL('.', scriptUrl);
    const mutedKey = 'mayhub-game-sounds-muted';
    const audio = {
        correct: new Audio(new URL('Sounds/Correct.mp3', siteRoot)),
        wrong: new Audio(new URL('Sounds/Wrong.mp3', siteRoot)),
        pass: new Audio(new URL('Sounds/Pass.mp3', siteRoot)),
        fail: new Audio(new URL('Sounds/Fail.mp3', siteRoot)),
        wheel: new Audio(new URL('Sounds/Wheel.mp3', siteRoot)),
        snakeMove: new Audio(new URL('Sounds/MovingSnake.mp3', siteRoot)),
        snakeBite: new Audio(new URL('Sounds/SnakeBite.mp3', siteRoot))
    };

    audio.correct.volume = 0.5;
    audio.wrong.volume = 0.45;
    audio.pass.volume = 0.5;
    audio.fail.volume = 0.5;
    audio.wheel.volume = 0.35;
    audio.snakeMove.volume = 0.25;
    audio.snakeBite.volume = 0.55;
    audio.wheel.loop = true;
    audio.snakeMove.loop = true;

    Object.values(audio).forEach(sound => {
        sound.preload = 'auto';
    });

    let muted = localStorage.getItem(mutedKey) === 'true';

    function play(name) {
        if (muted) return;
        const sound = audio[name];
        sound.pause();
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }

    function stop(name) {
        const sound = audio[name];
        sound.pause();
        sound.currentTime = 0;
    }

    function stopLoopingSounds() {
        stop('wheel');
        stop('snakeMove');
    }

    function updateToggle(button) {
        button.textContent = muted ? '\u{1F507}' : '\u{1F50A}';
        button.setAttribute('aria-label', muted ? 'Turn on game sounds' : 'Mute game sounds');
        button.title = muted ? 'Turn on game sounds' : 'Mute game sounds';
        button.setAttribute('aria-pressed', String(muted));
    }

    function addMuteControl() {
        const style = document.createElement('style');
        style.textContent = `
            .mayhub-sound-toggle {
                position: fixed;
                right: max(1rem, env(safe-area-inset-right));
                bottom: max(1rem, env(safe-area-inset-bottom));
                width: 44px;
                height: 44px;
                border: 2px solid rgba(255, 255, 255, 0.85);
                border-radius: 50%;
                background: #002b5e;
                color: #fff;
                display: grid;
                place-items: center;
                font-size: 1.2rem;
                cursor: pointer;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);
                z-index: 1000;
            }
            .mayhub-sound-toggle:hover,
            .mayhub-sound-toggle:focus-visible {
                background: #004080;
                outline: 3px solid #8ec5ff;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mayhub-sound-toggle';
        button.addEventListener('click', () => {
            muted = !muted;
            localStorage.setItem(mutedKey, String(muted));
            if (muted) stopLoopingSounds();
            updateToggle(button);
        });
        updateToggle(button);
        document.body.appendChild(button);
    }

    window.MayHubSounds = {
        playCorrect: () => play('correct'),
        playWrong: () => play('wrong'),
        playPass: () => play('pass'),
        playFail: () => play('fail'),
        startWheel: () => play('wheel'),
        stopWheel: () => stop('wheel'),
        startSnakeMovement: () => play('snakeMove'),
        stopSnakeMovement: () => stop('snakeMove'),
        playSnakeBite: () => play('snakeBite')
    };

    window.addEventListener('pagehide', stopLoopingSounds);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopLoopingSounds();
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addMuteControl, { once: true });
    } else {
        addMuteControl();
    }
})();
