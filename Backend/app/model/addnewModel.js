import mongoose from "mongoose";

const addnewSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: [true, "Medicine name is required"],
      unique: true,
      trim: true,
    },
    genericNames: {
      type: String,
      required: [true, "Generic names are required"],
      trim: true,
    },
    expireDate: {
      type: String,
      required: [true, "Expire date is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      // no 'unique: true' here
    },
    quantity: {
      // changed from Countity to quantity
      type: Number, // better to store as Number type
      required: [true, "Quantity is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model("addnew", addnewSchema);
