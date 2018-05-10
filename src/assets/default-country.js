const getJSON = require('get-json');

const getCountry = function e() {
  return new Promise((resolve, reject) => {
    getJSON('https://ipinfo.io/json', (error, response) => {
      if (error) {
        reject(error);
      }
      resolve(response.country);
    });
  });
};

export default getCountry;
