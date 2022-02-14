import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/InfoFromApi";
import { field } from "../Game/Models/field";
import { point } from "../Game/Models/point";

export default class FieldStore {

    pointsForDataBase: point[] | any = [];
    indexToDelete: number | null = null;
    shipAdded: boolean = true;

    isErrorLabelShowed: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    setIsErrorLabelShowed = (flag: boolean) => {
        this.isErrorLabelShowed = flag;
    }

    handleAddShip = async () => {
        try {
            await agent.Field.setCoordinates(this.pointsForDataBase);
            runInAction(() => { this.shipAdded = true; })           
        } catch (error) {
            runInAction(() => { this.shipAdded = false; })
            console.log(error);
            //this.setIsErrorLabelShowed(true);
            throw error;
        }
       this.pointsForDataBase = [];
    }

    handleDeleteShip = async (indexRow: number, indexColumn: number) => {

        this.pointsForDataBase.forEach((item: point, index: number) => {
            if (item.x === indexRow && item.y === indexColumn) {
                this.indexToDelete = index;
            }
        })

        this.pointsForDataBase.splice(this.indexToDelete, 1);
    }

    handleAddField = async (field: field) => {
        try {
            await agent.Field.createField(field);
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteField = async (login: string) => {
        try {
            await agent.Field.deleteField(login);
        } catch (error) {
            console.log(error);
        }
    }

    handleClearField = async (login: string) => {
        try {
            await agent.Field.clearField(login);
        } catch (error) {
            console.log(error);
        }
    }
}