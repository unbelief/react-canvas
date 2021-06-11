import {
  useState,
  useMemo,
  useEffect,
  useLayoutEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Observable, BehaviorSubject, Subject, Subscription } from "rxjs";

export const useObservable = (Observable, initValue) => {
  const [initialState, subscription] = useMemo(() => {
    let initialState = initValue;
    const source = Observable();
    let setter = (v) => {
      if (!setValue) {
        initialState = v;
      } else {
        setValue(v);
        setter = setValue;
      }
    };
    const subscription = source.subscribe((v) => setter(v));
    return [initialState, subscription];
  }, []);
  const [value, setValue] = useState(initialState);
  useEffect(
    () => () => {
      subscription.unsubscribe();
    },
    []
  );

  return value;
};

export const useEventHandler = (Observable) => {};
