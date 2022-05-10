let socket = io()
let canvas
const results = document.querySelectorAll('.results li img')
let source
let context
const penBtn = document.querySelector('.pen');
let imgPositionX = 143
let imgPositionY = 154
let data

function setup() {
    createCanvas(710, 400);
    background(230, 0);
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    socket.on('mouse', (data) =>  {
        stroke(000);
        line(data.x , data.y , data.pX, data.pY);
    });
}

function draw() {
    data = {
        x: mouseX,
        y: mouseY,
        pX: pmouseX,
        pY: pmouseY,
    }
    
    if(mouseIsPressed === true && penBtn.classList.contains('active')) {
        stroke(000);
        line(data.x , data.y , data.pX, data.pY);
        socket.emit('mouse', data)
    }
}



penBtn.addEventListener('click', () => {
    if(penBtn.classList.contains('active')) {
        penBtn.classList.remove('active')
    } else {
        penBtn.classList.add('active')
    }
})

results.forEach(result => {
    result.addEventListener('click', () => {
        const source = result.src
        const regularSize = source.slice(0, -3) + 1080
        const img = new Image();
        
        img.src = regularSize
        img.onload = () => {
            let scaledWidth = img.width / 10
            let scaledHeight = img.height / 10
            context.drawImage(img, imgPositionX, imgPositionY, scaledWidth, scaledHeight)
            socket.emit('image', source)
            mouseOverImages(scaledWidth, scaledHeight)
        }
    })
})

function mouseOverImages(scaledWidth, scaledHeight) {
    const surfaceX = imgPositionX + scaledWidth
    const surfaceY = imgPositionY + scaledHeight

    canvas.addEventListener('mousemove', (e) => {
        if(imgPositionX < data.x && surfaceX > data.x && imgPositionY < data.y && surfaceY > data.y) {
            
        }
    })
}


socket.on('image', (source) =>  {
    const regularSize = source.slice(0, -3) + 1080
    const img = new Image();

    img.src = regularSize
    img.onload = () => {
        context.drawImage(img, imgPositionX, imgPositionY, img.width / 10, img.height / 10)
    }
});