const mongoose = require("mongoose");

const integrationsSchema = new mongoose.Schema({
    owner:{
       type: String,
       require: true, 
    },
    business:{
        type: String,
        require: true, 
    }, 
    integrationType:{
        type: String,
        default : 1, 
        require: true, 
    },
    webhookUrl: {
        type:String,
        reuired: null,
    },
    authKey: {
        type:String,
        required: true,
    },
    expiryDate : {
        type: Number,
        default: null,
    },
    registeredOn:{
        type:Number,
        default:null,
    },
    updatedOn:{
        type:Number,
        default:null,
    }
});

module.exports = mongoose.model("integrations", integrationsSchema);