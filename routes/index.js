const express=require('express');
const asyncMiddleware=require('../middleware/async');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const authController=require('../controllers/auth-controller');
const userController=require('../controllers/user-controller');
const contactInfoController = require('../controllers/contactInfo-controller');
const galleryCategoryController = require('../controllers/gallery-category-conroller');
const galleryController = require('../controllers/gallery-controller');
const lookupController = require('../controllers/lookup-controller');
const eventController = require('../controllers/event-controller');
const sponsorController = require('../controllers/sponsor-controller');
const advertisementController = require('../controllers/advertisement-controller');
const upcomingeventsController = require('../controllers/upcoming-events-controller');
const faqController = require('../controllers/faq-controller');


const error=require('../middleware/error');
var cors = require('cors')

module.exports=function(app){
app.use(express.json());

app.use('/api',router.all('/galleryCategory', function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "X-Requested-With");
next();
}));

app.use('/api',router.all('/auth', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api',router.all('/me', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api',router.all('/user', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api',router.all('/contactinfo', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api',router.all('/gallery', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api',router.all('/sponsor', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api',router.all('/advertisement', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}));

app.use('/api', router.post('/auth', asyncMiddleware(authController.auth)));

app.use('/api',router.get('/me/:id',asyncMiddleware(userController.getUser)));

app.use('/api',router.post('/user',[auth,admin], asyncMiddleware(userController.createUser)));
app.use('/api',router.get('/user',[auth,admin],asyncMiddleware(userController.getUsers)));
app.use('/api',router.get('/user/:id',[auth,admin],asyncMiddleware(userController.getUserById)));
app.use('/api',router.put('/user/:id',[auth,admin],asyncMiddleware(userController.updateUser)));
app.use('/api',router.patch('/user/:id',[auth,admin],asyncMiddleware(userController.updateUser)));
app.use('/api',router.delete('/user/:id',[auth,admin],asyncMiddleware(userController.deleteUser)));

app.use('/api',router.post('/contactInfo', asyncMiddleware(contactInfoController.createContactInfo)));
app.use('/api',router.get('/contactInfo', asyncMiddleware(contactInfoController.getContactInfo)));
app.use('/api',router.put('/contactInfo/:id', asyncMiddleware(contactInfoController.updateContactInfo)));
app.use('/api',router.delete('/contactInfo/:id', asyncMiddleware(contactInfoController.deleteContactInfo)));

app.use('/api',router.post('/galleryCategory',[auth],asyncMiddleware(galleryCategoryController.createGalleryCategory)));
app.use('/api',router.get('/galleryCategory',asyncMiddleware(galleryCategoryController.getGalleryCategory)));
app.use('/api',router.get('/galleryCategory/:id',asyncMiddleware(galleryCategoryController.getGalleryCategoryById)));
app.use('/api',router.put('/galleryCategory/:id',[auth],asyncMiddleware(galleryCategoryController.updateGalleryCategory)));
app.use('/api',router.delete('/galleryCategory/:id',[auth],asyncMiddleware(galleryCategoryController.deleteGalleryCategory)));

app.use('/api',router.post('/gallery',[auth],asyncMiddleware(galleryController.createGallery)));
app.use('/api',router.post('/gallery/like/:id',asyncMiddleware(galleryController.updateLike)));
app.use('/api',router.post('/gallery/view/:id',asyncMiddleware(galleryController.updateView)));
app.use('/api',router.get('/gallery',asyncMiddleware(galleryController.getGallery)));
app.use('/api',router.get('/galleries',asyncMiddleware(galleryController.getGalleries)));
app.use('/api',router.get('/galleryByCategory/:id',asyncMiddleware(galleryController.getGalleryByCategory)));
app.use('/api',router.get('/gallery/:id',asyncMiddleware(galleryController.getGalleryById)));
app.use('/api',router.put('/gallery/:id',[auth],asyncMiddleware(galleryController.updateGallery)));
app.use('/api',router.delete('/gallery/:id',[auth],asyncMiddleware(galleryController.deleteGallery)));
app.use('/api',router.put('/gallery/status/:data',[auth],asyncMiddleware(galleryController.updateGalleryStatus)));
app.use('/api',router.get('/galleryreq/',asyncMiddleware(galleryController.getGalleryByReqStatus)));

app.use('/api',router.post('/lookup',[auth],asyncMiddleware(lookupController.createLookup)));
app.use('/api',router.get('/lookup',asyncMiddleware(lookupController.getLookup)));
app.use('/api',router.get('/lookup/:type',asyncMiddleware(lookupController.getLookupByType)));
app.use('/api',router.put('/lookup/:id',[auth],asyncMiddleware(lookupController.updateLookup)));
app.use('/api',router.delete('/lookup/:id',[auth],asyncMiddleware(lookupController.deleteLookup)));
app.use('/api',router.get('/lookupid/:id',asyncMiddleware(lookupController.getLookupById)));

app.use('/api',router.post('/event',[auth],asyncMiddleware(eventController.createEvent)));
app.use('/api',router.get('/event',asyncMiddleware(eventController.getEvent)));
app.use('/api',router.put('/event/:id',[auth],asyncMiddleware(eventController.updateEvent)));
app.use('/api',router.delete('/event/:id',[auth],asyncMiddleware(eventController.deleteEvent)));
app.use('/api',router.get('/event/:id',asyncMiddleware(eventController.getEventById)));

app.use('/api',router.post('/sponsor',[auth],asyncMiddleware(sponsorController.createSponsor)));
app.use('/api',router.get('/sponsor',asyncMiddleware(sponsorController.getSponsor)));
app.use('/api',router.get('/sponsor/:id',asyncMiddleware(sponsorController.getSponsorById)));
app.use('/api',router.put('/sponsor/:id',[auth],asyncMiddleware(sponsorController.updateSponsor)));
app.use('/api',router.delete('/sponsor/:id',[auth],asyncMiddleware(sponsorController.deleteSponsor)));

app.use('/api',router.post('/advertisement',[auth],asyncMiddleware(advertisementController.createAdvertisement)));
app.use('/api',router.get('/advertisement',asyncMiddleware(advertisementController.getAdvertisement)));
app.use('/api',router.get('/advertisement/filtered',asyncMiddleware(advertisementController.getAdverts)));
app.use('/api',router.get('/advertisement/:id',asyncMiddleware(advertisementController.getAdvertisementById)));
app.use('/api',router.get('/advertisement/:id',asyncMiddleware(advertisementController.getAdvertisementBySponsor)));
app.use('/api',router.put('/advertisement/:id',[auth],asyncMiddleware(advertisementController.updateAdvertisement)));
app.use('/api',router.delete('/advertisement/:id',[auth],asyncMiddleware(advertisementController.deleteAdvertisement)));
app.use('/api',router.get('/advertisementreq/',asyncMiddleware(advertisementController.getAdsByReqStatus)));

app.use('/api',router.post('/upcomingevent',[auth],asyncMiddleware(upcomingeventsController.createUpcomingEvent)));
app.use('/api',router.get('/upcomingevent',asyncMiddleware(upcomingeventsController.getUpcomingEvent)));
app.use('/api',router.get('/upcomingevent/:type',asyncMiddleware(upcomingeventsController.getUpcomingEventByTitle)));
app.use('/api',router.get('/upcomingevent/:id',asyncMiddleware(upcomingeventsController.getOneEvent)));
app.use('/api',router.put('/upcomingevent/:id',[auth],asyncMiddleware(upcomingeventsController.updateUpcomingEvent)));
app.use('/api',router.delete('/upcomingevent/:id',[auth],asyncMiddleware(upcomingeventsController.deleteUpcomingEvent)));

app.use('/api',router.post('/faq',[auth],asyncMiddleware(faqController.createFaq)));
app.use('/api',router.get('/faq',asyncMiddleware(faqController.getFaq)));
app.use('/api',router.get('/faq/:id',asyncMiddleware(faqController.getFaqById)));
app.use('/api',router.get('/faq/:type',asyncMiddleware(faqController.getFAQByQuestion)));
app.use('/api',router.put('/faq/:id',[auth],asyncMiddleware(faqController.updateFaq)));
app.use('/api',router.delete('/faq/:id',[auth],asyncMiddleware(faqController.deleteFaq)));

app.use(error);
}



