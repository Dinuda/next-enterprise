"use client"
import "react-international-phone/style.css"
import "./register-form.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { PhoneInput } from "react-international-phone"
import * as z from "zod"

import { Button } from "components/ui/button"
import { Calendar } from "components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { cn } from "lib/utils"

const RegisterFormSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number"),
  studentName: z.string().min(2),
  address: z.string().min(2),
  doB: z.string().refine((val) => {
    if (!val) return false
    const date = new Date(val)
    if (date > new Date() || date < new Date(1900, 1, 1)) return false
    return !isNaN(date.getTime())
  }),
})

type RegisterFormValues = z.infer<typeof RegisterFormSchema>

// This can come from your database or API.
const defaultValues: Partial<RegisterFormValues> = {
  email: "",
  phone: "",
  studentName: "",
  address: "",
  doB: "",
}

export function RegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: RegisterFormValues) {
    console.log(data)

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        phone: data.phone,
        name: data.studentName,
        address: data.address,
        dob: data.doB,
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

  const handlePhoneChange = (phone: string) => {
    form.setValue("phone", phone)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    disableFormatting={true}
                    defaultCountry="ua"
                    {...field}
                    onChange={handlePhoneChange}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="1234 Main St" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="doB"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <br></br>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => {
                          field.onChange(date!.toISOString()) // Assuming you want to store the date as ISO string
                        }}
                        initialFocus
                        required
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
            Sign up
          </Button>
        </form>
      </Form>
    </>
  )
}
