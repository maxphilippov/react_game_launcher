import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  Game,
  selectGames,
  downloadGame,
  addToLibrary
} from './librarySlice';
import styles from './Library.module.css';

export function Library() {
  const games = useAppSelector(selectGames);
  const dispatch = useAppDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  // const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.game}>

        <div><a onClick={()=>dispatch(addToLibrary())}>Add to library</a></div>

        {games.map(g => (
            <div>
              <div>{g.name}</div>
              <div>{g.status}</div>
              <div><a onClick={()=>dispatch(downloadGame(g))}>Download</a></div>
            </div>
          )}
      </div>
    </div>
  );
}
