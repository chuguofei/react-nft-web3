import { Header, Hero } from "./components/Layouts/Index";
import Artworks from "@/components/Artworks";
import { Spin } from "@arco-design/web-react";
import { useEffect } from "react";
import { isWallectConnected } from "./Adulam";
import { useGlobalState } from "./store";

function App() {
  const [globalLoading] = useGlobalState("globalLoading");
  useEffect(() => {
    // 判断是否连接钱包
    isWallectConnected().then(() => {});
  }, []);

  return (
    <Spin loading={globalLoading}>
      <div className="min-h-full w-full bg-black h-screen overflow-y-auto">
        <div className="gradient-bg-hero">
          <Header />
          <Hero />
        </div>
        <Artworks />
      </div>
    </Spin>
  );
}

export default App;
