import { action, makeObservable, observable } from "mobx";

export default class AuthStore {
    constructor(rootStore) {

        this.BASE_URL = 'http://localhost:8000/api/auth';
        this.isAuthenticated = false;
        this.token = null;
        this.rootStore = rootStore;

        makeObservable(this, {
            isAuthenticated: observable,
            token: observable,
            setIsAuthenticated: action,
            setToken: action,
            login: action,
            logout: action
        });

        this.rootStore = rootStore;
        this.setToken(localStorage.getItem('_token'))
        if(this.token) this.isAuthenticated = true;

    }

    setIsAuthenticated(value) {
        this.isAuthenticated = value;
        if (!value) this.setToken(null);
    }

    setToken(value) {
        if (value) {
            localStorage.setItem("_token", value);
        } else {
            localStorage.removeItem("_token");
        }
        this.token = value;
    }

    login = async (postData) => {
        try {
            const response = await fetch(this.BASE_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });

            const data = await response.json();
            if (data.error) {
                this.rootStore.handleError(response.status, data.message, data);
                return Promise.reject(data);
            } else {
                this.setIsAuthenticated(true);
                this.setToken(data.access_token);
                return Promise.resolve(data);
            }
        } catch (error) {
            this.rootStore.handleError(419, "Something goes wrong", error);
        }
    };

    logout() {
        // Implementation for logout action
    }
}
