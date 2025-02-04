import Coupon from './Coupon';

interface CouponListProps {
  coupons: Coupon[];
}

interface Coupon {
  id: string;
  code: string;
  createdAt: Date;
}

export default function CouponList({ coupons }: CouponListProps) {

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
    {coupons?.map((coupon) => (
      <Coupon
        key={coupon.id}
        code={coupon.code}
        createdAt={new Date(coupon.createdAt)}
      />
    ))}
    </div>
    );
}