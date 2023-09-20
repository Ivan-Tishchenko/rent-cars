import axios from 'axios';

axios.defaults.baseURL = 'https://648af2b517f1536d65ea0198.mockapi.io';

const getCars = async page => {
  const cars = await axios.get(`/cars?page=${page}&limit=8`);
  console.log(cars.data);
  return cars.data;
};

const getCarById = async id => {
  const car = await axios.get(`/cars/${id}`);
  return car.data;
};

export { getCarById, getCars };
