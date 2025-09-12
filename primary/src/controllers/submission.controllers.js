const { sendToQueue } = require('../service/queue.service.js');

const queueName = process.env.QUEUE_NAME;
function constructData(code, language, problemId, type) {
  return `${problemId} + ":" ${language} + ":"+ ${code} + ":" + ${type}`;
}

async function handleProblemRunRoute(request, response) {
  const { language, code, problemId } = request.body;

  if (!language || !code || !problemId)
    return response.status(400).json({ message: 'Code or language missing' });

  const data = constructData(code, language, problemId, 'run');

  const result = await sendToQueue(queueName,data);

  return response.status(200).json({ message: 'Code Execution running ...' });
}

async function handleProblemSubmitRoute(request, response) {
  const { language, code, problemId } = request.body;

  if (!language || !code || !problemId)
    return response.status(400).json({ message: 'Code or language missing' });

  const data = constructData(code, language, problemId, 'submit');

  const result = await sendToQueue(queueName,data);

  return response
    .status(200)
    .json({ message: 'Code submission in progress ... ' });
}

module.exports = { handleProblemRunRoute, handleProblemSubmitRoute };
