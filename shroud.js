// ==UserScript==
// @name            Shroud
// @name:fr         Shroud
// @name:de         Shroud
// @name:es         Shroud
// @name:ru         Shroud
// @name:pt         Shroud
// @description     Anti-Fingerprinting Timing & Scroll Protection – Introduces randomized timing jitter to prevent fingerprinting via scroll and typing patterns without affecting UX.
// @description:fr  Protection contre l’empreinte numérique – Introduit une variabilité temporelle aléatoire pour empêcher le pistage via les modèles de défilement et de frappe, sans affecter l'expérience utilisateur.
// @description:de  Schutz vor digitalem Fingerprinting – Fügt zufällige Zeitabweichungen hinzu, um das Erkennen von Scroll- und Tippmustern zu erschweren, ohne das Nutzungserlebnis zu beeinträchtigen.
// @description:es  Protección contra la toma de huellas digitales – Introduce variaciones temporales aleatorias para evitar la identificación mediante patrones de desplazamiento y escritura, sin afectar la experiencia del usuario.
// @description:ru  Защита от цифрового отпечатка – Вводит случайные колебания времени, чтобы предотвратить слежку по шаблонам прокрутки и набора текста без ухудшения удобства использования.
// @description:pt  Proteção contra Impressão Digital – Introduz variação aleatória no tempo para impedir o rastreamento por padrões de rolagem e digitação, sem afetar a experiência do usuário.
// @version         0.0.1
// @license         MIT
// @match           *://*/*
// @run-at          document-start
// @grant           none
// @compatible      firefox
// @compatible      opera
// @compatible      edge
// @compatible      safari
// ==/UserScript==

(function () {
    'use strict';

    // Small-range subtle jitter generation
    function generateJitter(range) {
        return (Math.random() * 2 - 1) * range;
    }

    // Key input handler
    window.addEventListener('keydown', (e) => {
        const target = e.target;

        // Only affect editable elements
        const isTextInput =
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target.isContentEditable;

        if (!isTextInput) return;

        // Prevent original event from propagating to scripts
        e.stopImmediatePropagation();
        e.preventDefault();

        const delay = Math.random() * 40 + Math.random() * 40; // 0–80ms jitter

        setTimeout(() => {
            // Handle standard text input elements
            if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
                handleTextKey(target, e);
            } else if (target.isContentEditable) {
                handleContentEditableKey(target, e);
            }

            // Optionally, dispatch a synthetic event to mimic key activity (non-trusted)
            const fakeEvent = new KeyboardEvent('keydown', {
                key: e.key,
                code: e.code,
                keyCode: e.keyCode,
                which: e.which,
                shiftKey: e.shiftKey,
                ctrlKey: e.ctrlKey,
                altKey: e.altKey,
                metaKey: e.metaKey,
                bubbles: true,
                cancelable: true,
                composed: true
            });
            target.dispatchEvent(fakeEvent);
        }, delay);
    }, true);

    // Handle key input for input/textarea
    function handleTextKey(target, e) {
        const key = e.key;
        const value = target.value;
        let start = target.selectionStart;
        let end = target.selectionEnd;

        switch (key) {
            case 'Backspace':
                if (start === end && start > 0) {
                    target.value = value.slice(0, start - 1) + value.slice(end);
                    target.selectionStart = target.selectionEnd = start - 1;
                } else {
                    target.value = value.slice(0, start) + value.slice(end);
                    target.selectionStart = target.selectionEnd = start;
                }
                break;
            case 'Delete':
                if (start === end && end < value.length) {
                    target.value = value.slice(0, start) + value.slice(end + 1);
                } else {
                    target.value = value.slice(0, start) + value.slice(end);
                }
                target.selectionStart = target.selectionEnd = start;
                break;
            case 'Enter':
                insertTextAtCursor(target, '\n');
                break;
            case 'ArrowLeft':
                if (start > 0) target.selectionStart = target.selectionEnd = start - 1;
                break;
            case 'ArrowRight':
                if (start < value.length) target.selectionStart = target.selectionEnd = start + 1;
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                // Let browser handle vertical navigation — no good generic way to simulate it
                break;
            default:
                if (key.length === 1) {
                    insertTextAtCursor(target, key);
                }
        }
    }

    // Insert character at cursor in input/textarea
    function insertTextAtCursor(target, text) {
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const value = target.value;
        target.value = value.slice(0, start) + text + value.slice(end);
        const newPos = start + text.length;
        target.selectionStart = target.selectionEnd = newPos;
    }

    // Handle key input for contentEditable
    function handleContentEditableKey(target, e) {
        const key = e.key;

        switch (key) {
            case 'Backspace':
            case 'Delete':
            case 'Enter':
                document.execCommand(key.toLowerCase());
                break;
            default:
                if (key.length === 1) {
                    document.execCommand('insertText', false, key);
                }
        }
    }

    // Scroll jitter
    let lastScrollTime = 0;
    window.addEventListener('scroll', () => {
        const now = performance.now();
        const delay = Math.random() * 75 + Math.random() * 75; // 0–150ms

        if (now - lastScrollTime < delay) return;

        lastScrollTime = now;
        const noiseX = generateJitter(2);
        const noiseY = generateJitter(2);
        window.scrollTo(window.scrollX + noiseX, window.scrollY + noiseY);
    }, { passive: true });

})();
