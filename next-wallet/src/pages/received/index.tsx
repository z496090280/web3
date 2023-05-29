import { useAccount, useSignMessage } from "wagmi";

/*
 * @Author: lee
 * @Date: 2023-05-08 15:19:56
 * @LastEditTime: 2023-05-28 14:45:29
 */
function AirDrop() {
  return (
    <div>
      <table className="border-separate border border-slate-400 hover:border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-300 ">人名</th>
            <th className="border border-slate-300 ">票数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-300 ">Indiana</td>
            <td className="border border-slate-300 ">Indianapolis</td>
          </tr>
          <tr>
            <td className="border border-slate-300 ">Ohio</td>
            <td className="border border-slate-300 ">Columbus</td>
          </tr>
          <tr>
            <td className="border border-slate-300 ">Michigan</td>
            <td className="border border-slate-300 ">Detroit</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AirDrop;
