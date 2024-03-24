import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ItemReducer from './ItemSlice.ts'

const rootReducer = combineReducers({
  item:ItemReducer
})


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist:["item"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export type RootState = ReturnType<typeof rootReducer>;
export let persistor = persistStore(store)
export default store
