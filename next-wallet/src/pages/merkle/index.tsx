/*
 * @Author: lee
 * @Date: 2023-05-08 15:19:56
 * @LastEditTime: 2023-06-03 22:41:01
 */
import { useEffect } from "react";
import { getRoot } from "../../../lib/merkle";
function About({ data }: any) {
  useEffect(() => {
    console.log(data);
  });
  return <>{data ? <div>默克尔树验证通过</div> : null}</>;
}

export default About;

export async function getServerSideProps() {
  const res = await getRoot();

  return {
    props: { data: res },
  };
}
