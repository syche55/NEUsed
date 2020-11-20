let textIndex = 0;
setInterval(function() {
    showText(textIndex);
    textIndex++;
}, 1000);

function showText(n) {
    let i = n;
    let texts = document.getElementsByClassName("intro");
    texts[i].style.display = "block";
}


