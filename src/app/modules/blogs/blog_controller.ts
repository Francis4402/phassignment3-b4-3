import { httpStatus } from "../../config/status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog_services";


const createBlogs = catchAsync(async (req, res) => {
    const {title, content, isPublished} = req.body;

    const payload = {
        title, content, author: req.user._id, isPublished
    };

    const result = await blogServices.createBlogIntoDB(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is created successfully',
        data: result,
    })
});

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await blogServices.getAllBlogsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs are fetched successfully',
        data: result,
    })
});

const getSingleBlog = catchAsync(async (req, res) => {
    const {id} = req.params;

    const result = await blogServices.getSingleBlogFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is fetched successfully',
        data: result,
    })
});

const updateBlog = catchAsync(async (req, res) => {
    const {id} = req.params;
    const {title, content} = req.body;

    const payload = {
        title, content
    };

    const result = await blogServices.updateBlogIntoDB(id, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is updated successfully',
        data: result,
    })
});

const deleteBlog = catchAsync(async (req, res) => {
    const {id} = req.params;

    const result = await blogServices.deleteBlogIntoDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog is deleted successfully',
        data: result,
    })
});

export const BlogController = {
    createBlogs, getAllBlogs, getSingleBlog, updateBlog, deleteBlog
}