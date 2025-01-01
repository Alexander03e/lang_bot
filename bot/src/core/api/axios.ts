import axios from 'axios';
import { config } from 'dotenv';

config();

export const axiosInstance = axios.create({
    baseURL: `${process.env.BACK_URL}/api/`,
    headers: {
        'Content-Type': 'application/json',
    },
});
