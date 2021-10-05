import { urlValidation } from '../validation/shortUrl.js'
import prependHttp from 'prepend-http';
import nanoid from 'nanoid'
import asyncHandler from '../middleware/asyncHandler.js';
import db from '../utilities/db.js';

export const generateShortUrl = asyncHandler(async (req, res, next) => {
    if(typeof req.body.url !== 'string'){
        return next({
            message: "You need to add string 'url' to body",
            statusCode: 400,
        });
    }
    const url = prependHttp(req.body.url);
    if(!urlValidation(url)){
        return next({
            message: "It seems that the url is wrong",
            statusCode: 422,
        });
    }
    
    const id = nanoid(10)
    const { urlList } = db.data
    urlList.push({id:id, url:url})
    await db.write()
    const shortUrl = prependHttp(req.get('host') + '/' +id);
    res.status(200).json({ success: true, data:shortUrl });
});

export const getUrl = asyncHandler(async (req, res, next) => {
    const url = req.params.id;
    const { urlList } = db.data
    const fullUrl = urlList.find((item) => item.id === url)
    if(fullUrl){
        return res.redirect(fullUrl.url);
    }else{
        return next({
            message: "Url doesn't exist",
            statusCode: 404,
        });
    }
});