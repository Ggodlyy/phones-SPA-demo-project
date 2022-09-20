const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const emailPattern = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
  username: { type: String, required: true},
  email: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return emailPattern.test(value);
      },
      message: "Must have a valid email",
    },
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: [3, "password must be at least 3 charaters long"],
  },
  avatar: { type: Buffer },
  boughtPhones: { type: [Object], ref: "Phone", default: [] },
});

userSchema.index(
  { email: 1 },
  {
    collation: {
      locale: "en",
      strength: 1,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
