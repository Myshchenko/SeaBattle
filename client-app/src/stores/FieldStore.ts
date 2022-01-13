import { makeAutoObservable } from "mobx";
import agent from "../api/InfoFromApi";
import { field } from "../Game/Models/field";
import { point } from "../Game/Models/point";
import UserStore from "./userStore";

export default class FieldStore {

    pointsForDataBase: point[] | any = [];
    userStore: UserStore | null = null;
    indexToDelete: number | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    handleAddShip = async () => {
        try {
            await agent.Field.setCoordinates(this.pointsForDataBase);
        } catch (error) {
            console.log(error);
            throw error;
        }
        this.pointsForDataBase = [];
    }

    handleDeleteShip = async (indexRow: number, indexColumn: number) => {

        this.pointsForDataBase.forEach((item: point, index: number) => {
            if(item.x === indexRow && item.y === indexColumn) {
                this.indexToDelete = index;
            }}) 

        this.pointsForDataBase.splice(this.indexToDelete, 1);
    }

    handleAddField = async (field: field) => {
        try {
            console.log("works 2 times?");
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