"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp"
import { useForm } from "react-hook-form"
 
const formSchema = z.object({
  code: z.string().min(8),
})

export default function UseCoupon() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          code: "",
        },
    })
     
    function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-3">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={8} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please Enter the Coupon Code
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
   
          <Button type="submit">Use Code</Button>
        </form>
      </Form>
    );
}