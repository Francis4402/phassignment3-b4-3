import { httpStatus } from "../../config/status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth_service";


const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUserFromDB(req.body);

    sendResponse(res, {
        success: true,
        message: 'Login successful',
        statusCode: httpStatus.OK,
        data: result,
    })
});


export const AuthController = {
    loginUser
}