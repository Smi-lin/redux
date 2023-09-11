import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { event } from '../server';

// Define your initial state here
const initialState = {
  isLoading: false,
  event: null,
  events: [],
  message: '',
  error: null,
};

// Define your async thunk actions
export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (data, { rejectWithValue }) => {
    try {
      const { d } = await axios.post(`${event}/createEvent`, data);
      return d.event;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllEventsShop = createAsyncThunk(
  'event/getAllEventsShop',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${event}/getAllEvents`);
      return data.events;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${event}/deleteEvents`, {
        withCredentials: true,
      });
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllEvents = createAsyncThunk(
  'event/getAllEvents',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${event}/getEvents`);
      return data.events;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create your eventSlice
const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
        state.message = 'Event created successfully';
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllEventsShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEventsShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(getAllEventsShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allEvents = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = eventSlice.actions;

export default eventSlice.reducer;
