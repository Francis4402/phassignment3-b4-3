import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        id: z.string({required_error: 'id is required'}),
        password: z.string({required_error: 'password is required'}),
    })
})

const registerVlidationSchema = z.object({
    body: z.object({
        name: z.string({required_error: 'name is required'}),
        email: z.string({required_error: 'email is required'}),
        password: z.string({required_error: 'password is required'}),
    })
});

export const AuthValidation = {
    loginValidationSchema,
    registerVlidationSchema,
}