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

exports.deleteRoomById = function(req, res) {
    Room.findByIdAndRemove(req.params.roomId, function (err, room) {
        if (err) {
            return next(err);
        }

        //Need to also put these people back into the events
        //Find the event linked to this room
        //update people array


        res.send('Deleted successfully!');
    })
}

exports.insertRoom = function(req, res, next) {
    let room = new Room(
        {
            p1: req.body.p1,
            p2: req.body.p2,
            eventName: "MAINEVENT"
        }
    );

    room.save(function (err, room) {
        if (err) {
            return next(err);
        }
        //return the id of user just made
        res.send(room.id)
    })
    
}