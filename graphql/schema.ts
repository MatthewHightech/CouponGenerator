import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
    type Coupon {
        id: String
        code: String
        valid: Boolean
        createdBy: String
    }

    # type Query for reads
    type Query {
        coupons: [Coupon]!
    }

    #type mutation for write/updates
`;
