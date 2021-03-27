const axios = require('axios');

exports.SendData = function (webhookUrl,authKey,data,done)
{
    let config = {
      method: 'post',
      url: webhookUrl,
      headers: { 
        'Content-Type': 'application/json',
        'token':authKey
      },
      data : data
    };

    axios(config)
    .then(function (response)
    {
        done(false, JSON.stringify(response.data))
    })
    .catch(function (error) 
    {
        done(error)
    });
};