import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CouponProps {
    code: string;
    createdAt: Date;
    user: string;
}

export default function Coupon({ code, createdAt, user }: CouponProps) {
    return (
      <Card className="md:h-auto p-1">
        <CardHeader>
            <CardTitle className="">
              Coupon Code: {code.slice(0, code.length/2)}-{code.slice(code.length/2, code.length)}
            </CardTitle>
            <CardDescription className="">
                Created On: <i>{createdAt.toDateString()}</i>
                <br></br>
                Owned By: <i>{user}</i>
            </CardDescription>
        </CardHeader>
      </Card>
    );
}