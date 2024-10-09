"use server";

import prisma from "../db";
import { blogTypes, updateBlogTypes } from "../types";

export async function getBlogsAll() {
  try {
    const blogs = await prisma.blog.findMany();

    if (!blogs) return { success: false, message: "Something went wrong!" };

    return {
      success: true,
      blogs,
    };
  } catch (e) {
    return {
      success: false,
      blog: [],
      message: e || "Soemthing went wrong!",
    };
  }
}

export async function getBlog(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    return {
      success: true,
      blog,
    };
  } catch (e) {
    return {
      success: false,
      message: e || "Soemthing went wrong!",
    };
  }
}

export async function setBlog({
  title,
  description,
  image,
  userId,
}: blogTypes) {
  try {
    if (!userId) return { succes: false };

    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        image: image || "",
        userId,
      },
    });

    return {
      success: true,
      blog,
    };
  } catch (e) {
    return {
      success: false,
      message: e || "Soemthing went wrong!",
    };
  }
}

export async function getBlogsByUser(userId: string) {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        userId,
      },
    });

    if (!blogs)
      return {
        success: false,
        message: "Not found",
      };

    return {
      success: true,
      blogs: blogs || [],
    };
  } catch (e) {
    return {
      success: false,
      blogs: [],
      message: e || "Soemthing went wrong!",
    };
  }
}

export async function updateBlog(props: updateBlogTypes) {
  try {
    const { id, ...updateData } = props;
    const blog = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        ...updateData,
      },
    });

    return {
      success: true,
      blog,
    };
  } catch (e) {
    return {
      success: false,
      blog: null,
      message: e || "Soemthing went wrong!",
    };
  }
}

export async function getBlogById(id: string) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    if (!blog) throw new Error("Something went wrong!");

    return {
      success: true,
      blog,
    };
  } catch (e) {
    return {
      success: false,
      blog: null,
      message: e || "Soemthing went wrong!",
    };
  }
}
