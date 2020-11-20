let slideIndex = 1;
showSlides(slideIndex);
setInterval(function() {
    plusSlides(1)
}, 6000);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("page");
    let dots = document.getElementsByClassName("dot");
    // loop the slides
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function show(id, id2) {
    let ele = document.getElementById(id);
    let but = document.getElementById(id2);
    if (ele.style.display == "none") {
        ele.style.display = "";
        but.textContent = "-"
    } else {
        ele.style.display = "none";
        but.textContent = "+"
    }
}

