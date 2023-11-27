import express from 'express';
const router = express.Router();

router.post('/booking', async(req, res) => {
    const bookingDoc = await req.body
    res.json(bookingDoc)
})

export default router;