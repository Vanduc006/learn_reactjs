import React from 'react'

const NotFound = () => {
  return (
    <div className='bg-white w-full h-full'>
    <div className="text-center mt-5">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <p className="text-2xl md:text-3xl font-light text-gray-800 mt-4">Oops! Page not found.</p>
        <p className="text-gray-600 mt-2">The page you are looking for doesn't exist.</p>
        <a href="/" className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
        Go Back Home
        </a>
    </div>
    </div>
  )
}

export default NotFound