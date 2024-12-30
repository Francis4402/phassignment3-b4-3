import { model, Schema } from "mongoose";
import { TBlogs } from "./blog_interface";


const BlogSchema = new Schema<TBlogs>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isPublished: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});


export const Blog = model<TBlogs>('Blog', BlogSchema);