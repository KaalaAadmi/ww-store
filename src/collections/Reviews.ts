import { CollectionConfig } from 'payload'

export const ReviewsCollection: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'product',
      label: 'Product',
      type: 'relationship',
      relationTo: 'products', // Establish a relationship with the products collection
      required: true,
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text', // You can replace this with a relationship to a users collection if applicable
      required: true,
    },
  ],
}
