import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchEmpresas = createAsyncThunk(
  'empresas/fetchEmpresas',
  async () => {
    const response = await api.get('/empresas');
    return response.data;
  }
);

export const addEmpresa = createAsyncThunk(
  'empresas/addEmpresa',
  async (empresa) => {
    const response = await api.post('/empresas', empresa);
    return response.data;
  }
);

export const updateEmpresa = createAsyncThunk(
  'empresas/updateEmpresa',
  async ({ id, empresa }) => {
    const response = await api.put(`/empresas/${id}`, empresa);
    return response.data;
  }
);

export const deleteEmpresa = createAsyncThunk(
  'empresas/deleteEmpresa',
  async (id) => {
    await api.delete(`/empresas/${id}`);
    return id;
  }
);

const empresasSlice = createSlice({
  name: 'empresas',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpresas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmpresas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEmpresas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEmpresa.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEmpresa.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteEmpresa.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export default empresasSlice.reducer;