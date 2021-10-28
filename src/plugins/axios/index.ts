import axios from 'axios';
import config from '@/configs/axios';

const instance = axios.create(config);

export default instance;
