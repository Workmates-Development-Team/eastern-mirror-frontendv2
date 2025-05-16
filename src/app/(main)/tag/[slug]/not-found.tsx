import NotFoundComponent from '@/components/not-found'
import { Metadata } from 'next'



export const metadata: Metadata = {
  title: "Page Not Found - 404",
  description:
    "Sorry, the page you are looking for does not exist.",
  robots: 'noindex, nofollow',

};


export default function NotFound() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <NotFoundComponent />
    </div>

  )
}