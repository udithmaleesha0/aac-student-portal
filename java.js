// Scales the whole login page down (like the browser's own zoom-out)
// so it always fits the visible screen instead of scrolling.

(function () {
    const MIN_SCALE = 0.65; // don't shrink past this — too small to read

    function fitPageToViewport() {
        const page = document.querySelector('.login-page');
        if (!page) return;

        // Reset zoom first so we measure the TRUE, unscaled content height
        document.body.style.zoom = 1;

        const contentHeight = page.scrollHeight;
        const viewportHeight = window.innerHeight;

        let scale = viewportHeight / contentHeight;
        scale = Math.min(scale, 1);        // never zoom IN past 100%
        scale = Math.max(scale, MIN_SCALE); // never shrink below MIN_SCALE

        document.body.style.zoom = scale;

        // Safety net: if even MIN_SCALE isn't enough on a very short screen,
        // allow scrolling as a fallback rather than clipping content.
        const stillOverflows = contentHeight * scale > viewportHeight;
        document.documentElement.style.overflow = stillOverflows ? 'auto' : 'hidden';
    }

    window.addEventListener('load', fitPageToViewport);
    window.addEventListener('resize', fitPageToViewport);
})();