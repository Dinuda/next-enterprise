"use client"
import "react-international-phone/style.css"
import "./register-form.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { PhoneNumberUtil } from "google-libphonenumber"
import { Calendar as CalendarIcon } from "lucide-react"
import { useRouter } from 'next/navigation'
import React from "react"
import { useForm } from "react-hook-form"
import { PhoneInput } from "react-international-phone"
import * as z from "zod"
import { Button } from "components/ui/button"
import { Calendar } from "components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { useAuthStore } from "lib/state/auth.store"
import { cn } from "lib/utils"

const RegisterFormSchema = z.object({
  email: z.string().email(),
  phone: z.string().refine((val) => {    
    if (val === "") return true;
    const phoneUtil = PhoneNumberUtil.getInstance()
    try {
      // wait for initialisation
      const phone = phoneUtil.parseAndKeepRawInput(val)
      return phoneUtil.isValidNumber(phone)
    } catch (e) {
      return false
    }
  }),
  studentName: z.string().min(2),
  address: z.string().min(2),
  doB: z.string().refine((val) => {
    if (!val) return false
    const date = new Date(val)
    if (date > new Date() || date < new Date(1900, 1, 1)) return false
    return !isNaN(date.getTime())
  }),
  parentName: z.string().min(2),
  country: z.string()
})

type RegisterFormValues = z.infer<typeof RegisterFormSchema>

// This can come from your database or API.
const defaultValues: Partial<RegisterFormValues> = {
  parentName: "",
  email: "",
  phone: "+94",
  studentName: "",
  address: "",
  doB: "",
  country: "lk"
}



export function RegisterForm() {
  const { setEmail, setPhone } = useAuthStore()
  const router = useRouter()

  // add to state
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onChange",
    defaultValues,
  })

  function onSubmit(data: RegisterFormValues) {     
    setEmail(data.email)
    setPhone(data.phone)   
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        phone: data.phone,
        name: data.parentName,
        address: data.address,
        doB: data.doB,
        country: data.country,
        studentName: data.studentName,
      }),
    }).then(async (res) => {
      if (res.status === 201) {
        router.push("/auth/otp")
      } else {
        const { error } = (await res.json()) as { error: string }
        console.log(error)
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
            control={form.control}
            name="parentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <PhoneInput defaultCountry="lk" {...field} />
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
