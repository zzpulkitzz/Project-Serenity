import React from 'react'


const Footer = () => {
  return (
    <div class="footer-container" className='bg-slate-300'>
    <footer class="footer" className='gap-10 flex mb-0 mt-20 justify-evenly p-5'>
        <div class="footer-left">
            <div class="company" className='flex flex-col'>
                <a href="#" className='flex gap-2 font-bold'>
                   Project Serenity
                </a>
                <p>
                    Improving Mental Health
                </p>
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