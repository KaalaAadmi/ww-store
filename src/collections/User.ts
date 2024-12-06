import { CollectionConfig } from 'payload'

export const UserCollection: CollectionConfig = {
  slug: 'users',
  auth: true, // Enable authentication for this collection
  admin: {
    useAsTitle: 'email', // Use the email as the title in the admin panel
  },
  access: {
    // Define access controls for this collection
    create: () => true, // Allow anyone to create a user (registration)
    read: ({ req: { user } }) => {
      // Customers can only access their own profile
      if (user?.role === 'admin') return true // Admins can access all users
      return {
        id: {
          equals: user?.id, // Limit access to the logged-in user's profile
        },
      }
    },
    update: ({ req: { user } }) => {
      // Customers can only update their own profile
      if (user?.role === 'admin') return true // Admins can update all users
      return {
        id: {
          equals: user?.id, // Limit access to the logged-in user's profile
        },
      }
    },
    delete: ({ req: { user } }) => {
      // Customers can only delete their own profile
      if (user?.role === 'admin') return true // Admins can delete all users
      return {
        id: {
          equals: user?.id, // Limit access to the logged-in user's profile
        },
      }
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role', // Role field to differentiate admins and customers
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
      defaultValue: 'customer',
      admin: {
        position: 'sidebar', // Display role in the sidebar in the admin panel
      },
      access: {
        // Allow role changes only from the admin panel
        create: ({ req: { user } }) => user?.role === 'admin', // Admins can set roles during user creation
        update: ({ req: { user }, data }) => {
          // Role updates allowed only if the request is from the admin panel
          const isAdminPanelRequest = user?.role === 'admin' && !data?.isAPIRequest
          return isAdminPanelRequest
        },
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true, // Ensure email is unique across all users
    },
    {
      name: 'password',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'mobileNumber',
      type: 'text',
      validate: (value: string | string[] | null | undefined) => {
        // Optional validation for mobile number
        if (typeof value === 'string' && !/^\+?[0-9]{10,15}$/.test(value)) {
          return 'Invalid mobile number format.'
        }
        return true
      },
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media', // Assuming you have a 'media' collection for file uploads
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, operation, data }: { req: any; operation: any; data: any }) => {
        // Prevent programmatic changes to the role field
        if (operation === 'update' && req?.user?.role !== 'admin' && 'role' in data) {
          delete data.role // Remove role field from updates
        }
      },
    ],
  },
}
