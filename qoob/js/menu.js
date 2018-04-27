var humSpans = document.querySelectorAll("#main-hum span");
var mainMenuBtn = document.getElementById("main-hum");
var menuBg = document.getElementById("menu-bg");
var rightMneu = document.getElementById("rightside-menu");
var visiable = false;
mainMenuBtn.addEventListener("click",vis);
function vis(){
    if(visiable===false){
        visiable = true;
        humSpans[1].style.transition = "all .3s";
        humSpans[2].style.transition = "all .3s";
        humSpans[0].style.transition = "all .3s";
        humSpans[1].style.transform="rotate(45deg)";
        humSpans[1].style.width = "28px";
        humSpans[2].style.top="8px";
        humSpans[2].style.transform="rotate(-45deg)";
        humSpans[0].style.opacity = "0.0";
        menuBg.classList.add("colored-menu-bg");
        rightMneu.classList.remove("hidden-menu");
    }else{
        visiable = false;
        humSpans[1].style.transform="rotate(0deg)";
        humSpans[1].style.width = "24px";
        humSpans[2].style.top="16px";
        humSpans[2].style.transform="rotate(0deg)";
        humSpans[0].style.opacity = "1.0";
        menuBg.classList.remove("colored-menu-bg");
        rightMneu.classList.add("hidden-menu");
    }
}