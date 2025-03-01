import Image from "next/image";
import React from "react";


const Navbar: React.FC = () => {
    return (
        <div className="px-4 py-2">
            <nav className="bg-primary bg-opacity-50 p-4 flex justify-between items-center rounded-lg max-w-7xl mx-auto">
                <div className="flex items-center space-x-4">
                    <div className="relative w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px]">
                        <Image
                            src="/LOGO white.svg"
                            alt="Thriftnity"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 30px,
                                   (max-width: 768px) 40px,
                                   50px"
                            priority
                        />
                    </div>
                    <div className="text-2xl font-semibold">Thriftnity</div>
                </div>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 rounded-lg border border-gray-300 outline-none bg-white/80"
                    />
                    <button className="bg-white p-2 rounded-lg shadow-md">🔍</button>
                </div>
                <div className="flex items-center space-x-3 text-black">
                    <button>❤️</button>
                    <button>🔔</button>
                    <button>📩</button>
                    <button>🛒</button>
                    <button className="bg-gray-300 p-2 rounded-full"></button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
