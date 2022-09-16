const Phone = require("../models/Phone");
const User = require("../models/User");
const uniqid = require("uniqid");

async function getAll() {
  return Phone.find({});
}

async function create(item) {
  const result = new Phone(item);
  await result.save();

  return result;
}

function getById(id) {
  return Phone.findById(id);
}

async function update(id, item) {
  const existing = await Phone.findById(id);

  existing.brand = item.brand;
  existing.model = item.model;
  existing.img = item.img;
  existing.description = item.description;
  existing.price = item.price;

  await existing.save();

  return existing;
}

async function deleteById(id) {
  await Phone.findByIdAndDelete(id);
}

async function buy(id, userId) {
  const user = await User.findById(userId);
  const phone = await Phone.findById(id);
  console.log(`this is bought phone: ${phone}`);

  if (user.boughtPhones.find((p) => p._id === phone._id)) {
    throw new Error("User has already purchased this phone");
  }

  user.boughtPhones.push(phone);

  await user.save();
}

async function comment(id, userId, userComment) {
  const phone = await Phone.findById(id);
  const ownerInfo = await User.findOne({ _id: userId });

  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];

  const fullDate = `${day}/${month}/${year}`;

  const commentInfo = {
    commentId: uniqid(),
    owner: ownerInfo,
    createdAt: fullDate,
    commentText: userComment,
  };

  phone.comments.push(commentInfo);

  await phone.save();

  return commentInfo;
}

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteById,
  // like,
  buy,
  comment,
};
