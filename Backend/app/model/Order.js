import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  medicine: String,
  quantity: Number,
  deliveryDate: String,
  company: String,
  status: String,
  genericName: String,
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
