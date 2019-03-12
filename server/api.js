import express from "express";

const routerApi = express.Router();

//mongodb models
import * as db from "./data/models";

//routes
routerApi.get("/deals", async (req, res) => {
    db.dealsCollection.find().exec(function(err, result) {
        res.send(result);
    });
});

export default routerApi;
