var db = require('../database-config/mongodb.js');

exports.save = function (req, res) {
    var data = {};
    console.log(req.body);
    var questions = new db.smsModel(req.body);
    questions.save(function (err, success) {
        if (success) {
            console.log(success);
            data.status = 201;
            res.json(data);
        }
        else {
            console.log("failure", err);
            data.status = 403;
            res.json(data);
        }
    });
};

exports.get = function (req, res) {
    var data = {};
    db.smsModel.find({}, {}, function (err, success) {
        if (success) {
            console.log(success);
            data.sms = success;
            data.status = 201;
            res.json(data);
        } else {
            console.log("failure", err);
            data.status = 401;
            res.json(data);
        }
    }).sort({ _id: -1 });
};