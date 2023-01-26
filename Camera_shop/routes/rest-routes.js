const {sequelize, Camera_shop, Cameras, Employees,
Filters, Lenses, Microphones, Purchase, shopping_cart,
Suppliers, Tripods} = require("../models")
const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config({path: __dirname + '/../.env'});

const cors = require('cors');
const e = require("express");

//TODO ODRADI VALIDACIJE OVDE

const rtr = express.Router();
rtr.use(express.json());
rtr.use(express.urlencoded({extended: true}));
rtr.use(cors());

function authToken(req, res, next) {
    const auth = req.headers['authorization'];
    const token = auth && auth.split(' ')[1];
    if (token === null || token === undefined) return res.status(401).json({ msg: "You're not authorized." });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, res) => {
        console.log(err);
        if (err) return res.status(403).json({ msg: "Something went wrong with authorizing your request." });

        req.user = res;

        next();
    })
}

//GET ALL METHODS
rtr.get('/camera_shops', (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*');
    Camera_shop.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/cameras', (req, res) => {
    Cameras.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/employees', (req, res) => {
    Employees.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/filters', (req, res) => {
    Filters.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/lenses', (req, res) => {
    Lenses.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/microphones', (req, res) => {
    Microphones.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/purchases', (req, res) => {
    Purchase.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/shopping_cart', (req, res) => {
    shopping_cart.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/suppliers', (req, res) => {
    Suppliers.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/tripods', (req, res) => {
    Tripods.findAll()
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

//GET ONE METHODS
rtr.get('/camera_shops/:id', (req, res) => {
    Camera_shop.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/cameras/:id', (req, res) => {
    Cameras.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/employees/:id', (req, res) => {
    Employees.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/filters/:id', (req, res) => {
    Filters.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/lenses/:id', (req, res) => {
    Lenses.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/microphones/:id', (req, res) => {
    Microphones.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/purchases/:id', (req, res) => {
    Purchase.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/shopping_cart/:id', (req, res) => {
    shopping_cart.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/suppliers/:id', (req, res) => {
    Suppliers.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.get('/tripods/:id', (req, res) => {
    Tripods.findOne({ where: { id: req.params.id } })
        .then(rows => res.json(rows))
        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
});

rtr.use(authToken);

//CREATE METHODS
rtr.post('/camera_shops', (req, res) => {
    const JoiSchema = Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
    }).options({abortEarly: false});

    const obj = {
        name: req.body.name, 
        location: req.body.location 
    }

    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Camera_shop.create(obj)
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
    }
});

rtr.post('/cameras', (req, res) => {
    const JoiSchema = Joi.object({
        company: Joi.string().required(),
        model: Joi.string().required(),
        sensor: Joi.string().required(),
        megapixels: Joi.number().required(),
        video_size: Joi.string().required(),
        video_fps: Joi.number().required(),
        price: Joi.number().required(),
        cameraShopId: Joi.number().required()
    }).options({abortEarly: false});

    const obj = { 
        company: req.body.company, 
        model: req.body.model, 
        sensor: req.body.sensor, 
        megapixels: req.body.megapixels, 
        video_size: req.body.video_size, 
        video_fps: req.body.video_fps,
        price: req.body.price, 
        cameraShopId: req.body.cameraShopId
    }

    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Camera_shop.findOne({where: {id: obj.cameraShopId}})
                .then(rows => {
                    if (rows === null){
                        res.status(400).json({msg: "Camera shop with provided id doesn't exist!"});
                    }
                    else{
                        Cameras.create(obj)
                            .then(rows => res.json(rows))
                            .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
                    }
                })
                .catch(err => res.status(500).json({msg: "Camera shop with provided id doesn't exist!"}))
    }
});

rtr.post('/employees', (req, res) => {
    const JoiSchema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNum: Joi.number().required(),
        cameraShopId: Joi.number().required(),
    }).options({abortEarly: false});

    const obj = { 
        name: req.body.name, 
        surname: req.body.surname, 
        email: req.body.email,
        phoneNum: req.body.phoneNum, 
        cameraShopId: req.body.cameraShopId 
    }

    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Camera_shop.findOne({where: {id: obj.cameraShopId}})
                .then(rows => {
                    if (rows === null){
                        res.status(400).json({msg: "Camera shop with provided id doesn't exist!"});
                    }
                    else{
                        Employees.create(obj)
                        .then(rows => res.json(rows))
                        .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
                    }
                })
                .catch(err => res.status(500).json({msg: "Camera shop with provided id doesn't exist!"}))
    }
});

