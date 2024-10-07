"use client";

import { toast } from '@/hooks/use-toast';
import { login } from '@/server/actions/user';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


type FormData = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        try {
            const { email, password } = data

            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/blogs"
            })

            toast({
                title: "Login successfully!"
            })

        } catch (e) {
            toast({
                title: "Login Failed!",
            })

            console.log(e)
        }

    };

    const gitLogin = async () => {
        await signIn("github", { callbackUrl: "/blogs" })
    };
    const googleLogin = async () => {
        await signIn("google", { callbackUrl: "/blogs" })
    };

    return (
        <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-zinc-900 text-white flex justify-center items-center">
                <p className="text-xl font-medium p-6 text-center">"Welcome back to the community."</p>
            </div>

            <div className="flex flex-col justify-center items-center p-6 bg-white">
                <h2 className="text-lg font-semibold mb-4 text-black">Log In</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full max-w-sm">
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

                    <button type="submit" className="bg-black text-white py-2 rounded mt-4">Log In</button>
                </form>

                <div className="mt-3 text-sm text-gray-500">Or log in with</div>
                <div className="flex gap-3 mt-3">
                    <button onClick={gitLogin} className="p-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="w-8" />
                    </button>
                    <button onClick={googleLogin} className="p-2">
                        <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" className="w-8" />
                    </button>
                </div>

                <div className="mt-6">
                    <a href="/signup" className="text-zinc-600 text-sm">Don't have an account? Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
