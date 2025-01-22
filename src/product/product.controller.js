const express = require('express');
const prisma = require("../db");
const router = express.Router();

router.get('/getProducts', async (req, res) => {
    try {
        const Data = await prisma.product.findMany()
        res.send({
            data: Data,
            message : 'Success',
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "error" }).send(error.message);
    }
})

router.post('/postProduct', async (req, res) => {
    const { name, price, stock } = req.body;

    try {
        const post = await prisma.product.create({
            data: {
                name,
                price,
                stock
            }
        })
        res.send({
            data : post,
            message : 'Success',
          })
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "error" }).send(error.message);
    }
})

module.exports = router;