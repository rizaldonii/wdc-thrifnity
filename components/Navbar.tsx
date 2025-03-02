import { Mail, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { GoHeartFill } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";


const Navbar: React.FC = () => {
    return (
        <div className="sticky px-4 py-2">
            <nav className="container bg-primary px-4 py-3 flex justify-between items-center rounded-full max-w-9/10 mx-auto">
                {/* Logo + Title */}
                <div className="flex ml-4 sm:ml-6 md:ml-8 items-center gap-1 sm:gap-2">
                    <div className="relative w-[25px] h-[25px] sm:w-[35px] sm:h-[35px] md:w-[45px] md:h-[45px]">
                        <Image
                            src="/LOGO white.svg"
                            alt="Thriftnity"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 25px,
                                   (max-width: 768px) 35px,
                                   45px"
                        />
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-regular">Thriftnity</div>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl mx-4 bg-white rounded-full">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full py-1.5 px-4 pr-10 rounded-full text-black focus:outline-none"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    </div>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3 sm:gap-6 md:gap-10 mr-2 sm:mr-3 md:mr-4">
                    <GoHeartFill className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    <IoIosNotifications className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hidden sm:block" />
                    <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    <div className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                        <Image
                            src="/avatar.webp"
                            alt="User Avatar"
                            fill
                            className="object-cover rounded-full"
                            sizes="(max-width: 640px) 20px,
                   (max-width: 768px) 24px,
                   28px"
                        />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
