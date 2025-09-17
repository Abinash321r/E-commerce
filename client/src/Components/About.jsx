import React from 'react'
import '../About.css'
import { useEffect } from 'react'
import Map from './Map'
function About({value,routelocation}) {
  useEffect(()=>{
    console.log(' route mounted')
    routelocation('registerr')
    return()=>{
    console.log(' route changed')
    routelocation('')
    };
      },[])
  return (
    <div id='aboutcontainer'>
      <div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5501.361952455777!2d85.27728313050545!3d27.692442970890617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1870a004121d%3A0x791b865d26140665!2sBaba%20Oil%20Store!5e0!3m2!1sen!2snp!4v1701500028089!5m2!1sen!2snp" width="100%" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
        <div>
        <h3>About Us</h3>
        <p><span>OUR E-COMMERSE WEB APP:</span>A tailor-made app design  to provide high-quality products while maintaining a commitment to sustainability and customer satisfaction.</p>
        <p> We take pride in offering products of the highest quality. Our sourcing process ensures ethical and sustainable practices.</p>
        </div>
        <div>
        <h3>OUR E-COMMERSE WEBAPP:</h3>
        <ul>
          <li>Listens and cares about your required product you desire.</li>
          <li>Explores new ideas and possibilities beyond your imagination.</li>
          <li>Crafts tailor-made options to fit your exact needs and comfort level.</li>
          <li>Provides consultation and answers all your questions and send you feedback as soon as possible.</li>
        </ul>
        <p>We are happy to say that we Our E-commerse webapp is a  reputed and quality product selling platform, registered and licensed obtained from the government of Nepal.  </p>
        </div>
        <div>
        <h3>Our Team:</h3>
        <ul>
          <li><span>Developer Abinash Nepali</span></li>
          <li><span>Developer Dibigh Rai</span></li>
          <li><span>Developer Nil Kumar Karki AKA (N.K.K)</span></li>
          <li><span>Developer Suman Bharati</span></li>
          <li><span>Developer Vinam Shrestha</span></li>
          <li><span>Developer Rizen Bhandari</span></li>
          <li><span>Developer Yurendra Lama</span></li>
        </ul>
        </div>
        <div>
        <h3>Why Us?:</h3>
        <ul>
         <li><span>Mission Statement:</span>
          <p>We will continually strive to deliver to our customers, levels of service consistently exceeding their expectations within a framework of comfort.</p>
          </li>
          <li><span>Prompt Response:</span>
          <p> Whatever your queries, questions or comments we will get back to you within 24 hours with the answers.</p>
          </li>
          <li><span>Quality Services:</span>
          <p>Our Company has no overhead expenses in the office. This is the main reason why we can offer top quality services and facilities for our guest at a competitive price.</p>
          </li>
        </ul>
        </div>
    </div>
  )
}

export default About