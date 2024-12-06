import path from 'path'

export const menu = [
  {
    title: 'All',
    path: '/search',
  },
  {
    title: 'Tshirts',
    path: '/search?category=tshirt',
  },
  {
    title: 'Hoodies',
    path: '/search?category=hoodie',
  },
  {
    title: 'Posters',
    path: '/search?category=poster',
  },
]

export type MenuItem = {
  title: string
  path: string
}

export type FooterMenu = Array<{
  title: string
  type: string // E.g., 'headline'
  children: MenuItem[]
}>

export const footer_menu: FooterMenu = [
  {
    title: 'Company',
    type: 'headline',
    children: [
      { title: 'About Us', path: '/about' },
      { title: 'Contact Us', path: '/contact' },
      { title: 'FAQ', path: '/faq' },
      { title: 'Privacy Policy', path: '/privacy' },
    ],
  },
  {
    title: 'Categories',
    type: 'headline',
    children: [
      { title: 'Tshirts', path: '/search?category=tshirt' },
      { title: 'Hoodies', path: '/search?category=hoodie' },
      { title: 'Posters', path: '/search?category=poster' },
    ],
  },
  {
    title: 'Account',
    type: 'headline',
    children: [
      { title: 'Sign In', path: '/sign-in' },
      { title: 'Register', path: '/sign-up' },
      { title: 'My Account', path: '/account' },
      { title: 'My Orders', path: '/account/orders' },
    ],
  },
  {
    title: 'Social',
    type: 'headline',
    children: [
      { title: 'Facebook', path: 'https://facebook.com' },
      { title: 'Instagram', path: 'https://instagram.com' },
      { title: 'Twitter', path: 'https://twitter.com' },
    ],
  },
]

export const faqsList = [
  {
    q: 'What are some random questions to ask?',
    a: "That's exactly the reason we created this random question generator. There are hundreds of random questions to choose from so you're able to find the perfect random question.",
  },
  {
    q: 'Do you include common questions?',
    a: "This generator doesn't include most common questions. The thought is that you can come up with common questions on your own so most of the questions in this generator.",
  },
  {
    q: 'Can I use this for 21 questions?',
    a: "Yes! there are two ways that you can use this question generator depending on what you're after. You can indicate that you want 21 questions generated.",
  },
  {
    q: 'Are these questions for girls or for boys?',
    a: 'The questions in this generator are gender neutral and can be used to ask either male of females (or any other gender the person identifies with).',
  },
  {
    q: 'What do you wish you had more talent doing?',
    a: "If you've been searching for a way to get random questions, you've landed on the correct webpage. We created the Random Question Generator to ask you as many random questions as your heart desires.",
  },
]

// export const cart = [
//   {
//     _id: '671e333e9c8ba015812c55de',
//     userId: 'user_2nwVDviQDf0GOLO3UxGMTiVlold',
//     productId: '67194eb59f8a6e46cd1b2301',
//     productName: 'Shadow of the Uchiha Tee',
//     productImage:
//       'https://res.cloudinary.com/domzptfdk/image/upload/v1729711794/weebWear/products/1729711793084_itachi-black.png',
//     productSize: 'XL',
//     productColor: 'white',
//     productQuantity: 1,
//     productPrice: 19.99,
//     createdAt: '2024-10-27T12:34:06.474Z',
//     updatedAt: '2024-10-27T12:34:06.474Z',
//     __v: 0,
//   },
//   {
//     _id: '671e33489c8ba015812c5602',
//     userId: 'user_2nwVDviQDf0GOLO3UxGMTiVlold',
//     productId: '67193da50a8ea2007031ca27',
//     productName: 'Shikamaru Nara Shadow Strategist Tee',
//     productImage:
//       'https://res.cloudinary.com/domzptfdk/image/upload/v1729707422/weebWear/products/1729707421005_shika-green.png',
//     productSize: 'XL',
//     productColor: 'green',
//     productQuantity: 1,
//     productPrice: 15.99,
//     createdAt: '2024-10-27T12:34:16.889Z',
//     updatedAt: '2024-10-27T12:34:16.889Z',
//     __v: 0,
//   },
//   {
//     _id: '671e333e9c8ba015812c55de',
//     userId: 'user_2nwVDviQDf0GOLO3UxGMTiVlold',
//     productId: '67194eb59f8a6e46cd1b2301',
//     productName: 'Shadow of the Uchiha Tee',
//     productImage:
//       'https://res.cloudinary.com/domzptfdk/image/upload/v1729711794/weebWear/products/1729711793084_itachi-black.png',
//     productSize: 'XL',
//     productColor: 'white',
//     productQuantity: 1,
//     productPrice: 19.99,
//     createdAt: '2024-10-27T12:34:06.474Z',
//     updatedAt: '2024-10-27T12:34:06.474Z',
//     __v: 0,
//   },
//   {
//     _id: '671e33489c8ba015812c5602',
//     userId: 'user_2nwVDviQDf0GOLO3UxGMTiVlold',
//     productId: '67193da50a8ea2007031ca27',
//     productName: 'Shikamaru Nara Shadow Strategist Tee',
//     productImage:
//       'https://res.cloudinary.com/domzptfdk/image/upload/v1729707422/weebWear/products/1729707421005_shika-green.png',
//     productSize: 'XL',
//     productColor: 'green',
//     productQuantity: 1,
//     productPrice: 15.99,
//     createdAt: '2024-10-27T12:34:16.889Z',
//     updatedAt: '2024-10-27T12:34:16.889Z',
//     __v: 0,
//   },
// ]