rtr.post('/filters', (req, res) => {
    const JoiSchema = Joi.object({
        company: Joi.string().required(),
        diameter: Joi.number().required(),
        purpose: Joi.string().required(),
        price: Joi.number().required(),
        cameraShopId: Joi.number().required(),
    }).options({abortEarly: false});

    const obj = { 
        company: req.body.company, 
        diameter: req.body.diameter, 
        purpose: req.body.purpose,
        price: req.body.price, 
        cameraShopId: req.body.cameraShopId, 
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Camera_shop.findOne({where: {id: obj.cameraShopId}})
                .then(rows => {
                    if (rows === null){
                        res.status(400).json({msg: "Camera shop with provided id doesn't exist!"});
                    }
                    else{
                        Filters.create(obj)
                            .then(rows => res.json(rows))
                            .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
                    }
                })
                .catch(err => res.status(500).json({msg: "Camera shop with provided id doesn't exist!"}))
        
    }
});

rtr.post('/lenses', (req, res) => {
    const JoiSchema = Joi.object({
        company: Joi.string().required(),
        zoom: Joi.string().required(),
        focal_length: Joi.string().required(),
        mount: Joi.string().required(),
        price: Joi.number().required(),
        cameraShopId: Joi.number().required(),
    }).options({abortEarly: false});

    const obj = { 
        company: req.body.company, 
        zoom: req.body.zoom, 
        focal_length: req.body.focal_length,
        mount: req.body.mount, 
        price: req.body.price,
        cameraShopId: req.body.cameraShopId, 
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Camera_shop.findOne({where: {id: obj.cameraShopId}})
                .then(rows => {
                    if (rows === null){
                        res.status(400).json({msg: "Camera shop with provided id doesn't exist!"});
                    }
                    else{
                        Lenses.create(obj)
                            .then(rows => res.json(rows))
                            .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
                    }
                })
                .catch(err => res.status(500).json({msg: "Camera shop with provided id doesn't exist!"}))
        
    }
});

rtr.post('/microphones', (req, res) => {
    const JoiSchema = Joi.object({
        company: Joi.string().required(),
        model: Joi.string().required(),
        type: Joi.string().required(),
        frequency_range: Joi.string().required(),
        price: Joi.number().required(),
        cameraShopId: Joi.number().required(),
    }).options({abortEarly: false});

    const obj = { 
        company: req.body.company, 
        model: req.body.model, 
        type: req.body.type,
        frequency_range: req.body.frequency_range, 
        price: req.body.price,
        cameraShopId: req.body.cameraShopId, 
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Camera_shop.findOne({where: {id: obj.cameraShopId}})
                .then(rows => {
                    if (rows === null){
                        res.status(400).json({msg: "Camera shop with provided id doesn't exist!"});
                    }
                    else{
                        Microphones.create(obj)
                            .then(rows => res.json(rows))
                            .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
                    }
                })
                .catch(err => res.status(500).json({msg: "Camera shop with provided id doesn't exist!"}))
    }
});

rtr.post('/purchases', (req, res) => {
    const JoiSchema = Joi.object({
        price: Joi.string().required(),
        date: Joi.date().required(),
        cameraShopId: Joi.number().required()
    }).options({abortEarly: false});

    const obj = { 
        price: req.body.price, 
        date: req.body.date, 
        cameraShopId: req.body.cameraShopId 
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Camera_shop.findOne({where: {id: obj.cameraShopId}})
                .then(rows => {
                    if (rows === null){
                        res.status(400).json({msg: "Camera shop with provided id doesn't exist!"});
                    }
                    else{
                        Purchase.create(obj)
                            .then(rows => res.json(rows))
                            .catch(err => {
                                res.status(500).json({msg: "Something went wrong. :("})});
                            }
                })
                .catch(err => res.status(500).json({msg: "Camera shop with provided id doesn't exist!"}))
    }
});

