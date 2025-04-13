// src/api/publicClient.ts
import axios from 'axios';

const publicClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default publicClient;

