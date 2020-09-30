const axios = require('axios');
const memjs = require('memjs');
const Twitter = require('twitter');
require('dotenv').config()

async function main() {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${process.env.CITY_ID}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`).then((response) => response.data);
    const temp = Math.round(response.main.temp);

    if (temp === 64) {
      const memcachedClient = memjs.Client.create(process.env.MEMCACHEDCLOUD_SERVERS, {
        username: process.env.MEMCACHEDCLOUD_USERNAME,
        password: process.env.MEMCACHEDCLOUD_PASSWORD
      });
      const timeEpoch = response.dt;
      const time = new Date(timeEpoch*1000).toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
      const exists = await memcachedClient.get(timeEpoch.toString());

      console.log(exists)
      if (exists && exists.value) {
        console.log(`We already posted about ${time}`);
        memcachedClient.quit();
        return;
      }
      await memcachedClient.set(timeEpoch.toString(), 'foo', 2592000);
      memcachedClient.quit();

      const cityName = response.name;

      const twitterClient = new Twitter({
          consumer_key: process.env.WEATHER_CONSUMER_KEY,
          consumer_secret: process.env.WEATHER_CONSUMER_SECRET,
          access_token_key: process.env.WEATHER_ACCESS_TOKEN_KEY,
          access_token_secret: process.env.WEATHER_ACCESS_TOKEN_SECRET
        });

      const status = `It's ${temp}°F in ${cityName} as of ${time}`

      console.log(`Posting to Twitter: ${status}`)

      twitterClient.post('statuses/update', {status},  function(error) {
        if(error) throw error;
      });

    } else {
      console.log(`Oh shoot, temp was ${temp}`)
    }
}

main().then(() => console.log('Done'))
