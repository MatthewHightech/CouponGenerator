import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CouponProps {
    code: string;
    createdAt: Date;
}

export default function Coupon({ code, createdAt }: CouponProps) {
    return (
      <Card className="md:h-auto p-1 ">
        <CardHeader>
            <CardTitle className="">
              Coupon Code: {code}
            </CardTitle>
            <CardDescription className="">
                This coupon was created On: <i>{createdAt.toDateString()}</i>
            </CardDescription>
        </CardHeader>
      </Card>
    );
}