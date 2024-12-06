import ContactInfo from '@/components/contact-info'
import FormField from '@/components/form-field'
import React from 'react'

const contactMethods = [
  { value: 'info@weeb-wear.com', label: 'Email' },
  { value: '321-221-231', label: 'Phone' },
]

const supportTypes = [
  {
    title: 'Customer Support',
    description:
      'Our support team is available around the clock to address any concerns or queries you may have',
  },
  {
    title: 'Feedback & Suggestions',
    description:
      'Our support team is available around the clock to address any concerns or queries you may have',
  },
  {
    title: 'Media enquiries',
    description:
      'Our support team is available around the clock to address any concerns or queries you may have',
  },
]

const ContactPage: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col bg-indigo-50">
      <div className="self-center mt-16 w-full max-w-[1314px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-4 w-full max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col max-w-full text-2xl text-neutral-500 w-[463px]">
                <h1 className="text-8xl font-bold text-black max-md:max-w-full max-md:text-4xl">
                  Contact Us
                </h1>
                <p className="mt-8 max-md:max-w-full">
                  Email, call, or complete the form to learn <br />
                  how we make it worth your time
                </p>
                {contactMethods.map((method, index) => (
                  <div key={index} className="mt-8 max-md:max-w-full">
                    <span className="sr-only">{method.label}:</span>
                    {method.value}
                  </div>
                ))}
                <div className="mt-8 text-zinc-800 max-md:max-w-full">Customer Support</div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-start mt-36 max-md:mt-10 max-md:max-w-full">
                {supportTypes.map((support, index) => (
                  <ContactInfo key={index} {...support} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
            <form className="flex flex-col px-10 py-9 mx-auto w-full text-2xl bg-white rounded-[50px] text-neutral-500 max-md:px-5 max-md:mt-7 max-md:max-w-full">
              <h2 className="self-start text-5xl font-bold text-black max-md:text-4xl">
                Get in Touch
              </h2>
              <p className="self-start mt-3 text-base">You can reach us anytime</p>
              <div className="flex gap-5 mt-14 max-md:mt-10 max-md:max-w-full">
                <FormField id="firstName" type="text" placeholder="First Name" className="flex-1" />
                <FormField id="lastName" type="text" placeholder="Last Name" className="flex-1" />
              </div>
              <FormField id="email" type="email" placeholder="Your Email" className="mt-8" />
              <FormField id="phone" type="tel" placeholder="Phone Number" className="mt-8" />
              <div className="mt-8">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full h-36 px-5 py-3 bg-white rounded-2xl border border-black border-solid"
                  aria-label="Message"
                />
              </div>
              <button
                type="submit"
                className="px-16 py-4 mt-8 text-3xl font-bold text-white whitespace-nowrap bg-black rounded-2xl border border-black border-solid max-md:px-5 max-md:max-w-full"
              >
                SUBMIT
              </button>
              <p className="self-center mt-3 text-base text-center">
                By contacting us, you agree to our <span className="font-bold">Terms</span>
                <br />
                <span className="font-bold">of service</span> an{' '}
                <span className="font-bold">Privacy Policy</span>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 justify-evenly items-center px-16 py-14 mt-28 w-full text-2xl text-black bg-white min-h-[786px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd093dc1357f910ba20b078f113af5df0e869e635a047aae0814c7fb44e580a6?placeholderIfAbsent=true&apiKey=514c79f4aed04c1788291a73088cc5e0"
          alt="Office location map"
          className="object-contain self-stretch my-auto aspect-[0.9] min-w-[240px] rounded-[50px] w-[603px] max-md:max-w-full"
        />
        <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[594px] max-md:max-w-full">
          <div className="max-md:max-w-full">Our Location</div>
          <h2 className="mt-11 text-5xl font-bold max-md:mt-10 max-md:max-w-full max-md:text-4xl">
            Connecting Near and Far
          </h2>
          <h3 className="mt-11 font-bold max-md:mt-10 max-md:max-w-full">Headquarters</h3>
          <address className="mt-11 text-xl leading-9 text-neutral-400 max-md:mt-10 not-italic">
            Weeb Wear
            <br />
            1234 Dublin, Ireland
            <br />
            123 Tech Boulevard, Suite 456
            <br />
            San Francisco, CA 12345
            <br />
            United States
          </address>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
