/*
 * @Author: lee
 * @Date: 2023-06-01 16:42:31
 * @LastEditTime: 2023-06-02 11:08:45
 */
const fn = (req: any, res: any) => {
  res.status(200).json({ text: "Hello" });
};

export default fn;
