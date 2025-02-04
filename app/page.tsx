'use client'

// Import header from components/header
import {gql, useQuery } from '@apollo/client';
import Coupon from '../components/Coupon';
import CreateCoupon from '@/components/createCoupon';

const AllCouponsQuery = gql`
  query {
    coupons {
      code
      createdAt
      createdBy {
        name
      }
      valid
      id
    }
  }
`;
 
export default function HomePage() {

  const {data, error, loading} = useQuery(AllCouponsQuery);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong: {error.message}</p>

  return (
    <div className="container my-20">

      <div className='container m-5'>
        <p className='font-bold'>Coupon Generator</p>
        <CreateCoupon></CreateCoupon>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
      {data?.coupons.map((coupon) => (
        <Coupon
          key={coupon.id}
          code={coupon.code}
          createdAt={new Date(coupon.createdAt)}
        />
      ))}
      </div>
    </div>
  );
};