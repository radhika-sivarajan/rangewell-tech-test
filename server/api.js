import express from "express";

const routerApi = express.Router();

//mongodb models
import * as db from "./data/models";

//routes
routerApi.get("/deals", async (req, res) => {
    let title = req.query.title; 
    if( title == undefined){
        db.dealsCollection.find().exec(function(err, result) {
            res.send(result);
        });
    }else{
        db.dealsCollection.find({ 'title' : title }).exec(function(err, result) {
            res.send(result);
        });
    }
});

// Return a specific stat data
routerApi.get("/deals/stats", async (req, res) => {
    let statistics = {
        deals_count: 200,       // number of deals
        total_amounts: 200000,  // total amountRequired of deals
        avg_amount: 3000        // average of deals  amountRequired
    };
    res.send(statistics);
});

// Get deal by it's id
routerApi.get("/deals/:id", async (req, res) => {
    let id = req.params.id; 
    db.dealsCollection.findById(id).exec(function(err, result) {
        res.send(result);
    });
});

export default routerApi;
