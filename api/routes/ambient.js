import express from 'express';
import axios from 'axios';
const router = express.Router();
require('dotenv').config()

// TODO: move the API Keys to being loaded from a volume at runtime
// Make the API call to ambientweather.net
router.get('/', function (req, res, next) {
    console.log(req.originalUrl);
    axios.get(`${process.env.PROTO}://${process.env.FQDN}${req.originalUrl}`, { params: { apiKey: process.env.APIKEY, applicationKey: process.env.APPKEY } })
        .then(response => res.json(response.data))
        .catch(err => res.send(err));
});

module.exports = router;
