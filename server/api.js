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

// Return a specific stat data
routerApi.get("/deals/stats", async (req, res) => {
    let statistics = {
        deals_count: 0,       // number of deals
        total_amounts: 0,  // total amountRequired of deals
        avg_amount: 0        // average of deals  amountRequired
    };
    db.dealsCollection.find().exec(function(err, result) {
        if (err) {
            res.json(err);
            return;
        }
        let total=0;
        let avg=0;
        for (var i = 0; i < result.length; i++) {
            total += result[i].amountRequired;
        }
        avg = total/result.length;
        statistics.deals_count = result.length;
        statistics.total_amounts = total;
        statistics.avg_amount = avg;
        res.send(statistics);
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
