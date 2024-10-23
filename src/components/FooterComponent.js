import React from 'react'
import instagram from '../instagram.svg'
import linkedin from '../linkedin.svg'
import twitter from '../twitter.svg'
import mental_health from '../mental-health.png'

const Footer = () => {
  return (
    <div class="footer-container" className='bg-slate-300'>
    <footer class="footer" className='gap-10 flex mb-0 mt-20 justify-evenly p-5'>
        <div class="footer-left">
            <div class="company" className='flex flex-col'>
                <a href="#" className='flex gap-2 font-bold'>
                    <img src={mental_health} className='h-5 w-7'/>
                   MindConnect
                </a>
                <p>
                    Improving Mental Health
                </p>
            </div>
            <div class="socials" className='flex align-middle gap-3 mt-2'>
                <a href="#instagram">
                    <img src={instagram}  className='h-4'/>
                </a>
                <a href="#linkedin">
                    <img src={linkedin} className='h-4'/>
                </a>
                <a href="#twitter">
                    <img src={twitter} className='h-4'/>
                </a>
            </div>              
        </div>
        <div class="footer-grid" className='flex gap-5'>
            <div class="grid-col">
                <div class="col-heading" className='font-bold'>
                    Products
                </div>
                <ul>
                    <li>
                        <a href="#Overview">Overview</a>
                    </li>
                    <li>
                        <a href="#Solutions">Solutions</a>
                    </li>
                    <li>
                        <a href="#Pricing">Pricing</a>
                    </li>
                    <li>
                        <a href="#Customers">Customers</a>
                    </li>
                </ul>
            </div>
            <div class="grid-col">
                <div class="col-heading" className='font-bold'>
                    Company
                </div>
                <ul>
                    <li>
                        <a href="#About">About</a>
                    </li>
                    <li>
                        <a href="#Investor">Investor Relations</a>
                    </li>
                    <li>
                        <a href="#Jobs">Jobs</a>
                    </li>
                    <li>
                        <a href="#Press">Press</a>
                    </li>
                    <li>
                        <a href="#Blog">Blog</a>
                    </li>
                </ul>
            </div>
            <div class="grid-col">
                <div class="col-heading" className='font-bold'>
                    Support
                </div>
                <ul>
                    <li>
                        <a href="#Contact">Contact</a>
                    </li>
                    <li>
                        <a href="#Documentation">Documentation</a>
                    </li>
                    <li>
                        <a href="#Chat">Chat</a>
                    </li>
                    <li>
                    <a href="#FAQ">FAQ</a>
                    </li>
                </ul>
            </div>
            <div class="grid-col">
                <div class="col-heading" className='font-bold'>
                    Legal
                </div>
                <ul>
                    <li>
                        <a href="#Terms">Terms of Service</a>
                    </li>
                    <li>
                        <a href="#Privacy">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#Cookie">Cookie Settings</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
    <div class="footer-copyright" className='border'>
        &copy; 2024 - Present FreeYourMind. All Rights Reserved.
    </div>
</div>
  )
}

export default Footer