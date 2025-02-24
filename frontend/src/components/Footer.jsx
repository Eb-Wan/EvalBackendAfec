import React from 'react'

import { Facebook, Twitter, Linkedin, Dribbble } from 'react-bootstrap-icons'

const Footer = () => {
  return (
    <>
      <hr className='m-0'/>
      <footer>
        <div style={{height:"4em", gap:"20px"}} className='bg-body-tertiary d-flex align-items-center justify-content-center'>
          <a className='icon-link' href='https://linkedin.com'><Linkedin className="fs-2" /></a>
          <a className='icon-link' href='https://dribbble.com'><Dribbble className="fs-2" /></a>
          <a className='icon-link' href='https://twitter.com'><Twitter className="fs-2" /></a>
          <a className='icon-link' href='https://facebook.com'><Facebook className="fs-2" /></a>
        </div>
        <div style={{height:"4em"}} className='bg-body-secondary d-flex align-items-center justify-content-center'>Fait par Ewan Baron</div>
      </footer>
    </>
  )
}

export default Footer