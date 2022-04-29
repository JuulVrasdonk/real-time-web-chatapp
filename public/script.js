let socket = io()
let canvas
let eraseEnable = false

function setup() {
    createCanvas(710, 400);
    background(230, 0);

    socket.on('mouse', (data) =>  {
        stroke(000);
        line(data.x , data.y , data.pX, data.pY);
    });
}
  
function draw() {
    let data = {
        x: mouseX,
        y: mouseY,
        pX: pmouseX,
        pY: pmouseY,
    }


    if(mouseIsPressed === true) {
        stroke(000);
        line(data.x , data.y , data.pX, data.pY);
        socket.emit('mouse', data)
    }
}
  
