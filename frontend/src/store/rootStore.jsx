import { createContext } from "react";
import AuthStore from "./authStore";
import { useContext } from "react";


export class RootStore {
    constructor() {
        console.log("RootStore");
        this.authStore = new AuthStore(this);
    }

    handleError(errorCode = null, errorMessage, errorData) {
        console.error("handleError: ", errorData);
        if (errorCode === 403) {
            this.authStore.setIsAuthenticated(false);
            return null;
        }
        this.alertStore.open({ status: "error", message: errorMessage });
    }
}

const rootStoreContext = createContext({
    rootStore: new RootStore()
});

export const useStore = () => useContext(rootStoreContext);
