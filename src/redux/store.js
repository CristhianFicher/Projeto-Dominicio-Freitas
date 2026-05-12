import { configureStore } from '@reduxjs/toolkit';
import estudantesReducer from './slices/estudantesSlice';
import empresasReducer from './slices/empresasSlice';
import funcionariosReducer from './slices/funcionariosSlice';
import avaliacoesReducer from './slices/avaliacoesSlice';

export const store = configureStore({
  reducer: {
    estudantes: estudantesReducer,
    empresas: empresasReducer,
    funcionarios: funcionariosReducer,
    avaliacoes: avaliacoesReducer,
  },
});