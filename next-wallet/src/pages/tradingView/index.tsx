/*
 * @Author: lee
 * @Date: 2023-05-08 15:19:56
 * @LastEditTime: 2023-10-30 21:59:59
 */
import WalletComp from "@/components/Wallet";
import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
function TradingViewComp() {
  const chartDom = useRef(null);

  useEffect(() => {
    if (chartDom.current) {
      const chart = createChart(chartDom.current, { width: 400, height: 300 });
      const lineSeries = chart.addLineSeries();
      lineSeries.setData([
        { time: "2019-04-11", value: 80.01 },
        { time: "2019-04-12", value: 96.63 },
        { time: "2019-04-13", value: 76.64 },
        { time: "2019-04-14", value: 81.89 },
        { time: "2019-04-15", value: 74.43 },
        { time: "2019-04-16", value: 80.01 },
        { time: "2019-04-17", value: 96.63 },
        { time: "2019-04-18", value: 76.64 },
        { time: "2019-04-19", value: 81.89 },
        { time: "2019-04-20", value: 74.43 },
      ]);
    }
  }, []);
  return (
    <>
      <div ref={chartDom}></div>
    </>
  );
}

export default TradingViewComp;
