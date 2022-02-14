import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { point } from "../Game/Models/point";
import { inviting } from "../Users/Models/inviting";
import { User } from "../Users/Models/user";

export default class SignalRStore {
    hubConnection: HubConnection | null = null;
    invitingsArray: inviting[] = [];
    invitationAccepted: inviting | null = null;

    CURRENTUSEROPPONENT: User | null = null;
    CURRENTUSER: User | null = null;
    readyUser: User | null = null;

    firedPoints: point[] = [];

    SUCCESSFULPOINTS: number = 0;
    ALLPOINTS: number = 0;

    whoseturnToFire: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = async () => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("http://localhost:5000/opponents")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("UsersSendedInvitings", (inviting) => {
                runInAction(() => {
                    this.invitingsArray.push(inviting);
                })
            });

            connection.on("StartEditing", (flag: inviting) => {
                runInAction(() => {
                    this.invitationAccepted = flag;
                    this.CURRENTUSEROPPONENT = flag.sender;
                    this.CURRENTUSER = flag.recipient;
                })
            });

            connection.on("GameStarded", (user: User) => {
                runInAction(() => {
                    this.readyUser = user;
                })
            });

            connection.on("PointFired", (point: point) => {
                runInAction(() => {
                    this.firedPoints.push(point);
                    if (point.result === "Ранил!") {  
                        this.SUCCESSFULPOINTS = this.SUCCESSFULPOINTS + 1;
                    }
                    this.ALLPOINTS = this.ALLPOINTS + 1;
                })
            });

            connection.on("Turn", (login: string) => {
                runInAction(() => {
                    this.whoseturnToFire = login;
                })
            });

            connection.onclose(e => {
                runInAction(() => {
                    this.hubConnection = null;
                    this.invitingsArray = [];
                })
            });

            await connection.start();

            runInAction(() => {
                this.hubConnection = connection;
            })

        } catch (e) {
            console.log(e);
        }
    }

    sendInv = async (inv: inviting) => {
        try {
            await this.hubConnection!.invoke("SendInvitation", inv);
        } catch (e) {
            console.log(e);
        }
    }

    receiveInv = async (flag: inviting) => {
        try {
            await this.hubConnection!.invoke("ReceiveInvitation", flag);
        } catch (e) {
            console.log(e);
        }
    }

    startingGame = async (flag: User | null) => {
        try {
            await this.hubConnection!.invoke("StartGame", flag);
        } catch (e) {
            console.log(e);
        }
    }

    firePoint = async (point: point) => {
        try {
            await this.hubConnection!.invoke("FirePoint", point);
        } catch (e) {
            console.log(e);
        }
    }

    closeConnection = async () => {
        try {
            await runInAction(() => {
                this.hubConnection!.stop();
            })
            this.ClearAll();
        } catch (e) {
            console.log(e);
        }
    }

    changingTurn = async (login: string) => {
        try {
            await this.hubConnection!.invoke("ChangeTurn", login);
        } catch (e) {
            console.log(e);
        }
    }

    ClearAll = async () => {
        this.invitationAccepted = null;
        this.CURRENTUSER = null;
        this.CURRENTUSEROPPONENT = null;
        this.readyUser = null;
        this.firedPoints = [];
    }
}
