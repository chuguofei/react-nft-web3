import ethLogo from "@/assets/ethLogo.png";

const ArtWorks = () => {
  return (
    <>
      <div className="bg-[#131835] py-10">
        <div className="w-4/5 mx-auto">
          <h4 className="uppercase text-2xl text-gradient">Artworks</h4>

          <div className="flex justify-start items-center mt-2 flex-wrap">
            {Array(5)
              .fill()
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-64 h-72 object-contain bg-no-repeat bg-cover bg-center rounded-xl relative mr-6 mb-6 cursor-pointer hover:scale-105  hover:duration-300"
                    style={{
                      backgroundImage: `url(http://guohuiweb3.cn/images/web3.png)`,
                    }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 w-full text-white text-sm label-gradient p-2 flex justify-between items-center">
                      <p>Adulam NFT #1</p>
                      <div className="flex justify-center items-center space-x-4">
                        <img className="w-5 cursor-pointer" src={ethLogo} />
                        3.4
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className=" text-white flex justify-center">
            <button className="bg-[#e32970] mx-auto rounded-full px-4 py-2 cursor-pointer">
              Loader More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtWorks;
