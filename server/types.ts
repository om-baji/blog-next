import { StringValidation, z } from "zod";

export const signupSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(6),
    image : z.string().optional()
})

export const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})

export const blogSchema = z.object({
    title : z.string(),
    description : z.string(),
    image : z.string().optional(),
    userId : z.string().optional()
})

export type userUpdate = {
    name? : string;
    email : string;
    password? : string;
    image? : string;
}

export type loginTypes = z.infer<typeof loginSchema>
export type signupTypes = z.infer<typeof signupSchema>
export type blogTypes = {
    id? : string;
    title : string;
    description : string;
    image? : string | null;
    userId : string;
    createdAt? : Date;
    updatedAt? : Date;
}

export type userTypes = {
    name : string;
    id  : string;
    image? : string | null;
    email : string;
}

export type updateBlogTypes = {
    id : string;
    title? : string;
    description? : string;
    userId? : string;
    image? : string | null;
    createdAt? : Date;
    updatedAt? : Date
}