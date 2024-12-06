import Footer from '@/components/footer'
import React from 'react'

const PrivacyPolicy = () => {
  return (
    <section>
      <div className="bg-gray-100">
        {/* Title Container */}
        <div className="mx-auto w-full max-w-5xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
          {/* Title Component */}
          <div className="flex flex-col items-stretch self-center text-center">
            <h1 className="mb-5 text-4xl font-bold md:text-6xl">Terms of Service</h1>
            <p className="mb-10 flex-col text-gray-500">
              Read our terms below to learn more about your rights and responsibilities as a Flow
              user.
            </p>

            <img
              src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPLaceholder%20Image%20Secondary.svg?alt=media&token=b8276192-19ff-4dd9-8750-80bc5f7d6844"
              alt="Placeholder"
              className="inline-block w-full rounded-2xl object-cover max-h-[540px]"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
        {/* Terms Component */}
        <div className="flex min-w-full flex-col items-start gap-y-5">
          {/* Term */}
          <h4 className="mb-5 text-xl font-extrabold sm:text-xl md:text-2xl">
            Terms and legal conditions
          </h4>
          <p className="mb-2 text-sm">
            This Terms of Service (&quot;Agreement&quot;) governs the use of design services
            provided by Flowspark (&quot;Company&quot;) to clients (&quot;Client&quot; or
            &quot;Clients&quot;). By accessing or using any services provided by the Company,
            Clients agree to be bound by these Terms of Service.
          </p>
          {/* Term */}
          <h4 className="text-xl font-extrabold sm:text-xl md:text-2xl">Services</h4>
          <p className="mb-2 text-sm">
            Flowspark offers a comprehensive range of design services, including but not limited to
            graphic design, web design, branding, illustration, and user interface design. The
            Company will provide the agreed-upon services with professionalism, creativity, and
            technical expertise, while adhering to industry standards, design principles, and best
            practices. The specific details, deliverables, timelines, and pricing for each project
            will be outlined in a separate agreement or proposal, mutually agreed upon by the
            Company and the Client.
          </p>
          {/* Term */}
          <h4 className="text-xl font-extrabold sm:text-xl md:text-2xl">Client Responsibilities</h4>
          <p className="mb-2 text-sm">
            The Client agrees to provide accurate and timely information, materials, and feedback
            necessary for the successful completion of the project. The Client is responsible for
            obtaining any necessary permissions, licenses, or copyrights for materials provided to
            the Company for use in the project, including but not limited to logos, images, text,
            and any other intellectual property. The Client acknowledges that delays or failures in
            providing required materials or feedback may impact project timelines, deliverables, and
            the overall success of the project.
          </p>
          {/* Term */}
          <h4 className="text-xl font-extrabold sm:text-xl md:text-2xl">Intellectual Property</h4>
          <p className="mb-2 text-sm">
            Any intellectual property rights, including but not limited to copyrights and
            trademarks, in the final deliverables created by the Company shall be transferred to the
            Client upon receipt of full payment unless otherwise agreed upon in writing. The Client
            warrants that any materials provided to the Company for use in the project do not
            infringe upon the intellectual property rights of any third party.
          </p>
          {/* Term */}
          <h4 className="text-xl font-extrabold sm:text-xl md:text-2xl">Payment</h4>
          <p className="mb-2 text-sm">
            The Client agrees to pay the Company the agreed-upon fees for the services rendered.
            Payment terms, including the amount, method, and schedule, will be specified in the
            separate agreement or proposal. The Company reserves the right to suspend or terminate
            services in the event of non-payment or late payment.
          </p>
          <h4 className="text-xl font-extrabold sm:text-xl md:text-2xl">Confidentiality</h4>
          <p className="mb-2 text-sm">
            The Company and the Client agree to keep confidential any proprietary or sensitive
            information disclosed during the course of the project. Both parties shall take
            reasonable measures to protect such information from unauthorized access or disclosure.
          </p>
          <h4 className="text-xl font-extrabold sm:text-xl md:text-2xl">Limitation of Liability</h4>
          <p className="mb-2 text-sm">
            The Company shall not be liable for any direct, indirect, incidental, or consequential
            damages arising out of the use or inability to use the services provided. The Client
            acknowledges that the Company&apos;s liability is limited to the amount paid for the
            services rendered.
          </p>
          <h4 className="text-xl font-extrabold sm:text-xl md:text-2xl">Termination</h4>
          <p className="mb-2 text-sm">
            Either party may terminate this Agreement with written notice if the other party
            breaches any material provision and fails to remedy the breach within a reasonable time.
            In the event of termination, the Client shall pay the Company for the services provided
            up to the termination date.
          </p>
          {/* Term */}
          <h4 className="text-xl font-extrabold sm:text-xl md:text-2xl">Governing Law</h4>
          <p className="mb-2 text-sm">
            This Agreement shall be governed by and construed in accordance with the laws of [Your
            Jurisdiction]. Any disputes arising out of this Agreement shall be subject to the
            exclusive jurisdiction of the courts of [Your Jurisdiction].
          </p>
          {/* Term */}
          <div className="min-h-[1px] min-w-full bg-gray-300"></div>
          <p className="mb-2 text-sm">
            By accessing, browsing, or utilizing any design services, communication channels, or
            materials provided by Flowspark, including but not limited to graphic design, web
            design, branding, illustration, and user interface design, whether through our website,
            email, phone, or any other means, you expressly acknowledge, understand, and agree that
            you have carefully read, comprehended, and fully consent to be legally bound by all the
            provisions, terms, and conditions set forth in these Terms of Service, including any
            additional agreements, policies, guidelines, or amendments referenced or incorporated
            herein.
          </p>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default PrivacyPolicy
