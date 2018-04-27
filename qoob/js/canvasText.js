var canvas = document.getElementById("menu-logo");
var ctx = canvas.getContext('2d'),
    fontBase = 1000,
    fontSize = 82;

function update(element, stage, txt) {
    element.width = window.innerWidth;
    element.height = window.innerHeight;
    stage.font = getFont(element);
    stage.textBaseline = 'top';
    // Create gradient
    stage.fillStyle = '#efefef';
    stage.fillText(txt, 10, 10);
}

update(canvas, ctx, 'MENU');
//update();
var resizeHandler = function(){
    update(canvas, ctx, 'MENU');
};
window.onresize = resizeHandler;

function getFont(stage) {
    var ratio = fontSize / fontBase;
    var size = stage.width * ratio;

    return (size|0) + 'px bold Acrom-bold';
}