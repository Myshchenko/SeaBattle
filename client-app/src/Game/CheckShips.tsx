import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function CheckShips() {

    const { fieldOptionsStore } = useStore();

    return (
        <>
            <Segment>
                <h3>Выбор корабля:</h3>

                <Button
                    disabled={!fieldOptionsStore.isOnePointShipAvialable}
                    onClick={
                        () => {
                            fieldOptionsStore.setIsAllowedToAddShips(true);
                            fieldOptionsStore.CHOOSED_POINTS = 1;
                            runInAction(() => {
                                fieldOptionsStore.choosedOnePointShip = true;
                            })
                        }} >
                    <div className={'squareCheck'} />
                    ({fieldOptionsStore.countOnePointShip})
                </Button>

                <Button
                    disabled={!fieldOptionsStore.isTwoPointShipAvialable}
                    onClick={
                        () => {
                            fieldOptionsStore.setIsAllowedToAddShips(true);
                            fieldOptionsStore.CHOOSED_POINTS = 2;
                            runInAction(() => {
                                fieldOptionsStore.choosedTwoPointShip = true;
                            })
                        }}>
                    <div className={'squareCheck'} />
                    <div className={'squareCheck'} />
                    ({fieldOptionsStore.countTwoPointShip})
                </Button>

                <Button
                    disabled={!fieldOptionsStore.isThreePointShipAvialable}
                    onClick={
                        () => {
                            fieldOptionsStore.setIsAllowedToAddShips(true);
                            fieldOptionsStore.CHOOSED_POINTS = 3;
                            runInAction(() => {
                                fieldOptionsStore.choosedThreePointShip = true;
                            })
                        }} >
                    <div className={'squareCheck'} />
                    <div className={'squareCheck'} />
                    <div className={'squareCheck'} />
                    ({fieldOptionsStore.countThreePointShip})
                </Button>

                <Button
                    disabled={!fieldOptionsStore.isFourPointShipAvialable}
                    onClick={
                        () => {
                            fieldOptionsStore.setIsAllowedToAddShips(true);
                            fieldOptionsStore.CHOOSED_POINTS = 4;
                            runInAction(() => {
                                fieldOptionsStore.choosedFourPointShip = true;
                            })
                        }} >
                    <div className={'squareCheck'} />
                    <div className={'squareCheck'} />
                    <div className={'squareCheck'} />
                    <div className={'squareCheck'} />
                    ({fieldOptionsStore.countFourPointShip})
                </Button>

            </Segment>
        </>
    )
})