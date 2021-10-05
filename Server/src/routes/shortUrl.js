import express from 'express'
import { generateShortUrl, getUrl } from '../controllers/shortUrl.js'
const router = express.Router()

router.route("/").post(generateShortUrl);
router.route("/:id").get(getUrl);

export default router;