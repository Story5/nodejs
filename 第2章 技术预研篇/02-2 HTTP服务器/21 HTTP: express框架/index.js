const express = require('express');
const fs = require('fs');

const game = require('./game');

let playerWon = 0;

let playerLastAction = null;
let sameCount = 0;

const app = express();


app.get('/favicon.ico', function (request, response) {
    response.status(200);
    return;
})


app.get('/game',
    function (request, response, next) {
        if (playerWon >= 3 || sameCount == 9) {
            response.status(500)
            response.send('我再也不和你玩了');
            return;
        }
        next();

        if (response.playerWon) {
            playerWon++;
        }
    },
    function (request, response, next) {
        const query = request.query;


        if (sameCount >= 3) {
            response.status(400);
            response.send('你作弊!我再也不玩了');
            sameCount = 9;
            return;
        }

        const playerAction = query.action;

        if (playerLastAction && playerAction == playerLastAction) {
            sameCount++;
        } else {
            sameCount = 0;
        }
        playerLastAction = playerAction;



        response.playerAction = playerAction;
        next();
    },
    function (request, response) {
        const playerAction = response.playerAction;

        const gameResult = game(playerAction);
        setTimeout(() => {
            response.status(200);
            if (gameResult == 0) {
                response.send('平局!');
            } else if (gameResult == 1) {
                response.send('你赢了');
                response.playerWon = true;
            }
            else {
                response.send('你输了');
            }
        }, 500);

    }

)

app.get('/', function (request, response) {
    response.send(
        fs.readFileSync(__dirname + '/index.html', 'utf-8')
    )
})


app.listen(3000);