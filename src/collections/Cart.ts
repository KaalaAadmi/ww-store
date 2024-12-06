import { CollectionConfig } from 'payload'

export const CartCollection: CollectionConfig = {
  slug: 'carts',
  access: {
    create: ({ req: { user } }) => !!user, // Allow only authenticated users to create cart entries
    read: ({ req: { user } }) => {
      if (!user)
        return false // Restrict unauthenticated access
      else if (user.role === 'admin') return true // Admins can access all cart items
      return {
        userId: {
          equals: user.id, // Users can only access their own cart items
        },
      }
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      else if (user.role === 'admin') return true // Admins can access all cart items

      return {
        userId: {
          equals: user.id, // Allow updates only for the user's own cart items
        },
      }
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      else if (user.role === 'admin') return true // Admins can access all cart items

      return {
        userId: {
          equals: user.id, // Allow deletions only for the user's own cart items
        },
      }
    },
  },
  fields: [
    {
      name: 'userId',
      label: 'User ID',
      type: 'relationship',
      relationTo: 'users', // Assumes you have a 'users' collection
      required: true,
      admin: {
        readOnly: true, // Prevent manual editing in admin UI
      },
      index: true, // Indexed for faster database queries
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'productId',
      label: 'Product ID',
      type: 'relationship',
      relationTo: 'products', // Assumes you have a 'products' collection
      required: true,
    },
    {
      name: 'quantity',
      label: 'Quantity',
      type: 'number',
      required: true,
      min: 1, // Minimum value to ensure valid quantities
      admin: {
        step: 1,
      },
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true, // Ensure the price field is always present
      admin: {
        readOnly: true, // Price is derived from the product and cannot be manually edited
      },
    },
    {
      name: 'color',
      label: 'Color',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'text',
      required: true,
    },
    {
      name: 'size',
      label: 'Size',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'text',
      // relationTo: 'media', // Assumes you have a 'media' collection
      required: true,
    },
  ],
  admin: {
    useAsTitle: 'userId',
    defaultColumns: ['userId', 'productId', 'quantity', 'price'], // Default columns in admin UI
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        // Automatically associate the current user with the cart entry on create
        if (!originalDoc && req.user) {
          data.userId = req.user.id
        }
        return data
      },
    ],
    beforeValidate: [
      async ({ data, req, operation }) => {
        // Ensure price is set from the related product on create
        if (operation === 'create' && data && data.productId) {
          const product = await req.payload.findByID({
            collection: 'products',
            id: data.productId,
          })

          if (product) {
            data.price = product.price // Automatically set the product price
          }
        }
      },
    ],
  },
}
