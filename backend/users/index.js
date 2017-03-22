var _ = require('underscore')
var data = require('./data')
var errors = {
    404: 'User not found',
    500: 'Anything was wrong'
}

function userController() {
    var self = this;
    var lastID = data.length;
    this.store = data

    var reqFields = ['login', 'name', 'password']
    var findByID = req => {
        return _.findWhere(self.store, {
            id: parseInt(req.params.id)
        })
    }

    this.get = (req, res, next) => {
        res.send(200, self.store)
        return next()
    }

    this.getByID = (req, res, next) => {
        var found = findByID(req);
        if (found) {
            res.send(200, found)
        } else {
            res.send(404, errors[404])
        }
        return next()
    }

    this.post = (req, res, next) => {
        if (!_.every(reqFields, field => {
                return !!req.body[field]
            })) {
            res.send(500, errors[500])
        } else {
            let newUser = {
                id: ++lastID,
                login: req.body.login,
                name: req.body.name,
                password: req.body.password,
            }
            self.store.push(newUser)
            res.send(201, newUser)
        }
        return next()
    }

    this.put = (req, res, next) => {
        var reqFields = _.without(reqFields, 'password')
        if (!_.every(reqFields, field => {
                return !!req.body[field]
            })) {
            res.send(500, 'Anything wrong')
        } else {
            var found = findByID(req);
            if (!found) {
                res.send(404, errors[404])
            } else {
                if(!req.body['password']){
                    delete req.body['password']
                }
                found = _.extend(found, _.pick(req.body, 'login', 'name', 'password'))
                res.send(200, found)
            }
        }
        return next()
    }

    this.patch = (req, res, next) => {
        var found = findByID(req);
        if (!found) {
            res.send(404, errors[404])
        } else {
            found = _.extend(found, _.pick(req.body, 'login', 'name', 'password'))
            res.send(200, found)

        }
        return next()
    }

    this.delete = (req, res, next) => {
        var found = findByID(req);
        if (!found) {
            res.send(404, errors[404])
        } else {
            self.store = _.without(self.store, found)
            res.send(200)
        }
        return next()
    }
}

module.exports = new userController();