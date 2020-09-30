const { v4: uuidv4 } = require('uuid');
const Twitter = require('twitter');
require('dotenv').config()

async function main() {
    const uuid = uuidv4();
    const client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      });

      client.post('statuses/update', {status: uuid},  function(error) {
        if(error) throw error;
      });

}

main().then(() => console.log('Done'))
