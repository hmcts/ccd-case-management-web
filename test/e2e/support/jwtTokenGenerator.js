'use strict';

const idam_api_url = process.env.idam_api_url  || 'http://betadevaccidamapplb.reform.hmcts.net:4501';
//const idam_api_url = process.env.idam_api_url  || 'http://localhost:4501';
const rp = require('request-promise');

class JwtTokenGenerator {

  generateJwtToken(username, password) {
    const auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
    let endpoint = '/login';
    let data;

    const options = {
      method: 'POST',
      uri: idam_api_url + endpoint,
      headers: {
        'Accept': 'application/json',
        'Authorization': auth
      },
      json: true
    };

    return rp(options)
      .then(function (data) {
        console.log(data['access-token']);
        return data['access-token'];
        done();
      }).catch(function (err) {
        console.error('Error in calling: '+ err);
      });
  }

}

module.exports = JwtTokenGenerator;
