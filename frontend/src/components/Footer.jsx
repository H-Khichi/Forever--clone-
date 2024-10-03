import React from 'react'
import Assets from '../assets/assets'

const Footer = () => {
    return (
        <>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-40 text-sm'>
                <div>
                    <img src={Assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo magni rem quisquam debitis mollitia, id distinctio ut possimus optio porro corrupti similique minima veritatis deserunt modi sed magnam fuga expedita.
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className=' flex flex-col gap-1 text-gray-600'>
                        <li>HOME</li>
                        <li>COLLECTION</li>
                        <li>ABOUT</li>
                        <li>CONTACT</li>

                    </ul>
                </div>
                <div>
                    <p className='text-xl front-medium mb-5'>GET IN TOUCH</p>
                    <ul>
                        <li>+1234556789</li>
                        <li>Constact@gmail.com</li>
                    </ul>
                </div>

            </div>
            <div>
                <hr />
                <p className='w-full py-5 text-center'> Copyright 2024@ forever.com - All Right</p>
            </div>
        </>
    )
}

export default Footer