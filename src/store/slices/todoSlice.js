import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: [
    {
      id: crypto.randomUUID(),
      body: "Вивчити основи Redux Toolkit",
      isDone: true,
      deadline: "2026-10-30",
    },
    {
      id: crypto.randomUUID(),
      body: "Виконати завдання з Redux Toolkit (RTK)",
      isDone: false,
      deadline: "2026-11-01",
    },
  ],
};

const todoSlice = createSlice({
  initialState,
  name: "todo",
  reducers: {
    addTask: (state, { payload }) => {
      state.todo = [...state.todo, payload];
    },
    toggleTask: (state, { payload: { id, data } }) => {
      const toUpdate = state.todo.findIndex((t) => t.id === id);
      state.todo[toUpdate] = { ...state.todo[toUpdate], ...data };
    },
    deleteTask: (state, { payload }) => {
      state.todo = state.todo.filter((t) => t.id !== payload);
    },
  },
});

const { reducer, actions } = todoSlice;

export const { addTask, deleteTask, toggleTask } = actions;

export default reducer;
