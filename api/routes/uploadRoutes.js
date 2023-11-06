import express from "express";
import imageDownloader from "image-downloader";
import * as path from "path";
import multer from "multer";

const router = express.Router();
const __dirname = path.resolve();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, path.resolve('./uploads'))
    },

    filename: function (req, file, cb) {
        const fileName = `image-${Date.now()}-${file.originalname}`
        return cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

router.post("/upload-by-link", async (req, res) => {
    const { link } = req.body
    const fileName = `image-${Date.now()}.jpg`
    await imageDownloader.image({
        url: link,
        dest: __dirname + "/uploads/" + fileName
    });
    res.json(fileName)

})

router.post("/upload-by-button", upload.array('photos', 10), (req, res) => {
    console.log(req.files)
    const uploadedPhotos = [];
    for (let i = 0; i < req.files.length; i++) {
        uploadedPhotos.push(req.files[i].filename)
    }
    res.json(uploadedPhotos)

})

export default router;