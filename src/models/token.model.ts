import mongoose, { Schema, Document } from 'mongoose';
import { tokenTypes } from '../config/tokens';

export interface IToken extends Document {
  token: string;
  user: mongoose.Schema.Types.ObjectId;
  type: string;
  expires: Date;
  blacklisted?: boolean;
}

const tokenSchema: Schema = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.ACCESS, tokenTypes.REFRESH],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Token = mongoose.model<IToken>('Token', tokenSchema);

export default Token;
