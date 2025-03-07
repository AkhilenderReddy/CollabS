import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="text-white py-4" style={{background: '#05061f',fontWeight: 'lighter'}}>
      <div className="container mx-auto text-center">   
        <small>&copy; {new Date().getFullYear()} Colab All rights reserved.</small>
        <small className='flex gap-3 items-center justify-center'>
          <Link href="/" className="text-blue-400 hover:underline">Privacy Policy</Link> | 
          <Link href="/" className="text-blue-400 hover:underline">Terms of Service</Link>
        </small>
      </div>
    </footer>
  )
}

export default Footer