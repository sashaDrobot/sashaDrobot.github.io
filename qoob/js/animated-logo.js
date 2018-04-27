var logo = document.getElementById("qoob-animated-logo");
logo.addEventListener('mouseover',showVideo);
logo.addEventListener('mouseout',hideVideo);

var circleSvg = document.querySelector("#circle-svg>circle");
circleSvg.setAttribute("r", 840);

function anim(from,to,reverse) {
    var step;
    var lastSize;
    var aimationInt;
    if(reverse!==true){
        step = (to-from)/30;
        lastSize = from+step;
        aimationInt = setInterval(function () {
            circleSvg.setAttribute("r",lastSize);
            lastSize+=step;
            if(lastSize>=to){
                clearInterval(aimationInt);
            }
        },10);
    }else {
        step = (from-to)/30;
         lastSize = from-step;
         aimationInt = setInterval(function () {
            circleSvg.setAttribute("r",lastSize);
            lastSize-=step;
            if(lastSize<=to){
                clearInterval(aimationInt);
            }
        },20);
    }

}
function showVideo() {
   anim(840,2253);
}
function hideVideo() {
    anim(2253,840,true);
}