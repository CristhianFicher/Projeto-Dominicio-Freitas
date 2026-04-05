import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import estudantesReducer from '../redux/slices/estudantesSlice';
import empresasReducer from '../redux/slices/empresasSlice';
import funcionariosReducer from '../redux/slices/funcionariosSlice';
import avaliacoesReducer from '../redux/slices/avaliacoesSlice';

export function createTestStore(preloadedState) {
  return configureStore({
    reducer: {
      estudantes: estudantesReducer,
      empresas: empresasReducer,
      funcionarios: funcionariosReducer,
      avaliacoes: avaliacoesReducer,
    },
    preloadedState,
  });
}

export function renderWithProvidersAndRouter(
  ui,
  {
    preloadedState,
    route = '/',
    path = '/',
  } = {},
) {
  const store = createTestStore(preloadedState);

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    ),
  };
}
