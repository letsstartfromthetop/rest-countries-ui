import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch (error.response.status) {
        case 404:
          return Promise.reject(new Error('Country not found'));
        case 429:
          return Promise.reject(new Error('Too many requests. Please try again later.'));
        default:
          return Promise.reject(new Error('An error occurred while fetching data'));
      }
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(new Error('No response received from server'));
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(new Error('Error setting up the request'));
    }
  }
);

export const countryService = {
  // Get all countries with specific fields
  getAllCountries(fields = 'name,population,region,flags,capital') {
    return api.get(`/all?fields=${fields}`);
  },

  // Search countries by name
  searchByName(name) {
    return api.get(`/name/${name}?fields=name,population,region,flags,capital`);
  },

  // Get countries by region
  getByRegion(region) {
    return api.get(`/region/${region}?fields=name,population,region,flags,capital`);
  },

  // Get detailed country information
  getCountryDetails(name) {
    return api.get(`/name/${name}?fullText=true&fields=name,population,flags,capital,nativeName,language,region,subregion,tld,currencies,languages,borders`);
  },
};

export default countryService; 