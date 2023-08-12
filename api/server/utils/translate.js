import Config from "./config";

const apikey = Config.get('google-translate').get('apikey');
const options = {
  concurrentLimit: Config.get('google-translate').get('concurrentLimit'),
};

const translate = require('google-translate');