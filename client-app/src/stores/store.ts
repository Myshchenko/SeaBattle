import { createContext, useContext } from "react";
import FieldOptionsStore from "./FieldOptionsStore";
import FieldStore from "./FieldStore";
import GameStore from "./GameStore";
import ProfileStore from "./profileStore";
import SignalRStore from "./SignalRStore";
import UserStore from "./userStore";

interface Store {
    userStore: UserStore;
    fieldStore: FieldStore;
    fieldOptionsStore: FieldOptionsStore;
    profileStore: ProfileStore;
    signalRStore: SignalRStore;
    gameStore: GameStore;
   
}

export const store: Store = {
    userStore: new UserStore(),
    fieldStore: new FieldStore(),
    fieldOptionsStore: new FieldOptionsStore(),
    profileStore: new ProfileStore(),
    signalRStore: new SignalRStore(),
    gameStore: new GameStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}

