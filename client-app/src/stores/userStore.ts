import { makeAutoObservable, runInAction } from "mobx";
import { history } from "..";
import agent from "../api/InfoFromApi";
import { Profile } from "../Users/Models/profile";
import { User, UserFormValues } from "../Users/Models/user";

export default class UserStore {
    users: User[] | any = [];
    profile: Profile | null = null;
    loadedUsers = new Map<string, User>();

    currentUser: User | null = null;
    currentUserOpponent: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            runInAction(() => this.currentUser = user);
            history.push('/findOpponent');
        }
        catch (error) {
            throw error;
        }
    }

    logout = () => {
        this.currentUser = null;
        history.push('/');
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            runInAction(() => this.currentUser = user);
            history.push('/findOpponent');
        }
        catch (error) {
            throw error;
        }
    }
    
    loadUsers = async (login: string) => {
        try {
            const users = await agent.Profiles.list(login);
            runInAction(() => {
                users.forEach((user: any) => {
                    this.users.push(user);
                    this.loadedUsers.set(user.id, user);
                });
            })
        } catch (error) {
            console.log(error);
        }
    }

    resetStateUser = () => {
        this.currentUser!.winner = false;
    }
}
