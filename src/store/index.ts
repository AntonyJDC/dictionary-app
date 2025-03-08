import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa localStorage
import { combineReducers } from "redux";

// Combina reducers si tienes más de uno
const rootReducer = combineReducers({
  theme: themeReducer,
});

// Configuración de persistencia
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Evita errores con redux-persist
    }),
});

// Creamos el persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
