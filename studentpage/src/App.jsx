import { useState } from 'react'
import Navbar from './navbar'
import LandingPage from './landing_page'
import Services from './service'
import HowItWorks from './how_it_works'
import Footer from './footer'
import AboutUs from './about_us'
import Features from './Features'
import Testimonial from './Testimonial'
import Demo from './demo'
function App() {
 

  return(
  <>
  <Navbar/>
  <LandingPage/>
  <Services/>
  <HowItWorks/>
  <Demo/>
  <Features/>
  <Testimonial/>
  <AboutUs/>
  
  <Footer/>
  </>)
}

export default App
