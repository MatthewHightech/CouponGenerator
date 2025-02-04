"use client"
 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp"
import { useForm } from "react-hook-form"
import { gql, useMutation } from "@apollo/client"
import apolloClient from "../lib/apollo";
import { useState } from "react"

import toast, { Toaster } from 'react-hot-toast';

 
const formSchema = z.object({
  code: z.string(),
});

const DeleteCouponMutation = gql`
  mutation DeleteCoupon($code: String!) {
    deleteCoupon(code: $code) {
      code
    }
  }
`;

export default function UseCoupon() {

    const [deleteCoupon, {data}] = useMutation(DeleteCouponMutation);
    const [formMessage, setFormMessage] = useState<string>("Please Enter the Coupon Code");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          code: "",
        },
    })
     
    async function onSubmit(values: z.infer<typeof formSchema>) {
      await deleteCoupon({
        variables: {
          code: values.code.toUpperCase(),
        }},
      ).then(async () => {
        await apolloClient.refetchQueries({
          include: "active",
        });
        setFormMessage("Please Enter the Coupon Code");
        form.reset();
        toast('Congrats! You used a Coupon 🎉')
      })
      .catch((e) => {
        console.log("Error Using Coupon")
        setFormMessage("Code Does Not Exist")
      })
    }

    return (
        <Form {...form}>
        <Toaster />
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-3">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                  maxLength={8} {...field}
                  >
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
                  {formMessage}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
   
          <Button type="submit">Use Coupon</Button>
        </form>
      </Form>
      
    );
}