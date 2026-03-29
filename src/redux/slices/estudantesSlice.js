import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchEstudantes = createAsyncThunk(
  'estudantes/fetchEstudantes',
  async () => {
    const response = await api.get('/estudantes');
    return response.data;
  }
);

export const addEstudante = createAsyncThunk(
  'estudantes/addEstudante',
  async (estudante) => {
    const response = await api.post('/estudantes', estudante);
    return response.data;
  }
);

export const updateEstudante = createAsyncThunk(
  'estudantes/updateEstudante',
  async ({ id, estudante }) => {
    const response = await api.put(`/estudantes/${id}`, estudante);
    return response.data;
  }
);

export const deleteEstudante = createAsyncThunk(
  'estudantes/deleteEstudante',
  async (id) => {
    await api.delete(`/estudantes/${id}`);
    return id;
  }
);

const estudantesSlice = createSlice({
  name: 'estudantes',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstudantes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEstudantes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEstudantes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEstudante.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEstudante.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteEstudante.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export default estudantesSlice.reducer;
