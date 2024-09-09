import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const client = new OpenAI({
  apiKey: 'sk-nkM59FJGibtgqNBw93xsoLOlhOagvEbMbEfYCVYbnbHzSd3y', // 在这里将 MOONSHOT_API_KEY 替换为你从 Kimi 开放平台申请的 API Key
  baseURL: 'https://api.moonshot.cn/v1',
});

const tablePrompt = `
    这是一个table的截图，我需要你给我输出一份表头的数据
`

export const img2code = async (base64Data: string) => {
  // 将 base64 字符串转换为二进制数据
  const imgData = base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
  const buffer = Buffer.from(imgData, 'base64');

  // 将二进制数据保存为文件
  const tempImagePath = path.join(__dirname, 'temp_image.png');
  fs.writeFileSync(tempImagePath, buffer);

  // 创建一个可读流
  const fileStream = fs.createReadStream(
    path.join(__dirname, 'temp_image.png'),
    {
      start: 0,
      end: buffer.length,
      autoClose: true,
    }
  );

  // 使用 client.files.create 上传文件
  const file_object = await client.files.create({
    file: fileStream,
    purpose: 'file-extract',
  });

  const file_content = await (
    await client.files.content(file_object.id)
  ).text();

  console.log('file_content:',file_content);

  // 把它放进请求中
  const messages = [
    {
      role: 'system',
      content:
        '你是 专业的图片转代码的专家，你是设计行业和前端行业的专家，我会给你界面的截图，你需要根据我的需求精准识别图片并且转换为我需要的格式',
    },
    {
      role: 'system',
      content: file_content,
    },
    { role: 'user', content: tablePrompt },
  ];

  const completion = await client.chat.completions.create({
    model: 'moonshot-v1-32k',
    messages: messages as any,
    temperature: 0.3,
  });
  const resContent = completion.choices[0].message.content
  console.log(resContent);
//   console.log(JSON.parse(resContent));
};
