import { Button } from '@/components/ui/button';

import {gql, useMutation } from '@apollo/client';

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
          const Numtostr = Math.floor(Math.random() * 26) + 64;
          couponCode += String.fromCharCode(Numtostr);
      }
  }
  console.log(couponCode)
  return couponCode;
}


export default function CreateCoupon() {
  const [generate, {data}] = useMutation(GenerateCouponMutation);
  
  return (
      <div>
      <p>Select a User to Create a Coupon</p>

      <Button onClick={() => {
        generate({
          variables: {
            code: generateCode(),
            user: "679dc3111843147c8e89ffc3"
          }},
        )
      }}>Generate Coupon</Button>
      </div>
  );
}