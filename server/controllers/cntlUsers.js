'use strict';
const Step = require('step');

const { db_ops } = require('../dbUtils/dbConn_mongo');


module.exports = class UserController {
    constructor(_name) {
        this.name = _name;
        console.info(this.name + ' initialized');
    }

    getUserList(req, res, next) {
        let self = this;
        let statusCode = 400;

        Step(

            function _getUserList() {
                self.getData(this);
            },

            function _sendResponse(err, _resp) {
                if (err) {
                    console.error(err);
                    res.status(statusCode).send({
                        "status": false,
                        "message": 'Unable to retrive data!',
                        "error": err,
                        "response": null
                    });
                } else {
                    res.status(200).send({
                        "status": true,
                        "message": 'success',
                        "error": null,
                        "response": _resp
                    })
                }
            }
        );
    }

    addUser(req, res, next) {
        let self = this;
        let statusCode = 400;
        console.log('addUser ::::: ', req.body)
        if (req.body && req.body.full_name && req.body.id) {
            Step(

                function _findByName() {
                    self.findByName(req.body.full_name, this);
                },

                function _addUser(err, resp) {
                    if (err) {
                        throw 'Unable to retrive data!';
                    } else if (resp) {
                        console.log('resp :::: ', resp);
                        statusCode = 202;
                        throw 'Record already exist';
                    } else {
                        self.setData(req.body, this);
                    }

                },

                function _sendResponse(err, _resp) {
                    if (err) {
                        console.error(err);
                        res.status(statusCode).send({
                            "status": false,
                            "message": 'Unable to retrive data!',
                            "error": err,
                            "response": null
                        });
                    } else {
                        res.status(200).send({
                            "status": true,
                            "message": 'success',
                            "error": null,
                            "response": _resp
                        })
                    }
                }
            );
        } else {
            console.log('addUser :::::  else ')
            res.status(200).send({
                "status": false,
                "message": 'Required fileds are missing...',
                "error": null
            })
        }

    }

    async getData(cb) {
        db_ops.getData()
            .then(users => {
                return cb(null, users)
            }).catch(err => {
                return cb(err, null)
            })
    }

    async findByName(uName, cb) {
        try {
            let name = await db_ops.findByName(uName);
            return cb(null, name)
        } catch (err) {
            return cb(err, null)
        }
    }

    async setData(body, cb) {
        db_ops.setData(body)
            .then(user => {
                return cb(null, user)
            }).catch(err => {
                return cb(err, null)
            })
    }
};