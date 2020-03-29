const Room = require('../models/room.model')
const Event = require('../models/event.model')

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
    //Need to also put these people back into the event
    //Find the event linked to this room
    //update people array
    var first = null;
    var second = null;

    var query = getRoomQuery(req.params.id);

    query.then(function(room){
        console.log(query);
        first = room.p1;
        second = room.p2;
        console.log("inside");
        console.log(first);
        console.log(second);

        var mainEvent = getEventQuery("MAINEVENT");
        mainEvent.then(function(event){
            console.log(mainEvent);

        })

    });

    /*Room.findByIdAndRemove(req.params.roomId, function (err, room) {
        if (err) {
            return next(err);
        }

        res.send('Deleted successfully!');
    })*/
}

function getRoomQuery(id){
   var query = Room.findById(id, function (err, user) {
    }).exec();
   return query;
}

function getEventQuery(name, per1, per2){
    //add people onto it
   var update = {p1:per1, p2:per2};
   var query = Event.findOne({name:name}, function (err) {
    }).exec();
   return query;
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