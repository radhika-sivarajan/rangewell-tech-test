import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors'
import routerApi from './api'

//connect to mogodb
const url = 'mongodb://rangewell_public:XbcNprbwbBM6X5tc@clustertest-shard-00-00-tzuwz.mongodb.net:27017/rangewell-interview?ssl=true&replicaSet=ClusterTest-shard-0&authSource=admin&retryWrites=true';
mongoose.Promise = require('bluebird');
mongoose.connect(url,{ useNewUrlParser: true });

const app = express();
app.use(cors({ 
	origin: '*',
	optionsSuccessStatus: 200
}));

app.use(
	bodyParser.json({
		limit: '10mb'
	})
);
app.use(
	bodyParser.urlencoded({
		limit: '10mb',
		extended: true
	})
);
app.get('/', (req,res) =>{
    res.send({
        message: 'Welcome',
        endpoints:[
            '/api/deals',
			'/api/deals?title={title}',
			'/api/deal/{id}',
			'/api/deals/stats'
        ]
    })
})
app.use('/api', routerApi);

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => console.log('info', `Server listening on port http://localhost:${app.get('port')}`));