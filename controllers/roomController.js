const Room = require('../models/room.model')

exports.ifUserInRoom = function(req, res, next) {
    Room.find({$or: [{"p1": req.params.userToCheck}, {"p2": req.params.userToCheck}]}, function (err, room) {
        if (err) {
            return next(err);
        }
        
        if (!room.length || !room) {
            // no room returned
            //console.log("no");
            res.send("False");
        }
        else {
            console.log(room);
            res.send(room);
        }
    })
    
}