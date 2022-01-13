import { makeAutoObservable } from "mobx";

export default class FieldOptionsStore {

    isCheckBoxVisible: boolean = true;
    isButtonStartVisible: boolean = true;
    isEnemyFieldVisible: boolean = false;
    isOkButtonVisible: boolean = true;
    isAllowedToAddShips: boolean = false;
    isSquareHasX: boolean = false;
    isErrorLabelShowed: boolean = false;
    isClearButtonVisible: boolean = true;

    constructor() {
        makeAutoObservable(this)
    }

    HideEditingWindows = () => {
        this.isButtonStartVisible = false;
        this.isCheckBoxVisible = false;
        this.isOkButtonVisible = false;
        this.isClearButtonVisible = false;
        this.isAllowedToAddShips = false;
    }

    resetVisibless = () => {
        this.isButtonStartVisible = true;
        this.isCheckBoxVisible = true;
        this.isOkButtonVisible = true;
        this.isClearButtonVisible = true;
        this.isAllowedToAddShips = false;
    }

    // Корабль выбран и можно разрешить клик по полю
    setIsAllowedToAddShips = (flag: boolean) => {
        this.isAllowedToAddShips = flag;
    }

    setIsSquareHasX = (flag: boolean) => {
        this.isSquareHasX = flag;
    }

    setIsErrorLabelShowed = (flag: boolean) => {
        this.isErrorLabelShowed = flag;
    }

    firedPoints: number[][] = [[]];
    firedCount: number = 0;
    isGameStarted: boolean = false;

    ALL_POINTS: number = 0; // сколько стоит на поле всего
    CURRENT_FILLED_POINTS: number = 0;  // сколько на момент ставки корабля
    CHOOSED_POINTS: number = 0;    // сколько выбрано в чек боксе 

    // Сколько кораблей какого вида осталось
    countOnePointShip: number = 4;
    countTwoPointShip: number = 3;
    countThreePointShip: number = 2;
    countFourPointShip: number = 1;

    // Какой корабль выбран
    choosedOnePointShip: boolean = false;
    choosedTwoPointShip: boolean = false;
    choosedThreePointShip: boolean = false;
    choosedFourPointShip: boolean = false;

    // Можно ли еще поставить корабль
    isOnePointShipAvialable: boolean = true;
    isTwoPointShipAvialable: boolean = true;
    isThreePointShipAvialable: boolean = true;
    isFourPointShipAvialable: boolean = true;

    imReadyToPlay: boolean = false;

    CheckIsShipChoosed() {
        return (this.choosedOnePointShip || this.choosedTwoPointShip || this.choosedThreePointShip || this.choosedFourPointShip);
    }

    DecrementCheckedChip = () => {
        if (this.choosedOnePointShip) {
            this.countOnePointShip = this.countOnePointShip - 1;
            this.choosedOnePointShip = false;
            if (this.countOnePointShip === 0) {
                this.isOnePointShipAvialable = false;
            }
        }

        if (this.choosedTwoPointShip) {
            this.countTwoPointShip = this.countTwoPointShip - 1;
            this.choosedTwoPointShip = false;
            if (this.countTwoPointShip === 0) {
                this.isTwoPointShipAvialable = false;
            }
        }

        if (this.choosedThreePointShip) {
            this.countThreePointShip = this.countThreePointShip - 1;
            this.choosedThreePointShip = false;
            if (this.countThreePointShip === 0) {
                this.isThreePointShipAvialable = false;
            }
        }

        if (this.choosedFourPointShip) {
            this.countFourPointShip = this.countFourPointShip - 1;
            this.choosedFourPointShip = false;
            if (this.countFourPointShip === 0) {
                this.isFourPointShipAvialable = false;
            }
        }
    }

    ClearAll = () => {
        this.countOnePointShip = 4;
        this.countTwoPointShip = 3;
        this.countThreePointShip = 2;
        this.countFourPointShip = 1;

        this.choosedOnePointShip = false;
        this.choosedTwoPointShip = false;
        this.choosedThreePointShip = false;
        this.choosedFourPointShip = false;

        this.isOnePointShipAvialable = true;
        this.isTwoPointShipAvialable = true;
        this.isThreePointShipAvialable = true;
        this.isFourPointShipAvialable = true;

        this.ALL_POINTS = 0;
        this.CURRENT_FILLED_POINTS = 0;
        this.CHOOSED_POINTS = 0;

        this.imReadyToPlay = false;
        this.isGameStarted = false;
    }
}