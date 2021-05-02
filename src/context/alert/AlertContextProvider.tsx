import { FC, useState, useMemo, useCallback, useEffect, useRef } from 'react';

import { AlertContext } from './AlertContext';

import { AlertOptionsType } from './typings';

const AUTO_CLOSE_DURATION = 4000;

export const AlertContextProvider: FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertOptionsType | undefined>(undefined);
  let timeout = useRef(0);

  const createAlert = useCallback((alert: AlertOptionsType) => {
    setAlert(alert);
  }, []);

  const contextValue = useMemo(
    () => ({
      createAlert: createAlert,
      alert: alert,
    }),
    [alert, createAlert]
  );

  useEffect(() => {
    if (alert && alert.autoClose) {
      const duration = alert.autoCloseDuration ?? AUTO_CLOSE_DURATION;
      timeout.current = window.setTimeout(() => {
        setAlert(undefined);
      }, duration);
    }
  }, [alert]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};
