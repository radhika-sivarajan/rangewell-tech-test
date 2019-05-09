import express from "express";

const routerApi = express.Router();

//mongodb models
import * as db from "./data/models";

//routes
routerApi.get("/deals", async (req, res) => {

    const {title} = req.query;
    if (title) {
        db.dealsCollection.aggregate([{$match: {title}}]).exec((err, result) => {
            if (err)
                console.log("error", err);
            res.status(500);
            res.status(200).send(result);
        })
    } else
        db.dealsCollection.find().exec(function (err, result) {
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
        {$count: "deals_count"},
        // {
        //     $group:
        //         {
        //             totalAmount: {$sum: ["amount",]},
        //             count: { $sum: ["amount"]}
        //         }
        // }
    ]).exec((err, result) => {
        if (err)
            console.log("error", err);
        res.status(200).send(result);
    });

})


export default routerApi;
