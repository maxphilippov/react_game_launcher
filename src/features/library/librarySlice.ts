import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

type GameStatus = 'playable' | 'downloading' | 'available';

function fetchGame(game: Game) {
  return new Promise<{ status: GameStatus }>((resolve) =>
    setTimeout(() => resolve({ status: 'playable' }), game.timeToDownload)
  );
}

export interface GameDownloadData {
  id: number;
  name: String;
  ETA: number;
}

export interface Game {
  id: number;
  name: String;
  status: GameStatus;
  timeToDownload: number;
}

export interface LibraryState {
  games: Game[];
  gamesDownloading: GameDownloadData[];
  lastId: number;
}

const initialState: LibraryState = {
  games: [],
  gamesDownloading: [],
  lastId: 0,
};

for (let i = 0; i < 400; ++i) {
  initialState.games.push({id: initialState.lastId, name: "Game#"+initialState.lastId, status: 'available', timeToDownload: 4000});
  initialState.lastId += 1;
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// // typically used to make async requests.
export const downloadGame = createAsyncThunk(
  'library/fetchGame',
  async (game: Game) => {
    const response = await fetchGame(game);
    // The value we return becomes the `fulfilled` action payload
    return { status: response.status, id: game.id };
  }
);

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToLibrary: (state) => {
      state.games.push({id: state.lastId, name: "Game#"+state.lastId, status: 'available', timeToDownload: 4000});
      state.lastId += 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // state.value += action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(downloadGame.pending, (state) => {
      })
      .addCase(downloadGame.fulfilled, (state, action) => {
        let idx = state.games.findIndex((v) => v.id === action.payload.id);

        if (idx !== -1) {
          state.games[idx].status = 'playable'
        }
      });
  },
});

export const { addToLibrary } = librarySlice.actions;

export const selectGames = (state: RootState) => state.library.games;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//   dispatch,
//   getState
// ) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default librarySlice.reducer;
