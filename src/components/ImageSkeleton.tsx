import React from 'react'
import { Skeleton } from './ui/skeleton'

const ImageSkeleton = () => {
  return (
    <div className='w-full h-full'>
      <Skeleton className="w-full h-full rounded-lg" />
    </div>
  )
}

export default ImageSkeleton