import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'data/fetchData',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${user.token}` } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default fetchData;
