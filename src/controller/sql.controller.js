const prisma = require("../db");

const orderSummaryp = ('/orderSummary', async (req, res) => {
    try {
      const orders = await prisma.order.findMany({
        include: {
          items: {
            select: {
              quantity: true,
              price: true,
            }
          }
        }
      });
  
      const orderSummary = orders.map(order => {
        const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        return {
          order_id: order.id,
          total_items: totalItems,
          total_price: totalPrice
        };
      });
  
      res.json(orderSummary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
});

const orderHighp = ('/orderHighestTotal', async (req, res) => {
    try {
      const orders = await prisma.order.findMany({
        include: {
          items: {
            select: {
              quantity: true,
              price: true,
            }
          }
        }
      });
  
      let highestTotal = 0;
      let highestOrder = null;
  
      orders.forEach(order => {
        const totalPrice = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        if (totalPrice > highestTotal) {
          highestTotal = totalPrice;
          highestOrder = order;
        }
      });
  
      res.json({ order: highestOrder, total_price: highestTotal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
});

const populrProductp = ('/mostPopularProduct', async (req, res) => {
    try {
      const productQuantities = await prisma.orderItems.groupBy({
        by: ['productId'],
        _sum: {
          quantity: true,
        }
      });
  
      let maxQuantity = 0;
      let popularProductId = null;
  
      productQuantities.forEach(item => {
        if (item._sum.quantity > maxQuantity) {
          maxQuantity = item._sum.quantity;
          popularProductId = item.productId;
        }
      });
  
      const popularProduct = await prisma.product.findUnique({
        where: { id: popularProductId }
      });
  
      res.json({ product: popularProduct, total_quantity: maxQuantity });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
});

const stockStatusp = ('/productStockStatus', async (req, res) => {
    try {
      const products = await prisma.product.findMany();
      const stockStatus = await Promise.all(products.map(async product => {
        const orderItems = await prisma.orderItems.findMany({
          where: { productId: product.id }
        });
  
        const totalSold = orderItems.reduce((sum, item) => sum + item.quantity, 0);
        const remainingStock = product.stock - totalSold;
  
        return {
          product_id: product.id,
          product_name: product.name,
          initial_stock: product.stock,
          remaining_stock: remainingStock
        };
      }));
  
      res.json(stockStatus);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
});

const orderMonthp = ('/ordersByMonth', async (req, res) => {
    const { year, month } = req.query; // Mengambil tahun dan bulan dari query string
    
    try {
      const orders = await prisma.order.findMany({
        where: {
          order_date: {
            gte: new Date(`${year}-${month}-01`), // Mulai bulan
            lt: new Date(`${year}-${parseInt(month) + 1}-01`), // Sebelum bulan berikutnya
          }
        },
        include: {
          items: true
        }
      });
  
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
});


module.exports = { orderSummaryp , orderHighp , populrProductp, stockStatusp, 
    orderMonthp
  };