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
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Login = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 ">
                <CardHeader>
                    <CardTitle className="text-center">
                        Login
                    </CardTitle>
                    <CardDescription className="text-center">
                        Use email to login
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                    <form action="" className="space-y-3">
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

                        <Button 
                            className="w-full"
                            size="lg"
                            disabled={false}
                        >
                            Login
                        </Button>
                    </form>
                    <p className="text-center">
                        Don't have an account?
                        <Link className="text-sky-600 ml-4 hover:underline" href="sign-up">Sign Up</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default Login;