const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const HttpStatus = require("http-status-codes");
const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0.6,
});

exports.verifyCompliance = async (req, res, next) => {
  if (!req.compliancePolicy) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
      error: "Missing compliance policy",
    });
  }
  if (!req.webPage) {
    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
      error: "Missing the web page",
    });
  }

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a compliance analyst. Compare the provided webpage against the policy. For each non-compliant point in the web page, return the following:
        1. Point that violates policy
        2. Policy rule violated
      Separate each point in your output by <br> character.`,
    ],
    [
      "user",
      `
        Policy Details:
        ${req.compliancePolicy}

        Webpage Content:
        ${req.webPage} 
      `,
    ],
  ]);

  try {
    const chain = prompt.pipe(model).pipe(new StringOutputParser());
    const response = await chain.invoke(model);
    return res.status(HttpStatus.StatusCodes.OK).send(response);
  } catch (error) {
    return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Error occured! Please try again later.",
    });
  }
};
