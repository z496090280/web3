/*
 * @Author: lee
 * @Date: 2023-05-08 15:19:56
 * @LastEditTime: 2023-05-29 16:50:51
 */
import { getSortedPostsData } from "../../../lib/posts";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Router from "next/router";
function Posts({ allPostsData }: any) {
  function handleJump(id: string) {
    console.log(id);
    Router.push('/posts/' + id);
  }
  return (
    <div>
      {allPostsData ? (
        <>
          <div className="w-full px-4 pt-16">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>
                        以下是node接口数据，可打开控制台network查看接口
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    {allPostsData.map(({ id, date, title }: any) => (
                      <Disclosure.Panel
                        key={id}
                        className="px-4 pt-4 pb-2 text-sm text-gray-500"
                        style={{cursor: 'pointer'}}
                        onClick={() => handleJump(id)}
                      >
                        {title}
                        <br />
                        {id}
                        <br />
                        {date}
                      </Disclosure.Panel>
                    ))}
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </>
      ) : (
        <>未调用接口哦</>
      )}
    </div>
  );
}

export default Posts;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
