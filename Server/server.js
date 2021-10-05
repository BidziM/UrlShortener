import dotenv from 'dotenv';
import express from 'express';
import cors from'cors';
import errorHandler from './src/middleware/errorHandler.js';
import shortApi from './src/routes/shortUrl.js';

const app = express()
, port = process.env.PORT || 80

dotenv.config()

app.use(cors());
app.use(express.json());

//On production, we would prefer to use Nginx or Kubernetes with Nginx-ingress to specify the route to API
app.get('/:id', function(req, res) {
    res.redirect(`/api/v1/url/${req.params.id}`);
});

app.use("/api/v1/url", shortApi);

app.use(errorHandler);
app.listen(port, console.log(`Server is ready and using the port ${port}`));