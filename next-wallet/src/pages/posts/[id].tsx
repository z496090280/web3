/*
 * @Author: lee
 * @Date: 2023-05-29 15:45:58
 * @LastEditTime: 2023-05-29 16:33:11
 */
import { getAllPostIds, getPostData } from "../../../lib/posts";
import DateCopm from "@/components/date";

export default function PId({ postData }: any) {
  return (
    <div>
      {postData.title}
      <p>{postData.id}</p>

      <DateCopm dateString={postData.date} />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
