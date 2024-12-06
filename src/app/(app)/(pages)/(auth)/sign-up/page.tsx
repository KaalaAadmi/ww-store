'use client'

import { Icons } from '@/components/Icons'
import MaxWidthWrapper from '@/components/max-width-wrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/auth-context'
import { cn } from '@/lib/utils'
import { ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
// import { toast } from "sonner";
import { useRouter, useSearchParams } from 'next/navigation'
// import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState } from 'react'
// import { useSignUp } from "@clerk/nextjs";
import { useForm } from 'react-hook-form'
// import VerifyEmail from "@/components/VerifyEmail";
type FormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}
const Page = () => {
  const [isLoading, setIsLoading] = useState(false)
  //   const { isLoaded, signUp } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState<boolean>(false)
  // const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [showConfirmPassword, setShowConfirmPassword] =
  //   useState<boolean>(false);
  // const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>('')

  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
  })

  const searchParams = useSearchParams()
  const { login, create } = useAuth()
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    const { name, email, password, confirmPassword } = data
    console.log(name, email, password, confirmPassword)
    event?.preventDefault()
    const redirect = searchParams.get('redirect')
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, 1000)
    try {
      const userData = {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      }
      await create(userData)
      await login(data)
      clearTimeout(timer)
      if (redirect) router.push('/?signedUp=true')
      else router.push(`/?signedUp=true`)
    } catch (_) {
      clearTimeout(timer)
      setError('There was an error registering. Please try again.')
    }
  }

  return (
    <MaxWidthWrapper>
      <div className="container relative flex py-20 flex-col items-center justify-center lg:px-0">
        {!pendingVerification && (
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-2 text-center">
              <Icons.logo className="h-20 w-20" />
              <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>

              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: 'gap-1.5',
                })}
                href="/sign-in"
              >
                Already have an account? Sign-in
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      {...register('name', { required: 'Name is required' })}
                      className={cn({
                        'focus-visible:ring-red-500': errors.name,
                      })}
                      placeholder="John Doe"
                    />
                    {errors?.name && (
                      <p className="text-sm text-red-500">{errors?.name.message as string}</p>
                    )}
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...register('email', { required: 'Email is required' })}
                      className={cn({
                        'focus-visible:ring-red-500': errors.email,
                      })}
                      placeholder="you@example.com"
                    />
                    {errors?.email && (
                      <p className="text-sm text-red-500">{errors?.email.message as string}</p>
                    )}
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      {...register('password', {
                        required: 'Password is required',
                      })}
                      type="password"
                      className={cn({
                        'focus-visible:ring-red-500': errors.password,
                      })}
                      placeholder="Password"
                    />
                    {errors?.password && (
                      <p className="text-sm text-red-500">{errors.password.message as string}</p>
                    )}
                  </div>
                  <div className="grid gap-1 py-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                      })}
                      type="password"
                      className={cn({
                        'focus-visible:ring-red-500': errors.confirmPassword,
                      })}
                      placeholder="Confirm Password"
                    />
                    {errors?.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmPassword.message as string}
                      </p>
                    )}
                  </div>
                  {error && <p className="text-sm text-red-500">{error as string}</p>}
                  <Button disabled={isLoading} className="mt-4">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign up
                  </Button>{' '}
                </div>
              </form>
            </div>
          </div>
        )}
        {/* {pendingVerification && (
          <VerifyEmail
            // code={code}
            // setCode={setCode}
            // pendingVerification={pendingVerification}
            setPendingVerification={setPendingVerification}
          />
        )} */}
      </div>
    </MaxWidthWrapper>
  )
}

export default Page
