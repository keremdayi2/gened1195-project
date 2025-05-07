const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
let i = 0;

exports.handler = async (event) => {
  try {
    // const body = JSON.parse(event.body);

    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: body.messages,
    //   temperature: body.temperature || 0.7,
    // });

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(response.data),
    // };
    i = i+ 1;
    console.log('test api call.', i);
    return {
        statusCode : 200,
        body: JSON.stringify('Got response.')
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};