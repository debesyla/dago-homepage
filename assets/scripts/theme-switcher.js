(function () {
    const themeRadios = Array.from(document.querySelectorAll('input[name="theme"]'));
    if (themeRadios.length === 0) {
        return;
    }

    const resetTheme = () => {
        document.body.className = 'dago';
        localStorage.setItem('theme', 'dago');
        themeRadios.forEach(radio => {
            radio.checked = radio.value === 'dago';
        });
    };

    const applyTheme = (theme) => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
        themeRadios.forEach(radio => {
            radio.checked = radio.value === theme;
        });
    };

    themeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'txt') {
                applyTheme('dago');
                window.location.assign(new URL('index.txt', window.location.href));
                return;
            }

            if (radio.value === 'print') {
                applyTheme('print');
                window.addEventListener('afterprint', resetTheme, { once: true });
                window.print();
                return;
            }

            applyTheme(radio.value);
        });
    });

    // hide 'print' if user can't print
    const supportsPrint = typeof window.print === 'function';
    if (!supportsPrint) {
        const printRadio = document.querySelector('input[name="theme"][value="print"]');
        if (printRadio && printRadio.parentElement) {
            printRadio.parentElement.style.display = 'none';
        }
    }
})();