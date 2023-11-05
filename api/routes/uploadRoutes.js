import express from "express";
import imageDownloader from "image-downloader";
import * as path from "path";

const router = express.Router();
const __dirname = path.resolve();



router.post("/upload-by-link", async (req, res) => {
    const { link } = req.body
    const fileName = `image-${Date.now()}.jpg`
    await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" + fileName
    });
    res.json(fileName)

})

export default router;