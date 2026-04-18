import React from 'react'
import { education } from "../../constant.js";  

const Education = () => {
  return (
    <section id='education'
    className='py-24 pb-24 px-[12vw] md:px-[7vw] lg:px[16vw] font-sans bg- '>
        <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-white'>Education</h2>
            <div className='w-32 h-1 bg-purple-500 mx-auto mt-4'></div>
            <p className='text-gray-400 mt-4 text-lg font-semibold'>
                My education has been a journey of learningand development. Here are details of academic background
            </p>
        </div>

        {/* educational timeline */}
       <div className="relative">
  {/* Center line: hidden on mobile */}
  <div className="absolute sm:block sm:left-1/2 transform -translate-x-1/2 w-1 bg-white h-full"></div>

  {education.map((edu, index) => (
    <div
      key={edu.id}
      className={`
        mb-8 w-full flex flex-col items-center
        sm:flex-row sm:justify-between
        ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}
      `}
    >
      {/* Empty space only for desktop */}
      <div className=" sm:block sm:w-5/12"></div>

      {/* Content box */}
      <div className="w-full sm:w-5/12 bg-gray-900 backdrop-blur-md px-6 py-4 rounded-2xl border border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]">
        <h3 className="text-2xl font-semibold text-gray-300 mb-2">
          {edu.degree}
        </h3>

        <span className="text-purple-400 font-medium">
          {edu.school}
        </span>

        <p className="text-gray-400 mt-1">
          {edu.date} | {edu.grade}
        </p>

        <p className="text-gray-300 mt-3">
          {edu.desc}
        </p>
      </div>
    </div>
  ))}
</div>

    </section>
  )
}

export default Education