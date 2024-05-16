import { configureStore } from '@reduxjs/toolkit'
import staff from '@/store/reducers/staffSlice'

const store = configureStore({
    reducer: { staff },
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
