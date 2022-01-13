import { makeAutoObservable } from "mobx";
import agent from "../api/InfoFromApi";
import { game } from "../Game/Models/game";
import { UserAfterGame } from "../Users/Models/userAfterGame";

export default class GameStore {

    countOfSuccessfulHittedPoints: number = 0;
    countOAllfulHittedPoints: number = 0;

    isMyTurn: boolean = false;
    
    winner: string = "";
    
    constructor() {
        makeAutoObservable(this);
    }

    createGame = async (game: game) => {
        try {
            await agent.Game.createGame(game);
        } catch (error) {
            console.log(error);
        }
    }

    updateGame = async (user: UserAfterGame) => {
        try {
            await agent.Game.endGame(user);
        } catch (error) {
            console.log(error);
        }
    }
}