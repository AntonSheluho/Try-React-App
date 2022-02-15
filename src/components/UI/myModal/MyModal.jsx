import React from 'react';
import classes from './MyModal.module.css';

export default function MyModal({children, visible, setVisible}) {

    const createModal = [classes.myModal];

    if (visible) {
        createModal.push(classes.active)
    }

  return (
    <div className={createModal.join(' ')} onClick={() => setVisible(false)}>
        <div className={classes.myModalContent} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}
