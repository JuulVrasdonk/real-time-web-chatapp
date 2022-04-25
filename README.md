# Building a moodboard

## About


## Conceptualisation
![alt text](https://github.com/JuulVrasdonk/real-time-web-moodboard/blob/main/assets/Conceptualisation.pdf)


## API Docs
Vind hier meer informatie over de [Rijks-API](https://data.rijksmuseum.nl/object-metadata/api/)

## Acticity Diagram 
![alt text](https://github.com/JuulVrasdonk/PWA/blob/main/public/assets/readme%20-%20assets/Activity%20Diagram-PWA.jpg)

## Install

```
git clone https://github.com/JuulVrasdonk/PWA
```

## Server side
Alle routes uit de activity diagram worden op de server gerenderd. Als er data in een route nodig is wordt dit ook op de server gerenderd.
Dit zorgt voor een snellere gebruikerservaring. Ook worden er in mijn server performance optimalisaties uitgevoerd, voor een nog snellere 
gebruikerservaring. 

## Client side
Op mijn clientside gebeurt niet veel. Er wordt via een mijn client-side een focus state geladen of geannuleerd. In het ```UI.js```-bestand. 
Ook wordt mijn service-worker geregistreerd. En in mijn service-worker wordt ```offline.ejs``` gecached zodat het offline getoond kan worden. 

## Mijn wiki 🌈
Kijk voor mijn meer informatie over mijn proces en code op [mijn wiki](https://github.com/JuulVrasdonk/PWA/wiki).



