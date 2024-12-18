import React from 'react'

const demo = () => {
  return (
    <>
    <div 
    className="bg-purple-200 mx-auto rounded-2xl shadow-lg"
    style={{ maxWidth: '90%', height: '650px' }} // Responsive max width
  >
        <div className="flex justify-center items-center w-full h-full">
  <video
    controls
    className="w-[300px] h-[600px] object-cover rounded-2xl"
    style={{ borderRadius: 'inherit' }} // Ensure rounded corners are inherited
  >
    <source src="/Demo1.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
</div>
</>
    
  )
}

export default demo