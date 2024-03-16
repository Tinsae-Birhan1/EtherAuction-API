import mongoose, { Schema, Document, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import toJson from '@meanie/mongoose-to-json';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface UserModel extends Model<UserDocument> {
  isEmailTaken(email: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, UserModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: 'Invalid email',
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true,
      validate: {
        validator: (value: string) => validator.isStrongPassword(value),
        message: 'Password should contain atleast one uppercase and lowercase letter, number and special character',
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isEmailTaken = async function (email: string): Promise<boolean> {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.index({ email: 1 });

userSchema.pre<UserDocument>('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  const user = this;
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  return isPasswordCorrect;
};

userSchema.plugin(toJson);

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
