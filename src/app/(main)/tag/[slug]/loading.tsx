import Loader from '@/components/Loader'
import React from 'react'

const loading = () => {
  return (
    <div className="container flex justify-center min-h-[50vh] mt-10">
    <Loader />
  </div>
  )
}

export default loading