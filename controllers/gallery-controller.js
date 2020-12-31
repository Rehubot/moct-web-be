const { now } = require('lodash');
const {Gallery, validateGallery} = require('../models/gallery');
const {GalleryCategory, validateGalleryCategory} = require('../models/gallery_category');
const {Lookup,validateLookup} = require('../models/lookup');
const {Event,validateEvent} = require('../models/event');
const APIFeatures = require('./../utils/APIFeatures');

exports.getGallery =async (req, res) => {
    const gallery = await Gallery.find().sort('description');
    res.send(gallery);
};

exports.createGallery =async (req, res) => {
    const { error } = validateGallery(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const category= await GalleryCategory.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category');
  

    const type= await Lookup.findById(req.body.typeId);
    if(!type) return res.status(400).send('Invalid Type');

    const location= await Lookup.findById(req.body.location);
    if(!location) return res.status(400).send('Invalid Location');

    const eventType= await Event.findById(req.body.eventType);
    if(!eventType) return res.status(400).send('Invalid Event Type');



    let gallery = new Gallery({ 
        description: req.body.description,
        fileurl:req.body.fileurl,
        type:type,
        eventType:req.body.eventType,
        location:location,
        istangible:req.body.istangible,
        tags:req.body.tags,
        category:req.body.category,
        capturedYear:req.body.capturedYear,
        caption:req.body.caption,
        status:req.body.status,
    });
    gallery = await gallery.save();
    
    res.send(gallery);
};
exports.updateLike = async(req,res)=>{
  const gallery = await Gallery.findByIdAndUpdate(req.params.id, { 
    $inc : {likes : 1}
  }, {
    new: true
  });

  if (!gallery) return res.status(404).send('The Gallery with the given ID was not found.');
  
  res.send(gallery);
}
exports.updateView = async(req,res)=>{
  const gallery = await Gallery.findByIdAndUpdate(req.params.id, { 
    $inc : {views : 1}
  }, {
    new: true
  });

  if (!gallery) return res.status(404).send('The Gallery with the given ID was not found.');
  
  res.send(gallery);
}
exports.updateGallery = async (req, res) => {
    const { error } = validateGallery(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const category= await GalleryCategory.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category');
  

    const type= await Lookup.findById(req.body.typeId);
    if(!type) return res.status(400).send('Invalid Type');

    const location= await Lookup.findById(req.body.location);
    if(!location) return res.status(400).send('Invalid Location');

    const eventType= await Event.findById(req.body.eventType);
    if(!eventType) return res.status(400).send('Invalid Event Type');
    
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, { 
      description: req.body.description,
      fileurl:req.body.fileurl,
      type:type,
      eventType:req.body.eventType,
      location:location,
      istangible:req.body.istangible,
      tags:req.body.tags,
      category:req.body.category,
      capturedYear:req.body.capturedYear,
      caption:req.body.caption,
      status:req.body.status,
    }, {
      new: true
    });
  
    if (!gallery) return res.status(404).send('The Gallery with the given ID was not found.');
    
    res.send(gallery);
};


exports.deleteGallery =async (req, res) => {
    const gallery = await Gallery.findByIdAndRemove(req.params.id);
  
    if (!gallery) return res.status(404).send('The Gallery  with the given ID was not found.');
  
    res.send(gallery);
};

exports.getGalleryByCategory = async (req, res) => {
    const gallery= await Gallery.find(req.params.category).select({ });
  
    if (!gallery) return res.status(404).send('The Gallery with the given ID was not found.');
  
    res.send(gallery);

};

exports.getGalleryById = async (req, res) => {
    const gallery= await Gallery.findById(req.params.id).select({ });
  
    if (!gallery) return res.status(404).send('The Gallery with the given ID was not found.');
  
    res.send(gallery);

};

exports.getGalleries = async (req, res) => {
  
   const apiFeatures = new APIFeatures(Gallery.find().populate('category eventType'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const galleries = await apiFeatures.query;
  if (!galleries) return res.status(404).send('No gallery(s) found with the provided data.');
  
  res.status(200).send(galleries);
};