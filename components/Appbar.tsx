"use client"
import { ModeToggle } from '@/server/utils/ModeToggle'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"

import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'


const Appbar = () => {

    const { data: session } = useSession()
    const router = useRouter()

    return (
        <div className='grid grid-cols-1'>
            <Menubar className='outline-none border-t-neutral-500 border-r-0 border-l-0 border-b-neutral-500'>
                <MenubarMenu>
                    <MenubarTrigger>Theme</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            <ModeToggle />
                        </MenubarItem>
                    </MenubarContent>
                    <MenubarSeparator />
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        Home
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    {session?.user.name && <MenubarTrigger className='min-w-4'>{session?.user.name}</MenubarTrigger>}
                </MenubarMenu>
                <MenubarSeparator className='w-[90%]' />
                <MenubarMenu>
                    {session?.user.email ? (
                        <MenubarTrigger onClick={async () => await signOut()}
                        >{"Logout"}</MenubarTrigger>
                    ) : <MenubarTrigger onClick={() => router.push("/login")}
                    >{"Login"}</MenubarTrigger>}
                </MenubarMenu>
            </Menubar>
        </div>



    )
}

export default Appbar
