import { Header, Hero } from "./components/Layouts/Index";
import Artworks from "@/components/Artworks";
import { Spin } from "@arco-design/web-react";
import { useEffect } from "react";
import { isWallectConnected, loadNfts } from "./Adulam";
import { useGlobalState } from "./store";

function App() {
  const [globalLoading] = useGlobalState("globalLoading");
  const [nfts] = useGlobalState("nfts");

  useEffect(() => {
    // 判断是否连接钱包
    async function loadData() {
      await isWallectConnected().then(() => {});
      await loadNfts();
    }
    loadData();
  }, []);

  return (
    <Spin loading={globalLoading} className="w-full">
      <div className="min-h-full w-full bg-black h-screen overflow-y-auto">
        <div className="gradient-bg-hero">
          <Header />
          <Hero />
        </div>
        <Artworks dataSource={nfts} />
      </div>
    </Spin>
  );
}

export default App;
