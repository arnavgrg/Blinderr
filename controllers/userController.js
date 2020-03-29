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

exports.deleteUserById = function(req, res) {
    //delete user by mongo id
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        res.send('Deleted successfully!');
    })
}

exports.updateUserById = function(req, res) {

    //update user by mongo id
    User.findByIdAndUpdate(req.params.id, 
    	{$set: req.body}, 
    	function (err, product) {
        	if (err) return next(err);
        res.send('User updated.');
    });
}

exports.addMatchById = function(req, res) {
    //add match to array
	//console.log(req.body.matches);
    //console.log(req.body);
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        user.matches.addToSet(req.body.matches);
        user.save();
        res.send(user);
    })
}

exports.addLikeById = function(req, res) {
    console.log(req.body);
    currentUserId = req.params.id
    console.log(currentUserId);
    //add like to array
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        user.likes.addToSet(req.body.likes);
        user.save();
        //res.send(user);
    });

    //If likes are mutual, add match to both
    User.find({ "_id": req.body.likes, "likes": currentUserId}, function (err, likedUserIfMatch) {
        if (err) {
            return next(err);
        }
        
        if (!likedUserIfMatch.length || !likedUserIfMatch) {
            //no user returned, no like, save it
            res.send('Saved like');
        }
        else {
            //update other person
            console.log(likedUserIfMatch);
            //there is a match

            User.findById(currentUserId, function (err, user) {
                if (err) {
                    return next(err);
                }
                    user.matches.addToSet(req.body.likes);
                    user.save();
                
            })
            //the other user add to matches
            User.findById(req.body.likes, function (err, user) {
                if (err) {
                    return next(err);
                }
                user.matches.addToSet(currentUserId);
                user.save();
            });
            res.send('Matched');
        }
    });

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
		    matches: [],
            likes: []
        }
    );

    user.save(function (err, insertedUser) {
        if (err) {
            return next(err);
        }
        //return the id of user just made
        res.send(insertedUser.id)
    })

 //res.send('respond with a resource');
}