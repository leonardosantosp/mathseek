import mongoose, { set, type Document, type Model } from "mongoose";
import { type InterfaceConfig, configSchema } from "./config.model";

export interface InterfaceUser extends Document {
  // extends Document traz .save(), _id, .toJSON()
  username: string;
  email: string;
  hashedPassword: string;
  avatar: BufferSource; // optional usuario pode ter foto padrao (sem foto) // arruma BufferSource
  status: string;
  history: number[];
  config: InterfaceConfig;
}

// todo usuario vai ter um subschema de preferencia
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    history: {
      type: [Number],
      set: arr => Array.from(new Set(arr)),
      required: false,
      default: []
    },
    avatar: {
      type: String, // Ref outside bd
      required: false,
      default: ""
    },
    status: {
      type: String,
      required: false,
      default: ""
    },
    config: {
      type: configSchema,
      default: () => ({})
    }
  },
  { timestamps: true }
);

// userSchema.virtual('coverImagePath').get(function() {
//     if (this.coverImage != null && this.coverImageType != null) {
//         return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
//     }
// })

export const UserSchema: Model<InterfaceUser> = mongoose.model<InterfaceUser>(
  "User",
  userSchema
);
