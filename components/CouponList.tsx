import Coupon from './Coupon';

interface CouponListProps {
  coupons: Coupon[];
  user: string;
}

interface Coupon {
  id: string;
  code: string;
  createdAt: Date;
}

export default function CouponList({ coupons, user }: CouponListProps) {

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
    {coupons?.map((coupon) => (
      <Coupon
        key={coupon.code}
        code={coupon.code}
        createdAt={new Date(coupon.createdAt)}
        user={user}
      />
    ))}
    </div>
    );
}