"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../db";
import { blogTypes } from "../types";

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
      blog : [],
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
