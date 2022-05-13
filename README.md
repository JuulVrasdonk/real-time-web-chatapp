# Building a moodboard

## About
Tijdens real-time-web wilde ik een real-time moodboard app maken. In deze app moeten gebruikers samen foto's op een canvas kunnen invoegen en annotaties kunnen schrijven.

## Conceptualisation
![alt text](https://github.com/JuulVrasdonk/real-time-web-moodboard/blob/main/public/assets/Conceptualisation.jpg)

## Data model
![alt text](https://github.com/JuulVrasdonk/real-time-web-moodboard/blob/main/public/assets/data-model.png)
In dit data model laat ik zien dat de data van de user interactie met het canvas via sockets wordt doorgestuurd. Vervolgens wordt het canvas van de andere users geupdate. 

## Install
```
https://github.com/JuulVrasdonk/real-time-web-moodboard
```

## Sockets
Ik gebruik twee socket functies. Een om de tekeningen door te sturen en een om de unsplash images door te sturen. 

### Tekenen op het canvas
De client merkt dat er wordt getekend...
```js
if(mouseIsPressed === true && penBtn.classList.contains('active')) {
        stroke(000);
        line(data.x , data.y , data.pX, data.pY);
        lineData.push(data)
        socket.emit('mouse', data)
        localStorage.setItem('drawing', JSON.stringify(lineData))
}
```
De client stuurt de mouse-data door naar de server...

```js
socket.on('mouse', (data) =>  {
    socket.broadcast.emit('mouse', data);
  })
```
De server stuurt de mouse-data weer door naar alle users die verbonden zijn...
```js
socket.on('mouse', (data) =>  {
        stroke(000);
        line(data.x , data.y , data.pX, data.pY);
});
```
En als laatste wordt de data op het canvas van alle andere gebruikers getekend.

### Images op het canvas
De gebruiker klikt op een resultaat uit de Unsplash API. En het resultaat wordt op het canvas getekend...
```js
img.onload = () => {
         let scaledWidth = img.width / 10
         let scaledHeight = img.height / 10
         context.drawImage(img, imgPositionX, imgPositionY, scaledWidth, scaledHeight)
         socket.emit('image', source)
         mouseOverImages(scaledWidth, scaledHeight)
}
```
De client stuurt de source van de Unsplash foto naar de server...
```js
socket.on('image', (source) =>  {
    socket.broadcast.emit('image', source);
})
```
De server stuurt de source door naar alle andere verbonden gebruikers...
```js
socket.on('image', (source) =>  {
    const regularSize = source.slice(0, -3) + 1080
    const img = new Image();

    img.src = regularSize
    img.onload = () => {
        context.drawImage(img, imgPositionX, imgPositionY, img.width / 10, img.height / 10)
    }
});
```
En als laatste wordt een new Image aangemaakt waarin de source bij alle verbonden gebruikers wordt meegeven.


## External data source
Als external data source heb ik gebruik gemaakt van [de Unsplash API](https://unsplash.com/developers) zodat de gebruikers makkelijk en snel afbeeldingen op kunnen zoeken en vervolgens in het canvas in kunnen laden. 

### Verschillende formaten 
De api geeft in haar response op een zoekterm meerdere afbeeldingen. Deze afbeeldingen worden ook in verschillende formaten aangeboden. Ik gebruik in mijn 'zoek-widget' kleine formaten en render vervolgens grotere afbeeldingen naar het canvas. Dit doe ik om pixeligge afbeeldingen op het canvas te voorkomen. 






