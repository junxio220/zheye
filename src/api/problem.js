import axios from 'axios';

const getProblems = (type, data) => {
  if (data) {
    return axios.get(`/problem/${type}`, {
      params: data
    });
  } else {
    return axios.get('/problem');
  }
}

const uploadProblems = (data) => {
  return axios.put('/problem/upload', data);
}

const uploadProblemsDone = (data) => {
  return axios.put('/problem/done', data);
}

const collectProblem = data => {
  return axios.post("/problem/collect", data);
}

export default {
  getProblems,
  uploadProblems,
  uploadProblemsDone,
  collectProblem
}