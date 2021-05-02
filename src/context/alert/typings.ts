import { ReactNode } from 'react';

export type AlertOptionsType = {
  content: ReactNode;
  autoClose?: boolean;
  autoCloseDuration?: number;
};

export type AlertType = {
  createAlert: (alert: AlertOptionsType) => void;
  alert: AlertOptionsType | undefined;
};
