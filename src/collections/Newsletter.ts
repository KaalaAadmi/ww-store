import { CollectionConfig } from 'payload'

export const NewsletterCollection: CollectionConfig = {
  slug: 'newsletter',
  access: {
    create: () => true,
    read: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      
    },
  ],
  hooks:{
    beforeChange: [
      async ({ originalDoc, data, req }) => {
        const { email } = data
        const existingEmail = originalDoc?.email
        if (email !== existingEmail) {
          const existingNewsletter = await req.payload.find({
            collection: 'newsletter',
            where: { email },
          })
          if (existingNewsletter.totalDocs > 0) {
            throw new Error('Email already exists')
          }
        }
        return data
      }
    ]
  }
}
