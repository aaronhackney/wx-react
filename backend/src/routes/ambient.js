import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// TODO: move the API Keys to being loaded from a volume at runtime
// Make the API call to ambientweather.net
router.get('/', function (req, res, next) {
    console.log(req.originalUrl);
    axios.get(`${process.env.PROTO}://${process.env.FQDN}${req.originalUrl}`, { params: { apiKey: process.env.APIKEY, applicationKey: process.env.APPKEY } })
        .then(response => res.json(response.data))
        .catch(err => res.send(err));
});

// module.exports = router;
export default router;
