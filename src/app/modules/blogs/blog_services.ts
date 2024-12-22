import { Types } from "mongoose";
import { TBlogs } from "./blog_interface";
import { Blog } from "./blog_model";
import QueryBuilder from "../../builder/QueryBuilder";
import { QueryParams } from "../../builder/QueryInterface";


const createBlogIntoDB = async (payload: TBlogs) => {
    
    payload.author = new Types.ObjectId(payload.author);
    
    const result = await Blog.create(payload);
    
    return result;
}

const getAllBlogsFromDB = async (queryParams: QueryParams) => {
    const queryBuilder = new QueryBuilder(Blog.find(), queryParams);

  const result = await queryBuilder
    .search(['title', 'content'])
    .filter()
    .sort()
    .build()
    .exec();

  return result;
};


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