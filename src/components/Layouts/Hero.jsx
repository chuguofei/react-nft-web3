

export const Hero = () => {
    return <>
        <div className="bg-[url('https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_960_720.png')]
        bg-no-repeat bg-cover">
            <div className="flex flex-col items-center justify-center py-10">
                <h1 className="text-white text-5xl font-bold text-center">
                    A.I Arts <br />
                    <span className="text-gradient">NFTs</span> Collection
                </h1>

                <p className="text-white text-sm mt-3 font-semibold">铸币并收集周围最热门的 NFT</p>

                <button className="rounded-full shadow-xl shadow-black text-white cursor-pointer my-2">开始筹币</button>

                <div></div>
            </div>

        </div>
    </>
}