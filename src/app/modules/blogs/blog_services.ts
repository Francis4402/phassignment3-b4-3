import { Types } from "mongoose";
import { TBlogs } from "./blog_interface";
import { Blog } from "./blog_model";


const createBlogIntoDB = async (payload: TBlogs) => {
    
    const result = await Blog.create(payload);
    
    return result;
}

const getAllBlogsFromDB = async () => {
    try {
        const result = await Blog.find({});
    
        return result;
    } catch (error) {
        console.log(error);
    }
}

const getSingleBlogFromDB = async (id: string) => {
    try {
        const result = await Blog.findOne({id});
    
        return result;
    } catch (error) {
        console.log(error);
    }
}

const updateBlogIntoDB = async (id: string, payload: Partial<TBlogs>) => {
    try {
        const objectId = new Types.ObjectId(id);

        const result = await Blog.updateOne({_id: objectId}, {$set: payload});
        
        return result;
    } catch (error) {
        console.log(error);
    }
}

const deleteBlogIntoDB = async (id: string) => {
    try {
        const objectId = new Types.ObjectId(id);

        const result = await Blog.deleteOne({_id: objectId });

        return result;
    } catch (error) {
        console.log(error);
    }
}

export const blogServices = {
    createBlogIntoDB, getAllBlogsFromDB, getSingleBlogFromDB, updateBlogIntoDB, deleteBlogIntoDB
}