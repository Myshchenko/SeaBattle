export class User{
    login: string = "";
    countOfWins: number = 0;
    allGames: number = 0;
    isReadyToPlay: boolean = false;
    winner: boolean = false;
}

export class UserFormValues{
    email: string = "";
    password: string = "";
    login?: string = "";
}