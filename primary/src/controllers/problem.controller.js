const ApiError = require('../utils/ApiError');
const Problem = require('../models/problem.model');
const ApiResponse = require('../utils/ApiResponse');

async function handleProblemCreate(request, response) {
  const { title, description } = request.body;
  if (!title || !description) {
    throw new ApiError(400, 'Title or Description does not exist');
  }
  const isProblemExist = await Problem.findById({ title: title });
  if (!isProblemExist) throw new ApiError(400, 'Problem with title already exists');

  const newProblem = await Problem({ title: title, description: description });

  return response.status(200).json(new ApiResponse(200, newProblem, 'Problem Created Succesfully'));
}

async function handleProblemDelete(request, response) {
  const { id, title } = request.body;
  if (!id || !title) {
    throw new ApiError(400, 'Id Or Title not found');
  }
  const isProblemExist = await Problem.findByIdAndDelete({ id: id, title: title });
  if (!isProblemExist) {
    throw new ApiError(400, `Problem with ${title} not found`);
  }
  return response.status(200).json(new ApiResponse(200, null, 'Problem Deletion Success'));
}

async function handleProblemInfo(request, response) {
  const { id } = request.body;
  if (!id) throw new ApiError(400, 'Problem with id cannot be found');

  const problemInfo = await Problem.findById({ id: id });
  return response.status(200).json(new ApiResponse(200, problemInfo, `Problem with ${id} found`));
}

module.exports = {
  handleProblemCreate,
  handleProblemDelete,
  handleProblemInfo,
};
