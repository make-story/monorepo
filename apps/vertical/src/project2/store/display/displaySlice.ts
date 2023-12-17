import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DisplayStateDraft {
  value?: number;
  test?: string;
}

export interface DisplayState {
  value: number;
  test?: { [key: string]: any };
}

const initialState: DisplayState = {
  value: 0,
  test: {},
};

/**
 * action, reducer
 * https://redux-toolkit.js.org/api/createSlice
 */
export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<DisplayStateDraft>) {
      state.value += action.payload?.value || 0;
    },
    up: (state, action) => {
      state.value = state.value + action.payload;
    },
    down: (state, action) => {
      state.value = state.value - action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = displaySlice.actions;
export default displaySlice.reducer;
