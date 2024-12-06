import payload, { CollectionConfig, FieldHook, PayloadRequest } from 'payload'
import { v2 as cloudinary } from 'cloudinary'
import searcProductshHandler from './handler'
import { NextRequest } from 'next/server'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

type UploadResponseTypes = {
  public_id?: string
  secure_url?: string
}

const uploadToCloudinary = async (
  filePath: string,
  productName: string,
): Promise<UploadResponseTypes | undefined> => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
      public_id: `${Date.now()}_${productName.replace(/\s+/g, '_')}`,
      folder: 'weeb2/products',
    })
    return {
      public_id: uploadResponse.public_id,
      secure_url: uploadResponse.secure_url,
    }
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error)
    return undefined
  }
}

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-/]+/g, '')
    .toLowerCase()

const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
      return format(value)
    }
    const fallbackData = data?.[fallback] || originalDoc?.[fallback]

    if (fallbackData && typeof fallbackData === 'string') {
      return format(fallbackData)
    }

    return value
  }

export const ProductCollection: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  // endpoints: [
  //   {
  //     method: 'post',
  //     path: '/search',
  //     handler: searcProductshHandler,
  //   },
  // ],
  // endpoints: [
  //   {
  //     method: 'post',
  //     path: '/search',
  //     handler: async (req) => {
  //       const { query, category } = await req.formData()
  //       console.log(query, category)
  //       // const { query } = body
  //       // const { category } = body
  //       try {
  //         const products = await payload.db.collections['products'].aggregate([
  //           {
  //             $search: {
  //               index: 'default',
  //               text: {
  //                 query: query,
  //                 path: {
  //                   wildcard: '*',
  //                 },
  //                 fuzzy: {
  //                   maxEdits: 2,
  //                   prefixLength: 0,
  //                   maxExpansions: 50,
  //                 },
  //               },
  //             },
  //           },
  //         ])
  //         console.log(products)
  //         return Response.json(JSON.stringify(products))
  //       } catch (error) {
  //         console.log(error)
  //         return new Response('Error occurred', { status: 500 })
  //       }
  //     },
  //   },
  // ],
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
    },
    {
      name: 'descriptionPara1',
      label: 'Description Paragraph 1',
      type: 'textarea',
      required: true,
    },
    {
      name: 'descriptionPara2',
      label: 'Description Paragraph 2',
      type: 'textarea',
    },
    {
      name: 'descriptionPara3',
      label: 'Description Paragraph 3',
      type: 'textarea',
    },
    {
      name: 'featured',
      label: 'Featured',
      type: 'checkbox',
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        'tshirt',
        'poster',
        'hoodie',
        'mug',
        'sticker',
        'phone-case',
        'hat',
        'bag',
        'inner',
      ],
      required: true,
    },
    // {
    //   name: 'images',
    //   label: 'Images',
    //   type: 'array',
    //   fields: [
    //     {
    //       name: 'image',
    //       label: 'Image',
    //       type: 'upload',
    //       relationTo: 'media',
    //       required: true,
    //     },
    //   ],
    // },
    {
      name: 'images',
      label: 'Images',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'cloudinaryUrl',
          label: 'Cloudinary URL',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
      ],
      hooks: {
        afterChange: [
          async ({ value, data, originalDoc }) => {
            if (value && Array.isArray(value)) {
              const updatedImages = await Promise.all(
                value.map(async (imageEntry: any) => {
                  const mediaDoc = await payload.findByID({
                    collection: 'media',
                    id: imageEntry.image,
                  })

                  if (mediaDoc?.url) {
                    const uploadResponse = await uploadToCloudinary(mediaDoc.url, data?.name || '')

                    if (uploadResponse?.secure_url) {
                      return {
                        image: imageEntry.image,
                        cloudinaryUrl: uploadResponse.secure_url,
                      }
                    }
                  }
                  return imageEntry
                }),
              )
              if (data) {
                data.images = updatedImages
              }
            }
          },
        ],
      },
    },
    {
      name: 'sizes',
      label: 'Sizes',
      type: 'select',
      hasMany: true,
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '5x7', 'A2', 'A1'],
    },
    {
      name: 'colors',
      label: 'Colors',
      type: 'select',
      hasMany: true,
      options: [
        'White',
        'Black',
        'Blue',
        'Brown',
        'Green',
        'Purple',
        'Navy',
        'Red',
        'Teal',
        'Maroon',
      ],
    },
    {
      name: 'highlights',
      label: 'Highlights',
      type: 'array',
      fields: [
        {
          name: 'highlight',
          label: 'Highlight',
          type: 'text',
        },
      ],
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: { beforeValidate: [formatSlug('name')] },
    },
  ],
}
