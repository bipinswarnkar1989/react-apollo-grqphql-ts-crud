import { createContext } from 'react';

import { AlertType } from './typings';

export const AlertContext = createContext<AlertType | undefined>(undefined);
