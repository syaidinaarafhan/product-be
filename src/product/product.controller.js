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

    if (!name || name.length < 3) {
        return res.status(400).json({ error: 'Name must be at least 3 characters long' });
    }

    if (!price || price <= 0) {
        return res.status(400).json({ error: 'Price must be greater than 0' });
    }

    if (stock == null || stock < 0) {
        return res.status(400).json({ error: 'Stock cannot be negative' });
    }

    try {
        const post = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
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

router.put('/product/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const { name, price, stock } = req.body;

    try {
        const update = await prisma.product.update({
            where: {
                id
            },
            data: {
                name,
                price: parseFloat(price),
                stock
            }
        })

        res.send({
            data : update,
            message : 'Success',
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "error" }).send(error.message);
    }
})

module.exports = router;