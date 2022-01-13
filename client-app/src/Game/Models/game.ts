export class game {

    //gameId: string | null = null;

    gameDate: Date | null = null;
    firstUserLogin: string | null = null;
    secondUserLogin: string | null = null;

    public setGame(gameDate: Date, firstUserLogin: string, secondUserLogin: string){
        this.gameDate = gameDate;
        this.firstUserLogin = firstUserLogin;
        this.secondUserLogin = secondUserLogin;
    }
}
