const {Schema, model} = require('mongoose')

const user = new Schema({
    email: {type:String, required:true, unique: true},
    username: {type:String, required:true, unique: true},
    password: {type: String, required: true},
    created: {type: Date, default: Date.now()},
    isActivated: {type:Boolean, default: false}
})

module.exports = model('User', user)