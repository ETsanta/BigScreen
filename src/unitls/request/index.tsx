// src/utils/http.js
import axios from 'axios';
import { message } from 'antd';
import { getEnv } from "@/unitls/env"



// 创建 axios 实例
const http = axios.create({
  baseURL: getEnv("VITE_API_URL"),
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么（例如添加 token）
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  response => {
    // 对响应数据做处理（例如处理特定状态码）
    if (response.data.code === 401) {
      // token 失效处理
      message.error('登录已过期，请重新登录');
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(new Error('登录已过期'));
    }
    return response.data;
  },
  error => {
    // 对响应错误做处理
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 400:
          message.error('请求参数错误');
          break;
        case 401:
          message.error('未授权，请登录');
          break;
        case 403:
          message.error('拒绝访问');
          break;
        case 404:
          message.error('请求地址错误');
          break;
        case 500:
          message.error('服务器内部错误');
          break;
        default:
          message.error('请求失败');
      }
    } else if (error.request) {
      message.error('请求超时，请检查网络');
    } else {
      message.error('请求发生错误');
    }
    return Promise.reject(error);
  }
);

/**
 * 封装 GET 方法
 * @param {string} url
 * @param {object} params
 * @param {object} config
 */
export const get = (url, params = {}, config = {}) => {
  return http.get(url, { params, ...config });
};

/**
 * 封装 POST 方法
 * @param {string} url
 * @param {object} data
 * @param {object} config
 */
export const post = (url, data = {}, config = {}) => {
  return http.post(url, data, config);
};

/**
 * 封装 PUT 方法
 * @param {string} url
 * @param {object} data
 * @param {object} config
 */
export const put = (url, data = {}, config = {}) => {
  return http.put(url, data, config);
};

/**
 * 封装 DELETE 方法
 * @param {string} url
 * @param {object} config
 */
export const del = (url, config = {}) => {
  return http.delete(url, config);
};

export default http;