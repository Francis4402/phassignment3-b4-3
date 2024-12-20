import { Types } from "mongoose";
import { TBlogs } from "./blog_interface";
import { Blog } from "./blog_model";


const createBlogIntoDB = async (payload: TBlogs) => {
    
    const result = await Blog.create(payload);
    
    return result;
}

const getAllBlogsFromDB = async () => {
    const result = await Blog.find({});
    
    return result;
}

const getSingleBlogFromDB = async (id: string) => {
    const result = await Blog.findOne({id});
    
    return result;
}

const updateBlogIntoDB = async (id: string, payload: Partial<TBlogs>) => {

    const objectId = new Types.ObjectId(id);

    const result = await Blog.updateOne({_id: objectId}, {$set: payload});
    
    return result;
}

const deleteBlogIntoDB = async (id: string) => {

    const objectId = new Types.ObjectId(id);

    const result = await Blog.deleteOne({_id: objectId });

    return result;
}

export const blogServices = {
    createBlogIntoDB, getAllBlogsFromDB, getSingleBlogFromDB, updateBlogIntoDB, deleteBlogIntoDB
}