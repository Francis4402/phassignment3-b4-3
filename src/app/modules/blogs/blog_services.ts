import { Types } from "mongoose";
import { TBlogs } from "./blog_interface";
import { Blog } from "./blog_model";
import QueryBuilder from "../../builder/QueryBuilder";
import { QueryParams } from "../../builder/QueryInterface";
import AppError from "../../errors/AppError";
import { httpStatus } from "../../config/status";


const createBlogIntoDB = async (payload: TBlogs) => {
    payload.author = new Types.ObjectId(payload.author);
    
    const result = await Blog.create(payload);
    
    return result;
};

const getAllBlogsFromDB = async (queryParams: QueryParams) => {

    const queryBuilder = new QueryBuilder(Blog.find({ isPublished: true }), queryParams);

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
        const result = await Blog.findOne({_id: id});

        if(!result) {
            throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
        }

        if(result._id.toString() !== id) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Blog not found');
        }
    
        return result;
    } catch (error) {
        console.log(error);
    }
}

const updateBlogIntoDB = async (id: string, payload: Partial<TBlogs>) => {
    try {
        const objectId = new Types.ObjectId(id);

        const result = await Blog.updateOne({_id: objectId}, {$set: payload});

        if (result.matchedCount === 0) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Blog not found for update');
        }
        
        return result;
    } catch (error) {
        console.log(error);
    }
}

const deleteBlogIntoDB = async (id: string) => {
    try {
        const objectId = new Types.ObjectId(id);

        const result = await Blog.deleteOne({_id: objectId });

        if (result.deletedCount === 0) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Blog not found for deletion');
        }

        return result;
    } catch (error) {
        console.log(error);
    }
}

export const blogServices = {
    createBlogIntoDB, getAllBlogsFromDB, getSingleBlogFromDB, updateBlogIntoDB, deleteBlogIntoDB
}