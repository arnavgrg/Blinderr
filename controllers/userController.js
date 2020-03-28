const User = require('../models/user.model')

exports.listAllUsers = function(req, res, next) {
    //Returns all the users
    User.find({},function (err, docs) {
        if (err) {
            return next(err);
        }
        res.send(docs);
    })
}

exports.getUserById = function(req, res) {
    //Returns user by mongo id
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        res.send(user);
    })
}

exports.insertNewUser = function(req, res, next) {
    //insert a new user into mongo users table
    let user = new User(
        {
            name: req.body.name,
		    email: req.body.email,
		    height: req.body.height,
		    age: req.body.age,
		    sexuality: req.body.sexuality,
		    gender: req.body.gender,
		    bio: req.body.bio,
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })

 //res.send('respond with a resource');
}