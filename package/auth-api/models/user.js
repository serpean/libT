const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
    name: {
      type: String,
      required: [true, "can't be black"],
      match: [/^[a-zA-Z\s]+$/, 'is invalid'],
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
    image: String,
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

userSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.setPassword = async function(password) {
  this.password = await bcrypt.hash(password, 12);
};

userSchema.methods.generateJWT = function() {
  const today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  const pathName = path.join(__dirname, '..', 'private.pem');
  const secret =
    pathName !== '/' && fs.existsSync(pathName)
      ? fs.readFileSync(pathName, 'utf8')
      : undefined;

  return jwt.sign(
    {
      userId: this.username,
      name: this.name,
      email: this.email
    },
    secret,
    { expiresIn: '1h' , algorithm: 'RS256' }
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
    name: this.name,
    bio: this.bio,
    image: imageWithApi(this.image),
    isFollowing: user ? user.isFollowing(this._id) : undefined,
    following: this.following.map(user => {
      return {
        ...user._doc,
        _id: undefined,
        image: imageWithApi(user._doc.image)
      };
    }),
    followers: this.followers.map(user => {
      return {
        ...user._doc,
        _id: undefined,
        image: imageWithApi(user._doc.image)
      };
    })
  };
};

userSchema.methods.isFollowing = function(id) {
  return this.following.some(followId => {
    return followId.toString() === id.toString();
  });
};

const imageWithApi = image => {
  return image ? `${process.env.PUBLIC_URL}/api/${image}` : `${process.env.PUBLIC_URL}/api/public/images/default_user.svg`;
};

module.exports = mongoose.model('User', userSchema);
