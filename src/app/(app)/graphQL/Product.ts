// import { gql } from 'graphql-request'
export const SEARCH_PRODUCTS = `
  query Products {
    Products(sort: "-createdAt",limit:300) {
      totalDocs
      docs {
        id
        name
        price
        images {
            id
            image {
                id
                url
            }
        }
      }
    }
  }
`

export const FEATURED_PRODUCTS = `
  query Products {
    Products(where: { featured: { equals: true } }) {
      totalDocs
      docs {
        id
        name
        price
        images {
            image {
                id
                url
            }
        }
      }
    }
  }
`

export const FEATURED_TILE_PRODUCTS = `
  query Products {
    Products(limit: 3, where: { featured: { equals: true } }) {
        totalDocs
        docs {
            id
            name
            price
            images {
                image {
                    id
                    url
                }
            }
        }
    }
  }
`

// export const PRODUCT = `
//   query Product($id: String!) {
//     Product(where: { id: { equals: $id } }) {
//       id
//       name
//       price
//       descriptionPara1
//       descriptionPara2
//       descriptionPara3
//       images {
//             id
//             image {
//                 id
//                 url
//             }
//         }
//       featured
//       sizes
//       colors
//       slug
//       updatedAt
//       createdAt
//     }
//   }
// `

export const PRODUCT = `
query Product($id: String!) {
    Product(id: $id) {
        name
        price
        descriptionPara1
        descriptionPara2
        descriptionPara3
        featured
        category
        sizes
        colors
        slug
        updatedAt
        createdAt
        images {
            id
            image {
                id
                text
                url
                width
                height
            }
        }
        highlights {
            highlight
            id
        }
    }
}
`
export const CATEGORY_PRODUCTS = `
query Products($id: Product_category_Input!) {
    Products(sort: "-createdAt", where: { category: { equals: $id } }) {
        totalDocs
        docs {
            id
            name
            price
            descriptionPara1
            descriptionPara2
            descriptionPara3
            featured
            images {
                id
                image {
                    id
                    text
                    url
                }
            }
            sizes
            colors
            slug
            updatedAt
            createdAt
        }
    }
}

`
export const SEARCH_VALUE_PRODUCTS = `
query Products($id: String!) {
    Products(
        where: {
            OR: [
                { name: { contains: $id } }
                { descriptionPara1: { contains: $id } }
                { descriptionPara2: { contains: $id } }
                { descriptionPara3: { contains: $id } }
            ]
        }
    ) {
        totalDocs
        docs {
            id
            name
            price
            descriptionPara1
            descriptionPara2
            descriptionPara3
            images {
                id
                image {
                    id
                    url
                    text
                }
            }
            featured
            sizes
            colors
            slug
            updatedAt
            createdAt
        }
    }
}

`

export const SEARCH_VALUE_CATEGORY_PRODUCTS = `
query Products($id: String!,$slug:Product_category_Input!) {
    Products(
        where: {
            OR: [
                { name: { contains: $id } }
                { descriptionPara1: { contains: $id } }
                { descriptionPara2: { contains: $id } }
                { descriptionPara3: { contains: $id } }
            ]
            category: { equals:  $slug}
        }
    ) {
        totalDocs
        docs {
            id
            name
            price
            descriptionPara1
            descriptionPara2
            descriptionPara3
            images {
                id
                image {
                    id
                    url
                    text
                }
            }
            featured
            sizes
            colors
            slug
            updatedAt
            createdAt
        }
    }
}

`
