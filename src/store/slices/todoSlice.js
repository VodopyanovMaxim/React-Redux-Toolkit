import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from '../../api'

const initialState = {
  todo: [],
  isFetching: false,
  error: null,
};

export const getTodoThunk = createAsyncThunk(
  "todo/getTodo",
  async (payload, thunkAPI) => {
    try {
      const { data } = await API.getTodo(5);
      return data.map((t) => ({
        id: t.id,
        body: t.title,
        isDone: t.completed,
        deadline: null,
      }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

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
  extraReducers: (builder) => {
    builder.addCase(getTodoThunk.pending, (state, action) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTodoThunk.fulfilled, (state, { payload }) => {
      state.todo = payload;
      state.isFetching = false;
      state.error = null;
    });
    builder.addCase(getTodoThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer, actions } = todoSlice;

export const { addTask, deleteTask, toggleTask } = actions;

export default reducer;
