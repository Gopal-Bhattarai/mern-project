import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      default: 'local',
    },
    provider_id:{
      type: String,
      default: '0',
    },
    profile_pic: {
      type: String,
    },
    role: {
      type: String,
    },
    type:{
      type: String,
      default: 'customer'
    },
    isVerified: {
      type: Boolean,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

//password hash before saving in DB
userSchema.pre('save', function(next){
  const user = this;

  //if new or changed
  if(!user.isModified('password')) return next();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
})

//login -> Very password
userSchema.methods.comparePassword = function(candidatePassword,cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
      if(err) return cb(err);
      cb(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);
export default User;
