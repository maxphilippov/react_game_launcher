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
      <div>
        <div><a onClick={()=>dispatch(addToLibrary())}>Add to library</a></div>


        <div className={styles.game_list}>
          {games.filter(g => g.status === 'playable').map(g => (
              <div className={styles.game} key={g.id}>
                <div className={styles.game_header}>{g.name}</div>
                <div className={styles.game_status}>{g.status}</div>
                <div>
                  <button className={styles.button}>Play game</button>
                  <button className={styles.button}>Uninstall</button>
                </div>
              </div>
            ))}
        </div>

        <div className={styles.game_list}>
          {games.filter(g => g.status === 'available' || g.status === 'downloading').map(g => (
              <div className={styles.game} key={g.id}>
                <div className={styles.game_header}>{g.name}</div>
                <div className={styles.game_status}>{g.status}</div>
                <div>
                  <button className={styles.asyncButton} onClick={()=>dispatch(downloadGame(g))}>Download</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
