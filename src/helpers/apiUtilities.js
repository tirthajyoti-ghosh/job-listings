import axios from 'axios';

const queryApi = {
  get: url => (
    axios.get(url)
      .then(result => result.data)
  ),
  post: (page = 0, type, data) => (
    axios.post(`https://utility-endpoints.netlify.app/.netlify/functions/cors-proxy/https://search.torre.co/${type}/_search/?offset=0&aggregate=false&size=20&page=${page}`, data)
      .then(result => result.data)
  ),
};

export default queryApi;
