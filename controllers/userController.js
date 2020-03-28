const User = require('../models/user.model')

exports.index = function(req, res, next) {
    let user = new User(
        {
            name: "hi ss",
            address: "123 address"
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })

 //res.send('respond with a resource');
}