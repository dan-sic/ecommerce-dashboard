'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

const schema = z.object({
  email: z.string().email(),
})
type FormData = z.infer<typeof schema>

export const AuthForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const result = await signIn('email', {
      email: data.email,
      callbackUrl: '/',
      redirect: false,
    })

    if (result?.ok) {
      console.log('Email sent')
    } else {
      console.error(result?.error)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Sign in with email
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button className="w-full" onClick={() => signIn('google')}>
          Google
        </Button>
      </CardContent>
    </Card>
  )
}