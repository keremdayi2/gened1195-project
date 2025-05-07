import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GENED_1195_OPENAI_API_KEY,
});

const idxToStrict = ['Strict', 'Include', 'Suggest'];

const idxToStrictPrompt = [
    'The user is very strict with the ingredients. \n\n\
    Make sure you only use the included ingredients when constructing your recipe. You can assume basic things are available (e.g. salt, olive oil, sugar, etc.) but the user might not have any other substantial ingredients to make their food.',
    'The user wants you to include the given ingredients, but you can add ingredients. For instance, this could be because the user wants to get rid of some ingredients they have so they want to cook with these. However, they might be able to buy more ingredients if needed.',
    'You can use the ingredient list as a suggestion. You do not have to be very strict. Try to use the ingredients, but you can add more and you do not have to use all the ingredients. Focus more on making a coherent recipe.'
];

function generatePrompt(ingredients, strictIdx, userMessages) {
    let systemBase = 'You are a helpful assistant helping someone come up with recipes.\n\n\
     They will give you a set of constraints to satisfy when generating your recipe and you should response clearly to their request.\n\n\
      Make sure you satisfy their constraint! Make sure you reply to the user. Here are the constraints: ';

    let ingredientMessage = idxToStrictPrompt[strictIdx];

    let ingredientsStr = 'The ingredients are: ' + ingredients.join(', ');

    systemPrompt = systemBase +'\n\n' + 'INGREDIENT CONSTRAINT: ' + ingredientMessage + '\n\n ' + ingredientsStr;

    messages = [
        {role : "system", content : systemPrompt},
    ];

    // user messages will be of the same format as openai messages
    userMessages.forEach(element => {
        messages.push(element);
    });

    return messages;
}

function printMessages(messages) {
    messages.forEach((item, idx) => {
        console.log(item.role)
        console.log(item.content)
    });
};

exports.handler = async (event) => {
  try {
    const token = event.headers["api-key"];
    
    // check api key
    if (token !== process.env.VITE_SECRET_API_KEY) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Invalid API token" }),
      };
    }

    const body = JSON.parse(event.body);

    ingredients = body.ingredients;
    strictness = body.strictness;
    selectedIngredients = ingredients.filter((item, idx) => item.selected).map((item, idx) => item.name);
    userHistory = body.history;

    messages = generatePrompt(selectedIngredients, strictness, userHistory);

    printMessages(messages);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
    });

    message = response.choices[0].message;
    console.log(message);

    return {
      statusCode: 200,
      body: JSON.stringify(message),
    };
    // i = i + 1;
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify("Got response." + i),
    // };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
