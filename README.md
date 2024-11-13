# LLM-Compliance-Backend

### Project Working:
1. The application takes 2 URLs as part of query parameters in a GET request - compliancePolicyURL & webPageURL.
2. Both the pages are scraped using Puppeteer & all the visible text on the web page is stored.
3. A request is sent to OpenAI (gpt-4o-mini model) to point out the sections where webpage is going against the policy mentioned in compliancePolicyURL.
4. The output shows all the points where webpage goes against the policy, and the reason as to how it is in violation with the policy.
   
### Project Details:
LLM Used: gpt-4o-mini<br />
Backend Deployment: [Heroku](https://llm-compliance-backend-a7ee160f3703.herokuapp.com)<br />
Try it out (<ins>Please be patient it might take upto 5 seconds to load</ins>) - [Demo Link](https://llm-compliance-backend-a7ee160f3703.herokuapp.com/verify-compliance?compliancePolicyURL=https://stripe.com/docs/treasury/marketing-treasury&webPageURL=https://mercury.com/)<br />

