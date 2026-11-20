/**
 * @format
 */

import React from 'react';
import { act } from '@testing-library/react-native';
import { render } from '@testing-library/react-native';
import App from '../App';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
});

it('renders without crashing', async () => {
  await render(<App />);

  await act(async () => {
    jest.runOnlyPendingTimers();
  });
});
