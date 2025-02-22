const express = require('express');
const prisma = require("../db");

const getProducts = ('/getProducts', async (req, res) => {
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

const postProduct = ('/postProduct', async (req, res) => {
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

const getProduct = ('/product/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    
    try {
      const product = await prisma.product.findUnique({
        where: { id }
      });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ data: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'error' });
    }
});

const updateProduct = ('/product/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const { name, price, stock } = req.body;

    try {

        if (!name || !price || stock == null) {
            return res.status(400).json({ error: 'Data yang dikirim tidak lengkap' });
        }

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

const deleteProduct = ('/product/:id', async (req, res) => {

    const id = parseInt(req.params.id);

    try {
        await prisma.product.delete({
            where: {
                id
            }
        })

        res.send({
            message : 'Deleted',
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "error" }).send(error.message);
    }
})

const postOrders = ('/postOrders', async (req, res) => {
    const { customer_name, items } = req.body;

    if (!customer_name || customer_name.trim() === '') {
        return res.status(400).json({ error: 'Customer name is required' });
    }
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Items are required' });
    }

    for (const item of items) {
        if (!item.product_id || item.product_id <= 0) {
            return res.status(400).json({ error: `Invalid product ID: ${item.product_id}` });
        }
        if (!item.quantity || item.quantity <= 0) {
            return res.status(400).json({ error: `Quantity must cannot be 0 for product ID: ${item.product_id}` });
        }
    }

    try {

        const productData = await Promise.all(
            items.map((item) =>
                prisma.product.findUnique({
                    where: { id: item.product_id },
                    select: { price: true, stock: true },
                })
            )
        );

        for (let i = 0; i < items.length; i++) {
            const product = productData[i];

            if (!product) {
                return res.status(400).json({ error: `Product ID ${items[i].product_id} does not exist` });
            }

            if (product.stock < items[i].quantity) {
                return res.status(400).json({ error: `Insufficient stock for product ID ${items[i].product_id}` });
            }

            items[i].price = product.price;
        }

        const order = await prisma.$transaction(async (prisma) => {
            const newOrder = await prisma.order.create({
                data: {
                    customer_name,
                    items: {
                        create: items.map((item) => ({
                            product: { connect: { id: item.product_id } },
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                },
            });

            for (const item of items) {
                await prisma.product.update({
                    where: { id: item.product_id },
                    data: { stock: { decrement: item.quantity } },
                });
            }

            return newOrder;
        });

        res.status(201).json({
            message: 'Success',
            data: order,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error', details: error.message });
    }
 
})

const getOrders = ('/getOrders', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        res.send({
            data: orders,
            message: 'Success',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching orders' }).send(error.message);
    }
});

module.exports = { getProducts , postProduct , getProduct, updateProduct, 
  deleteProduct, postOrders, getOrders
};