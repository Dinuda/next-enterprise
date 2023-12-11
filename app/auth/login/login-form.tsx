import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Icons } from "components/ui/icon"
import { Input } from "components/ui/input"

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type LoginFormValues = z.infer<typeof LoginFormSchema>

// This can come from your database or API.
const defaultValues: Partial<LoginFormValues> = {
  email: "",
  password: "",
}

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
    defaultValues,
  })

  function onSubmit(data: LoginFormValues) {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid">
          <Button variant="outline" onClick={() => signIn("facebook")}>
            <Icons.Facebook className="mr-2 h-8 w-4" />
            Facebook
          </Button>
        </div>
        <div className="grid">
          <Button variant="outline" onClick={() => signIn("google")}>
            <Icons.Google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@xyz.com" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
          Continue
        </Button>
      </form>
    </Form>
  )
}
