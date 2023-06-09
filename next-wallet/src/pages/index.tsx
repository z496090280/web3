/*
 * @Author: lee
 * @Date: 2023-05-08 15:17:37
 * @LastEditTime: 2023-06-02 00:05:57
 */
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Router from "next/router";
import styles from "./index.module.scss";
import MENU_TREE, { IMenu } from "@/utils/menu";

function App() {
  function handleClickItem(item: IMenu) {
    Router.push(item.path);
  }
  return (
    <div className={styles.home_box}>
      <div className={styles.main_content}>
        <h2 className="text-2xl">Web3 代码示例</h2>
        <div className={styles.box}>
          {MENU_TREE.map((item) => {
            return (
              <div
                className={styles.item}
                key={item.path}
                onClick={() => handleClickItem(item)}
              >
                <p className={styles.title}>{item.title}</p>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
