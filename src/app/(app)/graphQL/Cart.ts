export const CART = `
query Carts($id: JSON!)  {
    Carts(where: { userId: { equals: $id } }) {
        totalDocs
        docs {
            id
            userId {
                id
            }
            quantity
            price
            color
            category
            size
            image
            productId {
                id
                name
                category
            }
        }
    }
}
`
