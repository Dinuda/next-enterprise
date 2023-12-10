import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"

const LoginFormSchema = z.object({
  csrfToken: z.string().min(6)
})

type LoginFormValues = z.infer<typeof LoginFormSchema>

// This can come from your database or API.
const defaultValues: Partial<LoginFormValues> = {
  csrfToken: "",
}


export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
    defaultValues,
  })

  function onSubmit(data: LoginFormValues) {
    signIn("email", { email: data.csrfToken })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="csrfToken"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="csrfToken" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
          Continue
        </Button>
      </form>
    </Form>
  )
}
