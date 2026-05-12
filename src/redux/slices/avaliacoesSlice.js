import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAvaliacoes = createAsyncThunk(
  'avaliacoes/fetchAvaliacoes',
  async () => {
    const response = await api.get('/avaliacoes');
    return response.data;
  }
);

export const addAvaliacao = createAsyncThunk(
  'avaliacoes/addAvaliacao',
  async (avaliacao) => {
    const response = await api.post('/avaliacoes', avaliacao);
    return response.data;
  }
);

export const updateAvaliacao = createAsyncThunk(
  'avaliacoes/updateAvaliacao',
  async ({ id, avaliacao }) => {
    const response = await api.put(`/avaliacoes/${id}`, avaliacao);
    return response.data;
  }
);

export const deleteAvaliacao = createAsyncThunk(
  'avaliacoes/deleteAvaliacao',
  async (id) => {
    await api.delete(`/avaliacoes/${id}`);
    return id;
  }
);

const avaliacoesSlice = createSlice({
  name: 'avaliacoes',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvaliacoes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvaliacoes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAvaliacoes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addAvaliacao.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateAvaliacao.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteAvaliacao.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export default avaliacoesSlice.reducer;