rtr.post('/shopping_cart', (req, res) => {
    const JoiSchema = Joi.object({
        price: Joi.number().required(),
        purchaseId: Joi.number(),
    }).options({abortEarly: false});

    const obj = { 
        price: req.body.price, 
        purchaseId: req.body.purchaseId 
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        shopping_cart.create(obj)
            .then(rows => res.json(rows))
            .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
    }
});

rtr.post('/suppliers', (req, res) => {
    const JoiSchema = Joi.object({
        name: Joi.string().required(),
        country_origin: Joi.string().required(),
        cameraShopId: Joi.number()
    }).options({abortEarly: false});

    const obj = { 
        name: req.body.name, 
        country_origin: req.body.country_origin,
        cameraShopId: req.body.cameraShopId
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Camera_shop.findOne({where: {id: obj.cameraShopId}})
                .then(rows => {
                    if (rows === null){
                        res.status(400).json({msg: "Camera shop with provided id doesn't exist!"});
                    }
                    else{
                        Suppliers.create(obj)
                            .then(rows => res.json(rows))
                            .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
                    }
                })
                .catch(err => res.status(500).json({msg: "Camera shop with provided id doesn't exist!"}))
    }
});

rtr.post('/tripods', (req, res) => {
    const JoiSchema = Joi.object({
        company: Joi.string().required(),
        model: Joi.string().required(),
        carry_capacity: Joi.number().required(),
        meant_for: Joi.string().required(),
        price: Joi.number().required(),
        cameraShopId: Joi.number().required()
    }).options({abortEarly: false});

    const obj = { 
        company: req.body.company, 
        model: req.body.model, 
        carry_capacity: req.body.carry_capacity,
        meant_for: req.body.meant_for, 
        price: req.body.price,
        cameraShopId: req.body.cameraShopId, 
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Camera_shop.findOne({where: {id: obj.cameraShopId}})
                .then(rows => {
                    if (rows === null){
                        res.status(400).json({msg: "Camera shop with provided id doesn't exist!"});
                    }
                    else{
                        Tripods.create(obj)
                            .then(rows => res.json(rows))
                            .catch(err => res.status(500).json({msg: "Something went wrong. :("}))
                    }
                })
                .catch(err => res.status(500).json({msg: "Camera shop with provided id doesn't exist!"}))
    }
});

//UPDATE METHODS
rtr.put('/camera_shops/:id', (req, res) => {
    const JoiSchema = Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
    }).options({abortEarly: false});

    const obj = {
        name: req.body.name, 
        location: req.body.location 
    }

    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Camera_shop.findOne({ where: { id: req.params.id } })
            .then(shop => {
                shop.name = req.body.name
                shop.location = req.body.location

                shop.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Couldn't save your changes. Something went wrong. :("}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check the id, it's probably wrong."}))
    }
});

rtr.put('/cameras/:id', (req, res) => {
    const JoiSchema = Joi.object({
        company: Joi.string().required(),
        model: Joi.string().required(),
        sensor: Joi.string().required(),
        megapixels: Joi.number().required(),
        video_size: Joi.string().required(),
        video_fps: Joi.number().required(),
        price: Joi.number().required(),
    }).options({abortEarly: false});

    const obj = { 
        company: req.body.company, 
        model: req.body.model, 
        sensor: req.body.sensor, 
        megapixels: req.body.megapixels, 
        video_size: req.body.video_size, 
        video_fps: req.body.video_fps,
        price: req.body.price, 
    }

    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Cameras.findOne({ where: { id: req.params.id } })
            .then(camera => {
                camera.company = req.body.company,
                camera.model = req.body.model,
                camera.sensor = req.body.sensor,
                camera.megapixels = req.body.megapixels,
                camera.video_size = req.body.video_size,
                camera.video_fps = req.body.video_fps,
                camera.price = req.body.price

                camera.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Couldn't save your changes. Something went wrong. :("}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check the id, it's probably wrong."}))
    }
});

rtr.put('/employees/:id', (req, res) => {
    const JoiSchema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNum: Joi.number().required(),
    }).options({abortEarly: false});

    const obj = { 
        name: req.body.name, 
        surname: req.body.surname, 
        email: req.body.email,
        phoneNum: req.body.phoneNum, 
    }

    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Employees.findOne({ where: { id: req.params.id } })
            .then(employee => {
                employee.name = req.body.name,
                employee.surname = req.body.surname,
                employee.email = req.body.email,
                employee.phoneNum = req.body.phoneNum

                employee.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Couldn't save your changes. Something went wrong. :("}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check the id, it's probably wrong."}))
    }
});

