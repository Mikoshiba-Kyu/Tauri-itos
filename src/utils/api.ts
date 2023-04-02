import { Configuration, OpenAIApi } from 'openai'

export const send = async (apiKey: string, prompt: string, talks: any) => {

  const configuration = new Configuration({apiKey})
  const openai = new OpenAIApi(configuration)

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0301',
      messages: [{ role: "system", content: prompt }, ...talks]
    })

    return response.data.choices[0].message

  } catch (err) {

    return {
      "role" : "assistant",
      "content" : "エラーです"
    }
  }
}