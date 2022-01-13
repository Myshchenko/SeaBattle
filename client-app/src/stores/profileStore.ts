import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/InfoFromApi";
import { Profile } from "../Users/Models/profile";
import { ProfileGames } from "../Users/Models/profileGames";


export default class ProfileStore {
    profile: Profile | null = null;
    profileGames: ProfileGames[] = [];
    loadedGames = new Map<string, ProfileGames>();

    constructor() {
        makeAutoObservable(this);
    }

    getProfileInfo = async(login: string) => {
        try{
            const profile = await agent.Profiles.getCurrent(login);
            runInAction(() =>{
                this.profile = profile;
            })
        } catch (error) {  
            console.log(error);
        }
    }

    getProfileGameInfo = async(login: string) => {
        try{
            const ProfileGames = await agent.Profiles.getGameInfo(login);
            runInAction(() => {
                ProfileGames.forEach((game: any) => {
                    this.profileGames.push(game);
                }); 
            })
        } catch (error) {  
            console.log(error);
        }
    }
}