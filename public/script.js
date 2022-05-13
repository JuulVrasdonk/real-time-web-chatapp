let socket = io()
let canvas
const results = document.querySelectorAll('.results li img')
let source
let context
const penBtn = document.querySelector('.pen');
let imgPositionX = 0
let imgPositionY = 0
let data
let lineData = []
let loadedImages = []
let img
var x;
var y;



function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(230, 0);
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    socket.on('mouse', (data) =>  {
        stroke(000);
        line(data.x , data.y , data.pX, data.pY);
    });

    const rawImageData = localStorage.getItem('images');
    const savedImageData = JSON.parse(rawImageData)
    console.log(savedImageData);
    if(savedImageData) {
        savedImageData.forEach(image => {
            const img = new Image();
    
            img.src = image
    
            let scaledWidth = img.width / 10
            let scaledHeight = img.height / 10
            context.drawImage(img, imgPositionX, imgPositionY, scaledWidth, scaledHeight)
            mouseOverImages(scaledWidth, scaledHeight)
        })
    }

    const rawDrawing = localStorage.getItem('drawing');
    const savedLineData = JSON.parse(rawDrawing)

    if(savedLineData){
        savedLineData.forEach(point => {
            lineData.push(point)
            line(point.x, point.y, point.pX, point.pY)
        })
    }
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
        lineData.push(data)
        socket.emit('mouse', data)
        localStorage.setItem('drawing', JSON.stringify(lineData))
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
        
        // img.src = regularSize
        loadedImages.push(regularSize)

        localStorage.setItem('images', JSON.stringify(loadedImages));
        loadedImages.forEach( image => {

            img.src = image

            img.onload = () => {
                let scaledWidth = img.width / 10
                let scaledHeight = img.height / 10
                context.drawImage(img, imgPositionX, imgPositionY, scaledWidth, scaledHeight)
                socket.emit('image', source)
                mouseOverImages(scaledWidth, scaledHeight)
            }
        })
        
    })
})

function mouseOverImages(scaledWidth, scaledHeight) {
    const surfaceX = imgPositionX + scaledWidth
    const surfaceY = imgPositionY + scaledHeight

    canvas.addEventListener('mousemove', (e) => {
        if(imgPositionX < data.x && surfaceX > data.x && imgPositionY < data.y && surfaceY > data.y) {
            console.log('mouse over');
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

let clearStorage = document.querySelector('.clear')
clearStorage.addEventListener('click', () => {
    window.localStorage.clear();
    location.reload()
})