rtr.put('/filters/:id', (req, res) => {
    const JoiSchema = Joi.object({
        company: Joi.string().required(),
        diameter: Joi.string().required(),
        purpose: Joi.string().required(),
        price: Joi.number().required(),
    }).options({abortEarly: false});

    const obj = { 
        company: req.body.company, 
        diameter: req.body.diameter, 
        purpose: req.body.purpose,
        price: req.body.price, 
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Filters.findOne({ where: { id: req.params.id } })
            .then(filter => {
                filter.company = req.body.company,
                filter.diameter = req.body.diameter,
                filter.purpose = req.body.purpose,
                filter.price = req.body.price

                filter.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Couldn't save your changes. Something went wrong. :("}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check the id, it's probably wrong."}))
    }
});

rtr.put('/lenses/:id', (req, res) => {
    const JoiSchema = Joi.object({
        company: Joi.string().required(),
        zoom: Joi.string().required(),
        focal_length: Joi.string().required(),
        mount: Joi.string().required(),
        price: Joi.number().required(),
    }).options({abortEarly: false});

    const obj = { 
        company: req.body.company, 
        zoom: req.body.zoom, 
        focal_length: req.body.focal_length,
        mount: req.body.mount, 
        price: req.body.price,
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Lenses.findOne({ where: { id: req.params.id } })
            .then(lens => {
                lens.company = req.body.company,
                lens.zoom = req.body.zoom,
                lens.focal_length = req.body.focal_length,
                lens.mount = req.body.mount,
                lens.price = req.body.price

                lens.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Couldn't save your changes. Something went wrong. :("}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check the id, it's probably wrong."}))
    }
});

rtr.put('/microphones/:id', (req, res) => {
    const JoiSchema = Joi.object({
        company: Joi.string().required(),
        model: Joi.string().required(),
        type: Joi.string().required(),
        frequency_range: Joi.string().required(),
        price: Joi.number().required(),
    }).options({abortEarly: false});

    const obj = { 
        company: req.body.company, 
        model: req.body.model, 
        type: req.body.type,
        frequency_range: req.body.frequency_range, 
        price: req.body.price,
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Microphones.findOne({ where: { id: req.params.id } })
            .then(microphone => {
                microphone.company = req.body.company,
                microphone.model = req.body.model,
                microphone.type = req.body.type,
                microphone.frequency_range = req.body.frequency_range,
                microphone.price = req.body.price

                microphone.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Couldn't save your changes. Something went wrong. :("}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check the id, it's probably wrong."}))
    }
});

rtr.put('/purchases/:id', (req, res) => {
    const JoiSchema = Joi.object({
        price: Joi.string().required(),
        date: Joi.date().required(),
    }).options({abortEarly: false});

    const obj = { 
        price: req.body.price, 
        date: req.body.date, 
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Purchase.findOne({ where: { id: req.params.id } })
            .then(purchase => {
                purchase.price = req.body.price,
                purchase.date = req.body.date

                purchase.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Couldn't save your changes. Something went wrong. :("}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check the id, it's probably wrong."}))
    }
});

rtr.put('/shopping_cart/:id', (req, res) => {
    const JoiSchema = Joi.object({
        price: Joi.number().required(),
    }).options({abortEarly: false});

    const obj = { 
        price: req.body.price, 
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        shopping_cart.findOne({ where: { id: req.params.id } })
            .then(shopping_cart => {
                shopping_cart.price = req.body.price

                shopping_cart.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Couldn't save your changes. Something went wrong. :("}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check the id, it's probably wrong."}))
    }
});

rtr.put('/suppliers/:id', (req, res) => {
    const JoiSchema = Joi.object({
        name: Joi.string().required(),
        country_origin: Joi.string().required(),
    }).options({abortEarly: false});

    const obj = { 
        name: req.body.name, 
        country_origin: req.body.country_origin,
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Suppliers.findOne({ where: { id: req.params.id } })
            .then(supplier => {
                supplier.name = req.body.name,
                supplier.country_origin = req.body.country_origin

                supplier.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Couldn't save your changes. Something went wrong. :("}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check the id, it's probably wrong."}))
    }
});

rtr.put('/tripods/:id', (req, res) => {
    const JoiSchema = Joi.object({
        company: Joi.string().required(),
        model: Joi.string().required(),
        carry_capacity: Joi.number().required(),
        meant_for: Joi.string().required(),
        price: Joi.number().required(),
    }).options({abortEarly: false});

    const obj = { 
        company: req.body.company, 
        model: req.body.model, 
        carry_capacity: req.body.carry_capacity,
        meant_for: req.body.meant_for, 
        price: req.body.price,
    }
    
    let response = JoiSchema.validate(obj);

    if (response.error){
        return res.status(400).json({msg: response.error.details});
    }
    else{
        Tripods.findOne({ where: { id: req.params.id } })
            .then(tripod => {
                tripod.company = req.body.company,
                tripod.model = req.body.model,
                tripod.carry_capacity = req.body.carry_capacity,
                tripod.meant_for = req.body.meant_for,
                tripod.price = req.body.price

                tripod.save()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Couldn't save your changes. Something went wrong. :("}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check the id, it's probably wrong."}))
    }
});

//DELETE METHODS
rtr.delete('/camera_shops/:id', (req, res) => {
    if (!Number(req.params.id)){
        return res.status(400, "error: Id is not a number!");
    }
    else{
        Camera_shop.findOne({ where: { id: req.params.id } })
            .then(shop => {
                shop.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
    }
});

rtr.delete('/cameras/:id', (req, res) => {
    if (!Number(req.params.id)){
        return res.status(400, "error: Id is not a number!");
    }
    else{
        Cameras.findOne({ where: { id: req.params.id } })
            .then(camera => {
            camera.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
    }
});

rtr.delete('/employees/:id', (req, res) => {
    if (!Number(req.params.id)){
        return res.status(400, "error: Id is not a number!");
    }
    else{
        Employees.findOne({ where: { id: req.params.id } })
            .then(employee => {
            employee.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
    }
});

rtr.delete('/filters/:id', (req, res) => {
    if (!Number(req.params.id)){
        return res.status(400, "error: Id is not a number!");
    }
    else{
        Filters.findOne({ where: { id: req.params.id } })
            .then(filter => {
                filter.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
    }
});

rtr.delete('/lenses/:id', (req, res) => {
    if (!Number(req.params.id)){
        return res.status(400, "error: Id is not a number!");
    }
    else{
        Lenses.findOne({ where: { id: req.params.id } })
            .then(lens => {
                lens.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
    }
});

rtr.delete('/microphones/:id', (req, res) => {
    if (!Number(req.params.id)){
        return res.status(400, "error: Id is not a number!");
    }
    else{
        Microphones.findOne({ where: { id: req.params.id } })
            .then(microphone => {
                microphone.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
    }
});

rtr.delete('/purchases/:id', (req, res) => {
    if (!Number(req.params.id)){
        return res.status(400, "error: Id is not a number!");
    }
    else{
        Purchase.findOne({ where: { id: req.params.id } })
            .then(purchase => {
            purchase.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
    }
});

rtr.delete('/shopping_cart/:id', (req, res) => {
    if (!Number(req.params.id)){
        return res.status(400, "error: Id is not a number!");
    }
    else{
        shopping_cart.findOne({ where: { id: req.params.id } })
            .then(shopping_cart => {
            shopping_cart.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
    }
});

rtr.delete('/suppliers/:id', (req, res) => {
    if (!Number(req.params.id)){
        return res.status(400, "error: Id is not a number!");
    }
    else{
        Suppliers.findOne({ where: { id: req.params.id } })
            .then(supplier => {
            supplier.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
    }
});

rtr.delete('/tripods/:id', (req, res) => {
    if (!Number(req.params.id)){
        return res.status(400, "error: Id is not a number!");
    }
    else{
        Tripods.findOne({ where: { id: req.params.id } })
            .then(tripod => {
                tripod.destroy()
                    .then(rows => res.json(rows))
                    .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
            })
            .catch(err => res.status(500).json({msg: "Something went wrong. Check your ID, it's probably wrong."}))
    }
});

module.exports = rtr;