import { httpStatus } from "../../config/status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "../blogs/blog_services";
import { adminServices } from "./admin_services";


const updateUserBlocked = catchAsync(async (req, res) => {
    const {id} = req.params;

    const result = await adminServices.updateUserBlockedFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is blocked successfully',
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

export const AdminController = {
    updateUserBlocked, deleteBlog
}