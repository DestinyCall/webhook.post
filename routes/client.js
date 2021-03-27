'use strict';
const router = require('express').Router();
const _ = require("lodash");

const db = require('../models');
//const auth = require('../auth');
const Hook = require('../service');

router.get('/clients/:ownerId', (req, res, next) => 
{
    let owner = req.params.ownerId;    
    if(owner)
    {
      db.Integrations.find({owner:owner})      
      .then((clients) => res.json(clients))
      .catch((err) => res.status(400).json(err))
    }
    else
    {
        res.status(400).json("Please provide a business owner id");
    }
});

router.post('/register', (req, res, next) => 
{
    let body = _.pick(req.body, [
             "owner",
             "business",             
             "webhookUrl",             
             "authKey"             
           ]);
    body.expiryDate = new Date().setFullYear(new Date().getFullYear() + 1);
    body.registeredOn = new Date().getTime();

    let checkClientAlreadyRegistered = new Promise((resolve, reject) => {
        db.Integrations.findOne({owner: body.owner,business:body.business,webhookUrl:body.webhookUrl}).then((client) => {
        if (client) {
            let errAlreadyRegistered ={status: "error",message: "Client already registered!"}            
            reject(errAlreadyRegistered);
        } else resolve();
        });
    });
    
    Promise.all([checkClientAlreadyRegistered])
    .then(() => {
        let client = new db.Integrations(body);        
        client
        .save()
        .then((client) => res.json(client))
        .catch((e) =>
        {
          if (e.name === "MongoError" && e.code === 11000)
          {
            let invaliData={status: "error",message: "Invalid registraion data!",errorDetail: e.message};
            return res.status(400).json(invaliData);
          }          
          res.status(400).json(e);
        });
    })
    .catch((err) => {     
          res.status(400).json(err);
    });    
});

router.post('/postDataToWebhook/:businessId', (req, res, next) => 
{
    let business = req.params.businessId;
    const data = JSON.stringify(req.body);
   
    if(business)
    {
      db.Integrations.findOne({business:business})      
      .then((client) => {
          Hook.HookService.SendData(client.webhookUrl,client.authKey,data, (error, response) =>
          {
                if(error) { res.send(error.message) }
                else { res.send(response) }
          })
      })
      .catch((err) => res.status(400).json(err))
    }
    else
    {
        res.status(400).json("Please provide a business id");
    }        
});

module.exports = router;