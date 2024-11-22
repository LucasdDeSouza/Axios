import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGNhMWYxYjAzMDg5NTI0ZjJlMjRiMzZiZWUzMTJmOSIsIm5iZiI6MTczMjI4NjQxMS41MjU1NCwic3ViIjoiNjc0MDk1ZWU4YjRlNGMyZWY2Zjc5MmE2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.33p2S1085o5MSBJXJZ2Bs4rXL4-yQLLOMt-u21A24vY`,
  },
});

export default api;
