'use client'

// Import header from components/header
import {gql, useQuery } from '@apollo/client';
import Coupon from '../components/Coupon';

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
        <div>
        {data?.coupons.map((coupon) => (
          <Coupon
            key={coupon.id}
            code={coupon.code}
          />
        ))}
        </div>
  );
};