import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>New Arrivals Only</h2>
        <div>
          <div className="hero-hand-icon">
            <div className="desc">
            <p>new</p>
            <img src='/images/hand_icon.png' alt=''/>
            </div>
            <p>collections</p>
            <p>for everyone</p>
          </div>
          <div className="hero-latest-btn">
            <div>
              Latest Collections
            </div>
            <img src="/images/arrow.png" alt="" />
          </div>
        </div>
      </div>
      <div className="hero-right">
      <img src="/images/heroimg.png" alt="Hero" />
      </div>
    </div>
  )
}

export default Hero
