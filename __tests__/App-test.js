/**
 * @format
 */

import 'react-native';
import React from 'react';
import { act } from 'react-test-renderer';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
});

it('renders correctly', async () => {
  let tree;

  await act(async () => {
    tree = renderer.create(<App />);
  });

  await act(async () => {
    jest.runOnlyPendingTimers();
  });

  await act(async () => {
    tree.unmount();
  });

  await act(async () => {
    jest.runOnlyPendingTimers();
  });
});
