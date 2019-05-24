import express from "express";

const routerApi = express.Router();

//mongodb models
import * as db from "./data/models";

//routes
routerApi.get("/deals", async (req, res) => {
    let title = req.query.title; 
    if( title == undefined){
        db.dealsCollection.find().sort({createdAt:'desc'}).exec(function(err, result) {
            if (err) {
                res.json(err);
                return;
            }
            res.send(result);
        });
    }else{
        db.dealsCollection.find({ 'title' : title }).exec(function(err, result) {
            if (err) {
                res.json(err);
                return;
            }
            res.send(result);
        });
    }
});

// Return a  statics of deals
routerApi.get("/deals/stats", async (req, res) => {
    db.dealsCollection.aggregate([
        {
            $group: {
                _id:'dealsId',
                deals_count: {$sum: 1},
                total_amounts: {$sum: "$amountRequired"}, 
                avg_amount: {$avg: "$amountRequired"}
            }
        }
    ])
    .exec(function(err, result){
        res.send(result)
    });
});

// Get deal by it's id
routerApi.get("/deals/:id", async (req, res) => {
    let id = req.params.id; 
    db.dealsCollection.findById(id).exec(function(err, result) {
        if (err) {
            res.json(err);
            return;
        }
        res.send(result);
    });
});

export default routerApi;
