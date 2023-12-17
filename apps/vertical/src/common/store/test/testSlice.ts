import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestStateDraft {
  value?: number;
}

export interface TestState {
  value: number;
}

const initialState: TestState = {
  value: 0,
};

/**
 * action, reducer
 * https://redux-toolkit.js.org/api/createSlice
 */
export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<TestStateDraft>) {
      state.value += action.payload?.value || 0;
    },
  },
});

export const { increment, decrement, incrementByAmount } = testSlice.actions;
export default testSlice.reducer;
