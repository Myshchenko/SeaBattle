import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Label, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { point } from "./Models/point";

export default observer(function CreateField() {

    const { fieldOptionsStore, userStore, fieldStore} = useStore();

    const [arr, setArr] = useState<string[][]>([
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
    ]);

    function pointX(row: number, column: number) {

        let copy = [...arr];
        copy[row][column] = "X";
        setArr(copy);

        runInAction(() => {
            fieldOptionsStore.CURRENT_FILLED_POINTS = fieldOptionsStore.CURRENT_FILLED_POINTS + 1;
            fieldOptionsStore.ALL_POINTS = fieldOptionsStore.ALL_POINTS + 1;
        })
    }

    function pointSpase(row: number, column: number) {
        fieldOptionsStore.setIsSquareHasX(false);
        let copy = [...arr];
        copy[row][column] = "";
        setArr(copy);
        runInAction(() => {
            fieldOptionsStore.CURRENT_FILLED_POINTS = fieldOptionsStore.CURRENT_FILLED_POINTS - 1;
            fieldOptionsStore.ALL_POINTS = fieldOptionsStore.ALL_POINTS - 1;
        })
    }

    const coordinates = new point();

    return (
        <>
            <Segment>
                <h2 >Моё поле</h2>
                {arr.map((row, indexRow) => (
                    <div className="field-row" key={indexRow}>
                        {row.map((number, indexColumn) => (
                            <button
                                disabled={fieldOptionsStore.CheckIsShipChoosed() ? false : true}
                                className={'square'}
                                key={indexColumn}
                                onClick={
                                    () => {
                                        if (arr[indexRow][indexColumn] === "") {
                                            pointX(indexRow, indexColumn);
                                            coordinates.setPoint(indexRow, indexColumn, userStore.currentUser!.login, null);
                                            fieldStore.pointsForDataBase.push(coordinates);
                                        }
                                        else {
                                            pointSpase(indexRow, indexColumn);
                                            fieldStore.handleDeleteShip(indexRow, indexColumn);
                                        }
                                    }
                                }
                            >
                                {arr[indexRow][indexColumn]}
                            </button>
                        ))}
                    </div>
                ))}

                {fieldOptionsStore.isErrorLabelShowed && (
                    <>
                        <h6> </h6>
                        <Label basic color='red'>
                            Неправильное количество кораблей.
                        </Label>
                    </>
                )}

                {fieldOptionsStore.isOkButtonVisible && (
                    <>
                        <h6> </h6>
                        <Button content="ОК"
                            disabled={fieldOptionsStore.CheckIsShipChoosed() ? false : true}
                            onClick={() => {

                                if (fieldOptionsStore.CURRENT_FILLED_POINTS !== fieldOptionsStore.CHOOSED_POINTS || fieldOptionsStore.CHOOSED_POINTS === 0) {
                                    fieldOptionsStore.setIsErrorLabelShowed(true);
                                }
                                else {
                                    fieldStore.handleAddShip();
                                    fieldOptionsStore.setIsAllowedToAddShips(false);
                                    fieldOptionsStore.setIsErrorLabelShowed(false);
                                    fieldOptionsStore.DecrementCheckedChip();
                                    fieldOptionsStore.CURRENT_FILLED_POINTS = 0;
                                    fieldOptionsStore.CHOOSED_POINTS = 0;
                                }
                            }}
                        />
                    </>
                )}

                {fieldOptionsStore.isClearButtonVisible && (
                    <>
                        <Button content=" Очистить всё"
                            onClick={() => {
                                arr.map((row, indexRow) => (
                                    row.map((number, indexColumn) => (
                                        pointSpase(indexRow, indexColumn)
                                    ))
                                ))
                                fieldOptionsStore.ClearAll();
                                fieldStore.handleClearField(userStore.currentUser!.login);
                            }}
                        />
                    </>
                )}
            </Segment>
        </>
    )
})