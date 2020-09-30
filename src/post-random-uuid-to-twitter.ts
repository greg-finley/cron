import { v4 as uuidv4 } from 'uuid';
import Twitter from 'twitter';
require('dotenv').config()

async function main() {
    const uuid = uuidv4();
    const client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY as string,
        consumer_secret: process.env.CONSUMER_SECRET as string,
        access_token_key: process.env.ACCESS_TOKEN_KEY as string,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET as string
      });

      client.post('statuses/update', {status: uuid},  function(error) {
        if(error) throw error;
      });

}

main().then(() => console.log('Done'))
