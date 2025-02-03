interface CouponProps {
    code: string;
  }

export default function Coupon({ code }: CouponProps) {
    return <p>Coupon Code: {code}</p>
}