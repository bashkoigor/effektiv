// Modal menu by Ajax, show categorys.
$.request('onAjax', {
    update: { 'site/modal-menu': '.modal-menu-wrap' }
});

// Mobile style
window.onscroll = function() {
    if (window.pageYOffset == 0) {
        document.getElementById("to-top").style.display = "none";
    } else {
        document.getElementById("to-top").style.display = "block";
    }

    if ((window.innerHeight + window.scrollY + 900) >= document.body.offsetHeight) {
        document.getElementById("mobile-menu").style.setProperty("display", "none", "important");
    } else {
        document.getElementById("mobile-menu").style.display = "block";
    }
}

// Scroll to top
document.getElementById("to-top").onclick = function() { scrollToTop() };
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
