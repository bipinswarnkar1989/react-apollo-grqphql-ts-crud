import { FC, Fragment } from 'react';
import { createPortal } from 'react-dom';

import { useAlertContext } from '../../context/alert/useAlertContext';

export const Alert: FC = () => {
  const { alert, createAlert } = useAlertContext();

  return createPortal(
    <Fragment>
      {alert?.content && (
        <div
          style={{
            display: 'block',
            background: '#F48023',
            padding: '12px',
            border: '1px solid #F48023',
            color: 'black',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>{alert?.content}</div>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: '10px',
                transform: 'translate(0, -50%)',
              }}
            >
              <span
                onClick={() => createAlert({ content: '' })}
                style={{
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                X
              </span>
            </div>
          </div>
        </div>
      )}
    </Fragment>,
    document.body
  );
};
