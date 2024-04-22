// axiosConfig.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.20:8000/api',
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await instance.post('/login', {
      email: email,
      password: password
    });
    if (response.status === 200) {
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      return token;
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await instance.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await instance.post('/logout');
    if (response.status === 200) {
      localStorage.removeItem('token');
      return true;
    }
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const fetchFoods = async (category?: string) => {
  try {
    let url = '/foods';
    if (category) {
      url += `?category=${category}`;
    }
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

export const fetchFoodById = async (id: number) => {
  try {
    const response = await instance.get(`/food/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

export const fetchAddOns = async () => {
  try {
    const response = await instance.get('/addons');
    return response.data;
  } catch (error) {
    console.error('Error fetching add ons:', error);
    throw error;
  }
};

export const fetchAddOnsById = async (id: number) => {
  try {
    const response = await instance.get(`/addons/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

export const orderFood = async () => {
  try {
    const bagItems = JSON.parse(localStorage.getItem('bag'));

    const response = await axios.post('/orders/create', {
      beverage: bagItems.beverage,
      beverage_size: bagItems.beverage_size,
      foods: bagItems.foods,
      add_ons: bagItems.add_ons
    });

    return response.data;
  } catch (error) {
    console.error('Error ordering food:', error);
    throw error;
  }
}

export const submitOrder = async (token) => {
  try {
    const bagItems = JSON.parse(localStorage.getItem('bag'));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const responses = [];

    for (const item of bagItems) {
      const response = await instance.post('/orders/create', item, config);
    }

    localStorage.removeItem('bag');
    return responses;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
}

export const latestOrder = async () => {
  try {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await instance.get('/orders/latest', config);

    return response.data;
  } catch (error) {
    console.error('Error fetching latest order:', error);
    throw error;
  }
}

export default instance;
