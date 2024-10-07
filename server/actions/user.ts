"use server";

import { loginTypes, signupTypes, userUpdate } from "../types";
import prisma from "../db";
import bcrypt from "bcryptjs";

export async function login({ email, password }: loginTypes) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new Error("User does not exists.");

    const isValid = await bcrypt.compare(password, user?.password || "");

    if (!isValid) throw new Error("Wrong password.");

    return {
      success: true,
      user,
    };
  } catch (e) {
    return {
      success: false,
      message: e || "Something went wrong!",
    };
  }
}

export async function signup({
  name,
  email,
  password,
  image = "",
}: signupTypes) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const hashPass = await bcrypt.hash(password, 10);
    const response = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPass,
      },
    });
    if (!response) throw new Error("Something went wrong");

    return {
      success: true,
      message: "Succesfully created!",
    };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
}

export async function setUser(email: string, data : userUpdate ) {
  try {

    const user = await prisma.user.update({
        where : {
            email
        },
        data : {
            
        }
    })

  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
}
