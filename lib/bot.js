'use strict';
BOT_ID="e8d4da3668f2fd81f2219c7d3d";
let date = require('date-and-time');
const https = require('https');

var list=["Abanoub Zaher's Patrol", "Abakir Hanna's Patrol", "Martin Soliman Patrol", "Martina Soliman Patrol", "Elizabeth Hanna's Patrol"];

var patrol = 4;
var check = 0;
function checkTime(){
    let now = new Date();
    if (check == 1){
        if(patrol == 4){
            patrol = 0;
            check = 0;
        }else{
            patrol+=1;
            check = 0;
        }
    }
    if(now.getDay() == 1 && now.getHours() == 16 && now.getMinutes() == 0 && now.getSeconds() == 0){
        check++;
        return Bot.sendMessage("It is " + list[patrol] + " turn to usher this sunday!");
    }else if(now.getDay() ==  5 && now.getHours() == 21 && now.getMinutes() == 0 && now.getSeconds() == 0){
        check++;
        return Bot.sendMessage("It is " + list[patrol] + " turn to usher this sunday!");
    }
}
class Bot {
    /**
     * Called when the bot receives a message.
     *
     * @static
     * @param {Object} message The message data incoming from GroupMe
     * @return {string}
     */
    static checkMessage(message) {  
        const messageText = message.text;
        // Learn about regular expressions in JavaScript: https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_Expressions
        const botRegex = /start*/;
        
        // Check if the GroupMe message has content and if the regex pattern is true
        if (messageText && botRegex.test(messageText)) {
            // Check is successful, return a message!
            setInterval(checkTime,1000)
        }
    };

    /**
     * Sends a message to GroupMe with a POST request.
     *
     * @static
     * @param {string} messageText A message to send to chat
     * @return {undefined}
     */
    static sendMessage(messageText) {
        // Get the GroupMe bot id saved in `.env`
        const botId = process.env.BOT_ID;

        const options = {
            hostname: 'api.groupme.com',
            path: '/v3/bots/post',
            method: 'POST'
        };

        const body = {
            bot_id: botId,
            text: messageText
        };

        // Make the POST request to GroupMe with the http module
        const botRequest = https.request(options, function(response) {
            if (response.statusCode !== 202) {
                console.log('Rejecting bad status code ' + response.statusCode);
            }
        });

        // On error
        botRequest.on('error', function(error) {
            console.log('Error posting message ' + JSON.stringify(error));
        });

        // On timeout
        botRequest.on('timeout', function(error) {
            console.log('Timeout posting message ' + JSON.stringify(error));
        });

        // Finally, send the body to GroupMe as a string
        botRequest.end(JSON.stringify(body));
    };
};

module.exports = Bot;
