'use client'

import Footer from '@/components/footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqsList } from 'test-data'

const FAQ = () => {
  return (
    <>
      <section>
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
          {/* Component */}
          <div className="flex flex-col gap-14 lg:gap-20">
            {/* Image */}
            <img
              src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2Fbg-about.png?alt=media&token=0d5ea1c5-61cf-4b0d-beab-bd023e3d9ee8"
              alt=""
              className="w-full"
            />
          </div>
        </div>
      </section>
      <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl md:text-5xl font-bold flex-1">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-lg mx-auto text-lg">
            Answered all frequently asked questions, Still confused? feel free to contact us.
          </p>
        </div>
        <div className="mt-14 max-w-2xl mx-auto pb-5">
          <Accordion type="single" collapsible>
            {faqsList.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default FAQ
