import React from 'react'


const Hero = () => {

    return (
        <section>
            <div className="w-full h-screen bg-[url('/images/hero-image.jpg')] bg-cover">
                <div className='hidden'>
                    <a href="https://www.freepik.com/free-photo/traveler-hiking-mountains-while-having-his-essentials-backpack_18895769.htm#fromView=search&page=1&position=40&uuid=23a2daca-f1cb-43cb-9f2d-af3a1923d6e7">Image by freepik</a>
                </div>
                <div className='md:px-36 py-20 flex flex-col'>
                    <h1 className="relative px-2 text-6xl md:text-8xl ">
                        GREAT <br /> EXPLORING <br /> EXPERIENCE
                    </h1>
                    <div className='pl-4 pt-5'>
                        <button className='text-green-900 border-2 border-green-900 bg-transparent rounded-3xl bottom-10 right-9 px-5 py-3'><a href="/store">Explore</a></button>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Hero