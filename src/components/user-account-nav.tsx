'use client'

// import { User } from '@/payload-types'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'
// import { useAuth } from "@/hooks/use-auth";
// import { useClerk } from "@clerk/nextjs";
import Image from 'next/image'
import { LogOut, Shield, User as UserIcon } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { User } from 'payload-types'

const UserAccountNav = ({ user }: { user: User }) => {
  // const { signOut } = useAuth();
  //   const { signOut } = useClerk();
  const { logout } = useAuth()
  const isAdmin = user?.role === 'admin'
  console.log(user?.name)
  const name = user?.name
  console.log('profile image', user?.profileImage)

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild className="overflow-visible">
    //     <Button variant="ghost" size="sm" className="relative">
    //       My account
    //     </Button>
    //   </DropdownMenuTrigger>

    //   <DropdownMenuContent className="bg-white w-60" align="end">
    //     <div className="flex items-center justify-start gap-2 p-2">
    //       <div className="flex flex-col space-y-0.5 leading-none">
    //         <p className="font-medium text-sm text-black">{user.email}</p>
    //       </div>
    //     </div>

    //     <DropdownMenuSeparator />

    //     <DropdownMenuItem asChild>
    //       <Link href="/sell">Seller Dashboard</Link>
    //     </DropdownMenuItem>

    //     <DropdownMenuItem onClick={signOut} className="cursor-pointer">
    //       Log out
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="rounded-full border-none w-fit ">
          <Image
            src={
              user?.profileImage !== undefined
                ? (user.profileImage as string)
                : '/profile-placeholder.png'
            }
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="flex" href="/profile">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem>
              <Link className="flex " href="/admin">
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin Panel</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          {/* <div className="" onClick={() => signOut({ redirectUrl: "/" })}> */}
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          {/* </div> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
