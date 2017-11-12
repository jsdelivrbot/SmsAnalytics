var mongoose = require('mongoose');
var mongodbURL = 'mongodb://sms:smsdata@ds259245.mlab.com:59245/sms-analytics';
var mongodbOptions = {};
mongoose.Promise = require('bluebird');

// MongoDB connection
mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
    if (err) {
        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + mongodbURL);
    }
});

// Instantiate Schema
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

// SMS schema
var Sms = new Schema({
    id: { type: Number },
    address: { type: String },
    date: { type: Number },
    date_sent: { type: Number },
    body: { type: String },
    service_center: { type: String },
    seen: { type: Number }
});

// Define Models
var smsModel = mongoose.model('Sms', Sms);

// Export Models
exports.smsModel = smsModel;
