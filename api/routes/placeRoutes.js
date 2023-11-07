import express from "express";
const router = express();

router.post('/add-new-places', (req, res) => {
    const { formData } = req.body;
    res.json(formData)
})

export default router;