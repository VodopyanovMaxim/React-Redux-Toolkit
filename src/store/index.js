import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice'

const store = configureStore({reducer:{
    todoList: todoReducer
}})

export default store