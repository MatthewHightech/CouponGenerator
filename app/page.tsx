'use client'

// Import header from components/header
import {gql, useQuery } from '@apollo/client';
import CreateCoupon from '@/components/CreateCoupon';
import CouponList from '@/components/CouponList';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useEffect, useState } from 'react';
import UseCoupon from '@/components/UseCoupon';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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

  const [progress, setProgress] = useState(13)
 
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 600)
    return () => clearTimeout(timer)
  }, [])

  let loadingElement
  if (loading) loadingElement = <Progress value={progress} className="w-[40%]" />

  const [currentUserId, setCurrentUserId] = useState<string>()
  // if (error) return <p>Something went wrong: {error.message}</p>
  return (
  <div>
    <div className='p-4 space-x-2 w-full bg-slate-200 shadow-md'>
      <p className='font-bold'>Coupon Generator</p>
      <Badge className='bg-neutral-500'>NextJS</Badge>
      <Badge className='bg-green-800'>MongoDB</Badge>
      <Badge className='bg-teal-500'>Prisma</Badge>
      <Badge className='bg-pink-700'>GraphQL</Badge>
      <Badge className='bg-teal-800'>Nexus</Badge>
      <Badge className='bg-neutral-700'>Apollo</Badge>
      <Badge className='bg-black'>Vercel</Badge>
    </div>

    <div className="container my-4 mx-5 space-y-3">
      <div>
        <p>Select a User to Start</p>
        {loadingElement}
        <ToggleGroup
          type="single"
          defaultValue=""
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
      </div>
      <div className='flex space-x-3'>
        <CreateCoupon
          id={currentUserId}
          existingCoupons={data?.users.find(user => user.id == currentUserId)?.coupons.length}
        ></CreateCoupon>

        <UseCoupon></UseCoupon>
      </div>

      <CouponList
        coupons={data?.users.find(user => user.id == currentUserId)?.coupons}
        user={data?.users.find(user => user.id == currentUserId)?.name}
      ></CouponList>
    </div>
  </div>
  );
};