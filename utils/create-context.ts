import {
  createContext as createReactContext,
  useContext as useReactContext,
} from 'react';

export const createContext = <T>() => {
  const Context = createReactContext<T | undefined>(undefined);
  const useContext = () => {
    const contextValue = useReactContext(Context);
    if (contextValue === undefined) {
      throw new Error(
        'useContext must be called inside a Provider with a value',
      );
    }
    return contextValue;
  };

  return [useContext, Context.Provider] as const;
};
