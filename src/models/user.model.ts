import mongoose, { Document, Model } from 'mongoose';
import validator from 'validator';
import { toJSON, paginate } from './plugins';
import { User } from '../domains/typedef';

interface UserModel extends Model<User> {
  isEmailTaken: (email: string, excludeUserId?: string) => Promise<boolean>;
  isAddressTaken: (address: string, excludeUserId?: string) => Promise<boolean>;
  isUsernameTaken: (userName: string, excludeUserId?: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<User, UserModel>(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    fullname: { type: String, trim: true },
    businessEmail: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    facebookPage: { type: String, trim: true },
    description: { type: String, trim: true },
    ip: { type: String, trim: true },
    password2: { type: String, trim: true },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email: string, excludeUserId?: string) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isUsernameTaken = async function (userName: string, excludeUserId?: string) {
  const user = await this.findOne({ userName, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this as User;
  // return bcrypt.compare(password, user.password);
};

userSchema.pre<User>('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    // user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<User, UserModel>('User', userSchema);

export default User;
