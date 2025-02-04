import { Button } from '@/components/ui/button';

import {gql, useMutation } from '@apollo/client';
import apolloClient from "../lib/apollo";

const GenerateCouponMutation = gql`
  mutation CreateCoupon($code: String!, $user: String!) {
    createCoupon(code: $code, user: $user) {
      code
    }
  }
`;

const generateCode = () => {
  let couponCode = "";

  for (let i = 0; i < 9; i++) {
      if (i == 4) {
          couponCode += "-";
      } else {
          // Generate between 97 and 122 (ASCII for lowercase letters)
          const Numtostr = Math.floor(Math.random() * 26) + 65;
          couponCode += String.fromCharCode(Numtostr);
      }
  }
  console.log(couponCode)
  return couponCode;
}
interface CreateCouponProps {
  id: string;
}

export default function CreateCoupon({ id }: CreateCouponProps) {
  const [generate, {data}] = useMutation(GenerateCouponMutation);
  
  return (
      <div>
        <Button variant="destructive" onClick={async () => {
          await generate({
            variables: {
              code: generateCode(),
              user: id
            }},
          )
          await apolloClient.refetchQueries({
            include: "active",
          });
        }}>
          Generate Coupon
        </Button>
      </div>
  );
}