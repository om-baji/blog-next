"use client";

import { toast } from '@/hooks/use-toast';
import { signup } from '@/server/actions/user';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
    name: string;
    email: string;
    password: string;
};

const Signup: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        try {

            const { name, email, password } = data

            const res = await signup({ name, email, password })

            if (!res.success) {
                toast({
                    title: "Signup failed"
                })

                return;
            }

            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/blogs"
            })

            toast({
                title: "Login successfully!",
            })

        } catch (e) {
            toast({
                title: "Login Failed!",
            })

            console.log(e)
        }

    };

    const gitSignup = async () => {
        await signIn("github", { callbackUrl: "/blogs" })
    };
    const googleSignup = async () => {
        await signIn("google", { callbackUrl: "/blogs" })
    };

    return (
        <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-zinc-900 text-white flex justify-center items-center">
                <p className="text-xl font-medium p-6 text-center">"Join creators and innovators."</p>
            </div>

            <div className="flex flex-col justify-center items-center p-6 bg-white">
                <h2 className="text-lg font-semibold mb-4 text-black">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full max-w-sm">
                    <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        className="border border-zinc-300 p-2 rounded focus:outline-none focus:border-zinc-500"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="border border-zinc-300 p-2 rounded focus:outline-none focus:border-zinc-500"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="border border-zinc-300 p-2 rounded focus:outline-none focus:border-zinc-500"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                    <button type="submit" className="bg-black text-white py-2 rounded mt-4">Sign Up</button>
                </form>

                <div className="mt-3 text-sm text-gray-500">Or sign up with</div>
                <div className="flex gap-3 mt-3">
                    <button onClick={gitSignup} className="p-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="w-8" />
                    </button>
                    <button onClick={googleSignup} className="p-2">
                        <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" className="w-8" />
                    </button>
                </div>

                <div className="mt-6">
                    <a href="/login" className="text-zinc-600 text-sm">Already have an account? Log in</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
