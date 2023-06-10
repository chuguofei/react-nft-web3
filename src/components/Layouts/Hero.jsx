import { setGlobalState } from "@/store";

export const Hero = () => {
  const startMintFun = () => {
    setTimeout(() => {
      setGlobalState("globalLoading", false);
    }, 1000);
    setGlobalState("globalLoading", true);
  };

  return (
    <>
      <div
        className="bg-[url('https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_960_720.png')]
        bg-no-repeat bg-cover h-[30rem] w-full bg-center flex justify-center"
      >
        <div className="flex flex-col items-center justify-center py-10">
          <h1 className="text-white text-5xl font-bold text-center">
            A.I Arts <br />
            <span className="text-gradient">NFTs</span> Collection
          </h1>

          <p className="text-white text-sm m-5 font-semibold">
            铸币并收集周围最热门的 NFT
          </p>

          <button
            onClick={startMintFun}
            className="rounded-full shadow-sm shadow-black text-white cursor-pointer my-2 py-2 px-10 hover:shadow-white border border-solid border-white"
          >
            开始筹币
          </button>

          <div></div>
        </div>
      </div>
    </>
  );
};
