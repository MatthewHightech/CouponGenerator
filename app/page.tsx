'use client'

// Import header from components/header
import {gql, useQuery } from '@apollo/client';
import CreateCoupon from '@/components/CreateCoupon';
import CouponList from '@/components/CouponList';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';

const AllUsersQuery = gql`
  query {
    users {
      name
      id
      image
      coupons {
        code
        createdAt
        valid
      }
    }
  }
`;
 
export default function HomePage() {

  const {data, error, loading} = useQuery(AllUsersQuery);

  const [currentUserId, setCurrentUserId] = useState<string>()
  // if (error) return <p>Something went wrong: {error.message}</p>
  return (
    <div className="container my-10 mx-5 space-y-3">

      <p className='font-bold'>Coupon Generator</p>
      <p>Select a User to Start</p>

      <ToggleGroup
        type="single"
        defaultValue=''
        onValueChange={(value) => {
          setCurrentUserId(value)
          }
        }
        >
        {data?.users.map((user) => (
          <ToggleGroupItem value={user.id} key={user.id} className='h-full p-2'>
              <p>{user.name}</p>
              <Avatar>
                <AvatarImage src={user.image} />
              </Avatar>
            </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <CreateCoupon
        id={currentUserId}
        existingCoupons={data?.users.find(user => user.id == currentUserId)?.coupons.length}
      ></CreateCoupon>
      
      <CouponList
        coupons={data?.users.find(user => user.id == currentUserId)?.coupons}
      ></CouponList>
    </div>
  );
};