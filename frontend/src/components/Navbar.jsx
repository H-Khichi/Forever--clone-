import React, { useContext, useEffect, useState } from 'react'
import Assets from './../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const { showSearch, setShowSearch, getCartCount, token, logout, navigate } = useContext(ShopContext);


    return (
        <div className='flex items-center justify-between py-5 font-medium '>
            <Link to='/'>
                <img src={Assets.logo} className='w-36' alt="" />
            </Link>
            <ul className='hidden sm:flex gap-5 text-bold text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4  h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
                    <p>COLLECTION</p>
                    <hr className='w-2/4  h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4  h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4  h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

            </ul>

            <div className='flex item-center gap-6'>
                <img onClick={() => setShowSearch(!showSearch)} src={Assets.search_icon} className='w-5 cursor-pointer' alt="" />
                <div className='group relative'>

                    <img onClick={() => token ? null : navigate('/login')} src={Assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    {
                        token &&
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={()=> navigate('/order')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>


                <Link to='cart' className='relative'>
                    <img src={Assets.cart_icon} className='w-5' alt="" />
                    <p className='absolute right-[-4px] bottom-[-4px] w-4 text-center leading-4 bg-black text-white rounded-full  aspect-square text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={Assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>
            {/* sidebar menu for small screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex item-center gap-4 p-3 cursor pointer'>
                        <img src={Assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='p-3 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='p-3 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='p-3 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='p-3 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar