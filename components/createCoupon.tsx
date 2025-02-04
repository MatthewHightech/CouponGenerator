import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

  for (let i = 0; i < 8; i++) {
      // Generate between 97 and 122 (ASCII for lowercase letters)
      const Numtostr = Math.floor(Math.random() * 26) + 65;
      couponCode += String.fromCharCode(Numtostr);
  }
  return couponCode;
}
interface CreateCouponProps {
  id: string;
  existingCoupons: number;
}

export default function CreateCoupon({ id, existingCoupons }: CreateCouponProps) {
  const [generate, {data}] = useMutation(GenerateCouponMutation);
  
  const CreateCoupon = async () => {
    await generate({
      variables: {
        code: generateCode(),
        user: id
      }},
    ).then(async() => {
      await apolloClient.refetchQueries({
        include: "active",
      });
    }).catch((e) => {
      console.log("Error Creating Coupon")
    })
  }

  let tooltip
  if (existingCoupons >= 5) {
    tooltip = <TooltipContent>
      <p>Each User can only have 5 Coupons</p>
    </TooltipContent>
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className='!pointer-events-auto'>
          <Button
          variant="default"
          disabled={existingCoupons >= 5 || !id? true : false}
          onClick={CreateCoupon}>
            Generate Coupon
          </Button>
        </TooltipTrigger>
        {tooltip}
      </Tooltip>
    </TooltipProvider>
  );
}