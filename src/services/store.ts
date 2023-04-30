import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { rootReducer } from "./reducers";
import { TUserActions } from "./actions/auth";
import { TConstructorIngredientsActions } from "./actions/constructor-ingredients";
import { TIngredientsActions } from "./actions/ingredients";
import { TOrderNumberActions } from "./actions/send-order";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppActions =
  | TUserActions
  | TIngredientsActions
  | TConstructorIngredientsActions
  | TOrderNumberActions;

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
