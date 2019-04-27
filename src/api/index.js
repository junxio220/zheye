import axios from 'axios';
import main from './main';
import user from './user';
import article from './article';
import problem from './problem';
axios.defaults.baseURL = 'http://localhost:8000';

export default {
  ...main,
  ...user,
  ...article,
  ...problem
}