var humSpans = document.querySelectorAll("#main-hum span");
var mainMenuBtn = document.getElementById("main-hum");
var menuBg = document.getElementById("menu-bg");
var rightMneu = document.getElementById("rightside-menu");
var mainMenu = document.getElementById("main-menu");
var visiable = false;
mainMenuBtn.addEventListener("click",vis);
function vis(){
    if(visiable===false){
        visiable = true;
        mainMenu.classList.add("cross-menu");
        menuBg.classList.add("colored-menu-bg");
        rightMneu.classList.remove("hidden-menu");
    }else{
        visiable = false;
        mainMenu.classList.remove("cross-menu");
        menuBg.classList.remove("colored-menu-bg");
        rightMneu.classList.add("hidden-menu");
    }
}