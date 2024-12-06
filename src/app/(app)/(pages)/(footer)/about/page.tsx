import Image from 'next/image'
import React from 'react'

const About = () => {
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
            {/* Content */}
            <div className="flex flex-col gap-14 lg:gap-20">
              <div className="flex flex-col md:flex-row gap-5">
                <h2 className="text-3xl md:text-5xl font-bold flex-1">Our Story</h2>
                <p className="flex-1">
                  Our journey is fueled by a passion for transforming ideas into immersive visual
                  experiences. Established with a vision to revolutionize the world of video
                  content, we&apos;ve evolved into a hub of creativity and innovation.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <h2 className="text-3xl md:text-5xl font-semibold flex-1">Mission</h2>
                <p className="flex-1">
                  Our mission is clear: to empower brands through the unparalleled power of
                  storytelling. We believe that every brand has a unique narrative waiting to be
                  told, and our mission is to bring those stories to life with authenticity,
                  creativity, and impact.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <h2 className="text-3xl md:text-5xl font-bold flex-1">Approach</h2>
                <p className="flex-1">
                  What sets us apart is our holistic approach to video production. From concept to
                  creation and promotion, we guide our clients through every step, ensuring a
                  seamless and effective process. We combine creativity with strategy, producing
                  content that not only looks stunning but also achieves tangible results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
          {/* Component */}
          <h1 className=" md:text-7xl text-7xl font-bold flex-1 text-center mb-8">Our Journey</h1>
          <div className="flex flex-col items-center">
            {/* Item */}
            <div className="relative">
              <div className="absolute w-1 md:w-2 bg-black h-full left-1/2 transform -translate-x-1/2"></div>
              {/* Static Event Entry */}
              <div className="mb-20 mt-20 flex items-center w-full">
                <div className="w-1/2 text-right pr-5 md:pr-12">
                  <h5 className="text-lg md:text-2xl font-semibold">August 2014</h5>
                </div>
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black"></div>
                <div className="w-1/2 pl-5 md:pl-12">
                  <h6 className="text-md md:text-xl font-semibold mb-3">Started the company</h6>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit
                    amet luctus.
                  </p>
                </div>
              </div>
              {/* Another Static Event Entry */}
              <div className="mb-20 mt-20 flex items-center w-full">
                <div className="w-1/2 text-right pr-5 md:pr-12">
                  <h5 className="text-lg md:text-2xl font-semibold">September 2016</h5>
                </div>
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black"></div>
                <div className="w-1/2 pl-5 md:pl-12">
                  <h6 className="text-md md:text-xl font-semibold mb-3">First Client</h6>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit
                    amet luctus.
                  </p>
                </div>
              </div>
            </div>
            {/* Item */}
            <div className="relative">
              <div className="absolute w-1 md:w-2 bg-gray-300 h-full left-1/2 transform -translate-x-1/2"></div>
              {/* More Static Entries */}
              <div className="mb-20 mt-20 flex items-center w-full">
                <div className="w-1/2 text-right pr-5 md:pr-12">
                  <h5 className="text-lg md:text-2xl font-semibold text-gray-600">January 2017</h5>
                </div>
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gray-300"></div>
                <div className="w-1/2 pl-5 md:pl-12">
                  <h6 className="text-md md:text-xl font-semibold text-gray-600 mb-3">
                    Hired our first Dev
                  </h6>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit
                    amet luctus.
                  </p>
                </div>
              </div>
              {/* And another one */}
              <div className="mb-20 mt-20 flex items-center w-full">
                <div className="w-1/2 text-right pr-5 md:pr-12">
                  <h5 className="text-lg md:text-2xl font-semibold text-gray-600">May 2017</h5>
                </div>
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gray-300"></div>
                <div className="w-1/2 pl-5 md:pl-12">
                  <h6 className="text-md md:text-xl font-semibold text-gray-600 mb-3">
                    Raised $5M
                  </h6>
                  <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit
                    amet luctus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
