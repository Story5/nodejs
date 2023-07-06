const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

const game = require('./game');

let playerWon = 0;

let playerLastAction = null;
let sameCount = 0;

http
    .createServer(function (request, response) {
        const parseUrl = url.parse(request.url);
        if (parseUrl.pathname == '/favicon.ico') {
            response.writeHead(200);
            response.end();
            return;
        }

        if (parseUrl.pathname == '/game') {
            const query = querystring.parse(parseUrl.query);
            if (playerWon >= 3 || sameCount == 9) {
                response.writeHead(500)
                response.end('我再也不和你玩了');
                return;
            }

            const playerAction = query.action;

            const gameResult = game(playerAction);
            if (playerLastAction && playerAction == playerLastAction) {
                sameCount++;
            } else {
                sameCount = 0;
            }
            playerLastAction = playerAction;

            if (sameCount >= 3) {
                response.writeHead(400)
                response.end('你作弊!');
                sameCount = 9;
                return;
            }


            response.writeHead(200);
            if (gameResult == 0) {
                response.end('平局!');
            } else if (gameResult == 1) {
                response.end('你赢了');
                playerWon++;
            }
            else {
                response.end('你输了');

            }
        }

        if (parseUrl.pathname == '/') {
            fs.createReadStream(__dirname + '/index.html')
                .pipe(response)
        }

    }).listen(3000)