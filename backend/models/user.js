import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: String,
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password') || user.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
          if (saltError) {
              return next(saltError);
          } else {
              bcrypt.hash(user.password, salt, function (hashError, hash) {
                  if (hashError) {
                      return next(hashError);
                  }
                  user.password = hash;
                  return next();
              })
          }
      })
  } else {
      return next();
  }
})

//module.exports = mongoose.model('User', userSchema)

export default mongoose.model('User', userSchema);
