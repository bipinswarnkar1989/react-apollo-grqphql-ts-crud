import { useContext } from 'react';

import { AlertType } from './typings';

import { AlertContext } from './AlertContext';

export const useAlertContext = (): AlertType => {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error(
      'useAlertContext must be used within a AlertContextProvider'
    );
  }

  return context;
};
