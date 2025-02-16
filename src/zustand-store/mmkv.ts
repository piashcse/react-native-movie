import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();
export const zustandMMKVStorage = {
  setItem: (name: string, value: string) => storage.set(name, value),
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value !== undefined ? value : null;
  },
  removeItem: (name: string) => storage.delete(name),
};
