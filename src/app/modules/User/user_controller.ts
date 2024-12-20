import { httpStatus } from "../../config/status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user_service";

const createUser = catchAsync(async (req, res) => {
    
    const { name, email, password, role } = req.body;

    const payload = {
        name,
        email,
        password,
        role,
      };

    const result = await UserServices.createUserIntoDB(payload);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin is created succesfully',
      data: result,
    });
  });


export const UserController = {
    createUser
}