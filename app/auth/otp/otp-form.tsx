import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"

const OTPFormSchema = z.object({
  otp: z.string().min(6).max(6),
})

type OTPFormValues = z.infer<typeof OTPFormSchema>

// This can come from your database or API.
const defaultValues: Partial<OTPFormValues> = {
  otp: "",
}

export function OTPForm({ userId }: { userId: string }) {
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(OTPFormSchema),
    mode: "onChange",
    defaultValues,
  })

  function onSubmit(data: OTPFormValues) {
    fetch("/api/auth/otp/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp: data.otp,
        userId: userId,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        setTimeout(() => {}, 2000)
      } else {
        const { error } = (await res.json()) as { error: string }
        console.log(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="number" placeholder="123456" {...field} required />
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
