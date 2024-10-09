"use client";
import { ModeToggle } from '@/server/utils/ModeToggle';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Appbar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <div className='grid grid-cols-1'>
            <Menubar className='outline-none border-t-neutral-500 border-r-0 border-l-0 border-b-neutral-500'>
                <MenubarMenu>
                    <MenubarTrigger className='cursor-pointer'>Theme</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            <ModeToggle />
                        </MenubarItem>
                    </MenubarContent>
                    <MenubarSeparator />
                </MenubarMenu>

                <MenubarMenu>
                    <Link href="/blogs" passHref>
                        <MenubarTrigger className='cursor-pointer'>Home</MenubarTrigger>
                    </Link>
                </MenubarMenu>

                <MenubarMenu>
                    {session?.user.name && (
                        <Link href="/profile" passHref>
                            <MenubarTrigger className='hover:text-blue-500 hover:underline cursor-pointer'>{session?.user.name}</MenubarTrigger>
                        </Link>
                    )}
                </MenubarMenu>

                <MenubarSeparator className='w-[90%]' />

                <MenubarMenu>
                    {session?.user.email ? (
                        <MenubarTrigger
                            onClick={async () => {
                                await signOut();
                                router.push("/"); 
                            }}
                        >
                            Logout
                        </MenubarTrigger>
                    ) : (
                        <MenubarTrigger onClick={() => router.push("/login")}>Login</MenubarTrigger>
                    )}
                </MenubarMenu>
            </Menubar>
        </div>
    );
};

export default Appbar;
