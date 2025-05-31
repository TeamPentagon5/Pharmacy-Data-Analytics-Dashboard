import express from 'express';
import Order from '../app/model/Order.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.send('Order placed');
  } catch (error) {
    res.status(500).send('Error placing order');
  }
});

router.get('/', async (req, res) => {
  const { status } = req.query;
  try {
    const filter = status ? { status } : {};
    const orders = await Order.find(filter);
    res.json(orders);
  } catch (error) {
    res.status(500).send('Error fetching orders');
  }
});

router.get('/search', async (req, res) => {
  const { type, value } = req.query;

  try {
    if (type === 'medicine') {
      const result = await Order.find({ medicine: { $regex: value, $options: 'i' } });
      return res.json(result);
    }
    if (type === 'company') {
      const result = await Order.find({ company: { $regex: value, $options: 'i' } });
      return res.json(result);
    }
    if (type === 'generic') {
      const result = await Order.find({ genericName: { $regex: value, $options: 'i' } });
      return res.json(result);
    }
    res.json([]);
  } catch (error) {
    res.status(500).send('Error searching orders');
  }
});

// ✅ This is the route you were missing:
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).send('Order not found');
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).send('Failed to update status');
  }
});

router.get('/medicine-demand', async (req, res) => {
  try {
    const demandData = await Order.aggregate([
      {
        $group: {
          _id: { medicine: '$medicine', company: '$company' },
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $project: {
          _id: 0,
          label: { $concat: ['$_id.medicine', ' - ', '$_id.company'] },
          quantity: '$totalQuantity'
        }
      },
      { $sort: { quantity: -1 } }
    ]);

    res.json(demandData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;
