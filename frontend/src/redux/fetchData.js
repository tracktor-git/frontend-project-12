import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'data/fetchData',
  async (authHeader, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.dataPath, { headers: authHeader });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default fetchData;
