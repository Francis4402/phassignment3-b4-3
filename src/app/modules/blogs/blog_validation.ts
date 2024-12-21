import { z } from "zod";

const blogValidationSchema = z.object({
    body: z.object({
        title: z.string({required_error: 'title is required'}),
        content: z.string({required_error: 'content is required'}),
        isPublished: z.boolean({required_error: 'isPublished is required'}),
        author: z.string({required_error: 'author is required'}),
    })
})

export const BlogValidation = {
    blogValidationSchema
}