const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");


const schema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  img: { type: String, required: true },
  description: {
    type: String,
    required: true,
    minlength: [10, "Description must be at least 10 characters long"],
  },
  price: { type: Number, required: true },
  owner: { type: ObjectId, ref: "User" },
  likes: { type: [ObjectId], ref: "User", default: [] },
  comments: { type: [Object], default: [] },
});

const Item = model("Item", schema);


module.exports = Item;

