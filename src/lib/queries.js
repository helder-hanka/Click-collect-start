import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    query($category: String!) {
        products(category: $category) {
            id
            name
            price
            filter
        }
    }
`;

export const GET_ORDERS = gql`
query($ownerId: String){
    orders(ownerId: $ownerId){
        id
        date
        items {
            name
        }
    }
}`

export const ADD_ORDER = gql`
    mutation($id: ID, $ownerId: String!, $date: String!, $pickupDate: String!, $clientDetails: String!, $total: Float!, $items: [ProductInput]) {
        addOrder(id: $id, ownerId: $ownerId, date: $date, pickupDate: $pickupDate, clientDetails: $clientDetails, total: $total, items: $items ) {
            clientDetails,
            items {
                name
            }
        }
    }
`