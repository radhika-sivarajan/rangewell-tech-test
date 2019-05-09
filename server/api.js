import express from "express";

const routerApi = express.Router();

//mongodb models
import * as db from "./data/models";

//routes
routerApi.get("/deals", async (req, res) => {

    const {title, dateFrom} = req.query;
    if (title) {
        db.dealsCollection.aggregate([{$match: {title}}, {$sort: {createdAt: -1}}]).exec((err, result) => {
            if (err)
                console.log("error", err);
            res.status(500);
            res.status(200).send(result);
        })
    } else if (dateFrom) {
        db.dealsCollection.find({createdAt: {$gte: new Date(dateFrom)}}).exec((err, result) => {
            if (err)
                console.log("error", err);
            res.status(500);
            res.status(200).send(result);
        })
    } else
        db.dealsCollection.find().sort({"createdAt": -1}).exec(function (err, result) {
            res.send(result);
        });
});
routerApi.get("/deal/:id", async (req, res) => {
    const {id} = req.params;
    if (id)
        db.dealsCollection.find({_id: id}).exec((err, result) => {
            if (err)
                console.log("error", err);
            res.status(500);
            res.status(200).send(result);
        })
    else
        res.status(200).send({message: "ID missing"});

})
routerApi.get("/deals/stats", async (req, res) => {
    db.dealsCollection.aggregate([
        {
            $group: {
                _id: '$cr_dr',
                deals_count: {$sum: 1},    //counts the deals
                total_amounts: {$sum: '$amountRequired'},    //sums the amount
                avg_amount: {$avg: {$sum: ['$amountRequired']}} // average
            }
        }
    ]).exec((err, result) => {
        if (err)
            console.log("error", err);
        res.status(200).send(result);
    });

})


export default routerApi;
