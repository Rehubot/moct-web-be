const {Event, validateEvent} = require('../models/event');
const {Lookup, validateLookup} = require('../models/lookup');

exports.getEvent =async (req, res) => {
    const event = await Event.find().sort('description');
    res.send(event);
};

exports.createEvent =async (req, res) => {
    const { error } = validateEvent(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const location= await Lookup.findById(req.body.locationId);
    if(!location) return res.status(400).send('Invalid Location');

    let event = new Event({ 
        description: req.body.description,
        location:location,
        eventyear:req.body.eventyear 
    });
    event = await event.save();
    
    res.send(event);
};
exports.updateEvent = async (req, res) => {
    const { error } = validateEvent(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const location= await Lookup.findById(req.body.locationId);
    if(!location) return res.status(400).send('Invalid Location');

    const event = await Event.findByIdAndUpdate(req.params.id, { 
        description: req.body.description,
        location:location,
        eventyear:req.body.eventyear
    }, {
      new: true
    });
  
    if (!event) return res.status(404).send('The Event with the given ID was not found.');
    
    res.send(event);
};


exports.deleteEvent =async (req, res) => {
    const event = await Event.findByIdAndRemove(req.params.id);
  
    if (!event) return res.status(404).send('The Event with the given ID was not found.');
  
    res.send(event);
};