import ethLogo from "@/assets/ethLogo.png";

const Header = () => {
    return (
        <>
            <nav className="w-4/5 flex justify-between items-center py-4 mx-auto md:justify-center">
                <div className="flex flex-row items-center md:flex-[0.5] flex-initial">
                    <img className="w-8" src={ethLogo} alt="logo" />
                    <span className="text-white ml-2 text-2xl">Adulam</span>
                </div>

                <ul className="text-white hidden md:flex">
                    <li className="mx-4 cursor-pointer">Explore</li>
                    <li className="mx-4 cursor-pointer">Features</li>
                    <li className="mx-4 cursor-pointer">Community</li>
                </ul>

                <button className="text-white shadow-xl shadow-black p-2 rounded-full bg-[#e32970] hover:bg-[#e32970] md:text-xs">Connect Wallet</button>
            </nav>
        </>
    );
};

export { Header };
