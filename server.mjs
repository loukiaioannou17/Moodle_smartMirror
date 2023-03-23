import express from 'express'
import http from 'http'
import path from 'path'
import {WebSocketServer} from 'ws'
import {fileURLToPath} from 'url'
import {Gpio} from 'onoff'
import Mfrc522 from 'mfrc522-rpi'
import SoftSPI from 'rpi-softspi/lib/rpi-softspi.min.js'


const currentFolder = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const server = http.Server(app)

const wss = new WebSocketServer({ server: server, path: '/ws', clientTracking: true })

const green = new Gpio(2,'in')
const blue = new Gpio(3,'in')
const red = new Gpio(4,'in')
const motion = new Gpio(14,'in')
const softSPI = new SoftSPI({ clock: 23, mosi: 19, miso: 21, client: 24});
const mfrc522 = new Mfrc522(softSPI).setResetPin(22).setBuzzerPin(18);

mfrc522.reset();

wss.on('connection', function(ws) {
  ws.on('message', function() {
    //console.log('Received: ', message)
    //ws.send('I heard: ' + message)
  })
})

setInterval(() => { broadcast() }, 100)

function broadcast() {
    for (const ws of wss.clients) {
        const valueBlue = blue.readSync()
        if(valueBlue == 0){
            //console.log("Blue" + valueBlue)
            ws.send('Blue')
        }
        const valueRed = red.readSync()    
        if(valueRed == 0){
            //console.log("Red" + valueRed)
            ws.send('Red')
        }
        const valueGreen = green.readSync()    
        if(valueGreen == 0){
            //console.log("Green" + valueGreen)
            ws.send('Green')
        }
        const valueMotion = motion.readSync()
        if(valueMotion == 1){
            //console.log('Moved')
            ws.send('Moved')
        }
        let response = mfrc522.findCard();
        if (!response.status) { return; }
        response = mfrc522.getUid();
        const uid = response.data;
        if(uid[0]!=0) {
            console.log(uid)
            ws.send("Access " + compareArrays(uid))
        }
    }
  }

  function compareArrays(response){
    var card1 = new Array (26,51,8,176,145)
    var card2 = new Array(128,195,148,161,118)
    if(Array.isArray(response)){                                                                                                                      
      if (JSON.stringify(card1).toString() === JSON.stringify(response).toString())
        return "Sandy"
      else if (JSON.stringify(card2).toString() === JSON.stringify(response).toString())
        return "Mark"
      else  
        return "Alex"
    }

  }

app.use(express.static('public'))

server.listen(3000, () => {
    console.log('Listening at http://localhost:3000/')
})