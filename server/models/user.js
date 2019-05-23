const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "can't be black"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      lowercase: true,
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: [true, "can't be black"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      lowercase: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      require: true
    },
    bio: String,
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    followed: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'List'
      }
    ]
  },
  { timestamps: true }
);

userSchema.methods.validPassword = function(password) {
  console.log(this.password);
  return bcrypt.compare(password, this.password);
};

userSchema.methods.setPassword = async function(password) {
  this.password = await bcrypt.hash(password, 12);
};

userSchema.methods.generateJWT = function() {
  const today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      userId: this._id,
      email: this.email
    },
    secret,
    { expiresIn: '1h' }
  );
};

userSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    email: this.email,
    password: this.password,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

userSchema.methods.toProfileJSONFor = function(user) {
  return {
    username: this.username,
    bio: this.bio,
    image:
      this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    isFollowing: user ? user.isFollowing(this._id) : false
  };
};

userSchema.methods.follow = async function(id) {
  if (this.followed.indexOf(id) === -1) {
    this.followed.push(id);
    const unfollowUser = await this.findById(id);
    if (unfollowUser.followers.indexOf(id) === -1) {
      unfollowUser.followers.remove(this._id);
      await unfollowUser.save();
    }
  }

  return this.save();
};

userSchema.methods.unfollow = async function(id) {
  this.followed.remove(id);
  const unfollowUser = await this.findById(id);
  if (unfollowUser.followers.indexOf(this._id) !== -1) {
    unfollowUser.followers.remove(this._id);
    await unfollowUser.save();
  }

  return this.save();
};

userSchema.methods.isFollowing = function(id) {
  return this.followed.some(followId => {
    return followId.toString() === id.toString();
  });
};

userSchema.methods.addList = function(id) {
  if (this.lists.indexOf(id) === -1) {
    this.lists.push(id);
  }
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
