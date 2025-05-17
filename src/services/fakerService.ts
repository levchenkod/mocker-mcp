import axios from 'axios';
import config from '../config';

class FakerService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.fakerApiBaseUrl;
  }

  async getPersons(quantity: number = 1) {
    try {
      const response = await axios.get(`${this.baseUrl}/persons`, {
        params: { _quantity: quantity }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching persons:', error);
      throw error;
    }
  }

  async getProducts(quantity: number = 1) {
    try {
      const response = await axios.get(`${this.baseUrl}/products`, {
        params: { _quantity: quantity }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getTexts(quantity: number = 1, characters: number = 500) {
    try {
      const response = await axios.get(`${this.baseUrl}/texts`, {
        params: { 
          _quantity: quantity,
          _characters: characters
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching texts:', error);
      throw error;
    }
  }

  async getAddresses(quantity: number = 1) {
    try {
      const response = await axios.get(`${this.baseUrl}/addresses`, {
        params: { _quantity: quantity }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching addresses:', error);
      throw error;
    }
  }

  async getCompanies(quantity: number = 1) {
    try {
      const response = await axios.get(`${this.baseUrl}/companies`, {
        params: { _quantity: quantity }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  }
}

export default new FakerService(); 