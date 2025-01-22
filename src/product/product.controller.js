const express = require('express');
const prisma = require("../db");
const router = express.Router();

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
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: "Failed to create product" });
    }
})