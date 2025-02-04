"use client"

import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SignUp = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 ">
                <CardHeader>
                    <CardTitle className="text-center">
                        Sign Up
                    </CardTitle>
                    <CardDescription className="text-center">
                        Use email to create account
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                    <form action="" className="space-y-3">
                        <Input 
                            type="text"
                            disabled={false}
                            placeholder="Full Name"
                            value={""}
                            onChange={() => {}}
                            required
                        />
                        <Input 
                            type="email"
                            disabled={false}
                            placeholder="Email"
                            value={""}
                            onChange={() => {}}
                            required
                        />
                        <Input 
                            type="password"
                            disabled={false}
                            placeholder="Password"
                            value={""}
                            onChange={() => {}}
                            required
                        />
                        <Input 
                            type="password"
                            disabled={false}
                            placeholder="Confirm Password"
                            value={""}
                            onChange={() => {}}
                            required
                        />

                        <Button 
                            className="w-full"
                            size="lg"
                            disabled={false}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <p className="text-center">
                        Already have an account?
                        <Link className="text-sky-600 ml-4 hover:underline" href="login">Login</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default SignUp;