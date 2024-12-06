import path from 'path'
// import { postgresAdapter } from '@payloadcms/db-postgres'
// import { searchPlugin } from '@payloadcms/plugin-search'
import { en } from 'payload/i18n/en'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { ProductCollection } from '@/collections/Product/Product'
import { create } from 'domain'
import { CartCollection } from '@/collections/Cart'
import { UserCollection } from '@/collections/User'
import { NewsletterCollection } from '@/collections/Newsletter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  //editor: slateEditor({}),
  editor: lexicalEditor(),
  collections: [
    // {
    //   slug: 'users',
    //   auth: true,
    //   access: {
    //     delete: () => false,
    //     update: () => false,
    //   },
    //   fields: [],
    // },
    UserCollection,
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
    },
    {
      slug: 'media',
      upload: true,
      access: {
        read: () => true,
        admin: () => true,
      },
      admin: {
        useAsTitle: 'text',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    },
    ProductCollection,
    CartCollection,
    NewsletterCollection,
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.POSTGRES_URI || ''
  //   }
  // }),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),

  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { en },
  },

  admin: {
    autoLogin: {
      email: 'dev@payloadcms.com',
      password: 'test',
      prefillOnly: true,
    },
  },
  // plugins: [
  //   searchPlugin({
  //     collections: ['products'],
  //     defaultPriorities: {
  //       products: 20,
  //     },
  //   }),
  // ],
  async onInit(payload) {
    const existingUsers = await payload.find({
      collection: 'users',
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'dev@payloadcms.com',
          password: 'test',
          role: 'admin',
          name: 'Admin',
        },
      })
    }
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
})
