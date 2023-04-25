import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { rootReducer } from "./reducers";

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;