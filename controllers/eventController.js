const Event = require('../models/event.model')

exports.listAllEvents = function(req, res, next) {
    //Returns all the users
    Event.find({},function (err, docs) {
        if (err) {
            return next(err);
        }
        res.send(docs);
    })
}

exports.getEventById = function(req, res) {
    //Returns user by mongo id
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            return next(err);
        }
        res.send(event);
    })
}

exports.deleteEventById = function(req, res) {
    //delete user by mongo id
    Event.findByIdAndRemove(req.params.id, function (err, event) {
        if (err) {
            return next(err);
        }
        res.send('Deleted successfully!');
    })
}

exports.insertNewEvent = function(req, res, next) {
    //insert a new user into mongo users table
    let event = new Event(
        {
            name: req.body.name,
            people: []
        }
    );

    event.save(function (err, insertedEvent) {
        if (err) {
            return next(err);
        }
        res.send(insertedEvent.id);
    }) 
}


exports.addPersonToEventById = function(req, res) {
    //add like to array
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            return next(err);
        }
        event.people.addToSet(req.body.userId);
        event.save();
        res.send("Added user to event");
    });

}


 //res.send('respond with a resource');