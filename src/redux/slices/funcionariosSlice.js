import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchFuncionarios = createAsyncThunk(
  'funcionarios/fetchFuncionarios',
  async () => {
    const response = await api.get('/funcionarios');
    return response.data;
  }
);

export const addFuncionario = createAsyncThunk(
  'funcionarios/addFuncionario',
  async (funcionario) => {
    const response = await api.post('/funcionarios', funcionario);
    return response.data;
  }
);

export const updateFuncionario = createAsyncThunk(
  'funcionarios/updateFuncionario',
  async ({ id, funcionario }) => {
    const response = await api.put(`/funcionarios/${id}`, funcionario);
    return response.data;
  }
);

export const deleteFuncionario = createAsyncThunk(
  'funcionarios/deleteFuncionario',
  async (id) => {
    await api.delete(`/funcionarios/${id}`);
    return id;
  }
);

const funcionariosSlice = createSlice({
  name: 'funcionarios',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFuncionarios.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFuncionarios.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchFuncionarios.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFuncionario.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateFuncionario.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteFuncionario.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export default funcionariosSlice.reducer;