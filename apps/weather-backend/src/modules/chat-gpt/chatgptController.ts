import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});
export const ChatgptController = {
  async talk(req, res) {
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: 'system', content: req.body.message }],
        model: 'gpt-3.5-turbo',
      });

      res.json(response.choices[0]);
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      res.status(500).send('Error processing your request');
    }
  },
};
