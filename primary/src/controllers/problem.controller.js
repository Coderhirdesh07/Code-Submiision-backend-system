const ApiError = require('../utils/ApiError');
const Problem = require('../models/problem.model');
const ApiResponse = require('../utils/ApiResponse');
const mongoose = require("mongoose");
async function handleProblemCreate(request, response) {
  const { title, description } = request.body;
  if (!title || !description) {
    throw new ApiError(400, 'Title or Description does not exist');
  }
  const isProblemExist = await Problem.findOne({ title});
  if (isProblemExist) throw new ApiError(400, 'Problem with title already exists');

  const newProblem = await Problem.create({ title: title, description: description });
  

  return response.status(200).json(new ApiResponse(200, newProblem, 'Problem Created Succesfully'));
}

async function handleProblemDelete(request, response) {
  const { id } = request.params;

  if (!id) {
    throw new ApiError(400, 'Problem ID not provided');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid Problem ID');
  }

  const deletedProblem = await Problem.findByIdAndDelete(id);

  if (!deletedProblem) {
    throw new ApiError(404, 'Problem not found');
  }

  return response
    .status(200)
    .json(new ApiResponse(200, null, 'Problem Deletion Success'));
}

async function handleProblemInfo(request, response) {
  const { id } = request.params;

  if (!id) {
    throw new ApiError(400, 'Problem ID not provided');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid Problem ID');
  }

  const problemInfo = await Problem.findById(id);

  if (!problemInfo) {
    throw new ApiError(404, 'Problem not found');
  }

  return response
    .status(200)
    .json(new ApiResponse(200, problemInfo, 'Problem found'));
}

module.exports = {
  handleProblemCreate,
  handleProblemDelete,
  handleProblemInfo,
};
