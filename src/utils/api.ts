import { Configuration, OpenAIApi } from 'openai'

export const send = async (apiKey: string, prompt: string, talks: any) => {

  const configuration = new Configuration({apiKey})
  const openai = new OpenAIApi(configuration)

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-0301',
    messages: [{ role: "system", content: prompt }, ...talks]
  })

  const res = response.data.choices[0].message;

  console.log(res)
  return res;
}