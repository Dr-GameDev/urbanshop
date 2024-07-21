import React from 'react';


const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <section className='bg-[#f8fcff] pt-6'>
            <div className='px-5 pb-2 md:pb-4'>
                <div className='flex justify-evenly'>
                    <div className='text-center'>
                        <div>Company</div>
                        <div className='footer-links text-gray-700'>
                            <div><a href="#">About Us</a></div>
                            <div><a href="#">Contact</a></div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <div>Legal</div>
                        <div className='footer-links text-gray-700'>
                            <div><a href="#">Privacy Policy</a></div>
                            <div><a href="#">Terms of use</a></div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <div className=''>Updates</div>
                        <div className='footer-links text-gray-700'>
                            <div><a href="#">Blogs</a></div>
                            <div><a href="#">News</a></div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center py-3'>
                    <div className="flex justify-center">
                        <span>Urbanshop &copy; {year} | All rights reserved.</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer