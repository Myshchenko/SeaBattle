import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { point } from "./Models/point";
import { history } from "..";
import { UserAfterGame } from "../Users/Models/userAfterGame";

export default observer(function EnemyField() {

    const { fieldOptionsStore, userStore, signalRStore, gameStore } = useStore();

    useEffect(() => {
        gameStore.winner = signalRStore.whoseturnToFire;

        if (signalRStore.whoseturnToFire === userStore.currentUser!.login) {
            runInAction(() => { gameStore.isMyTurn = true; })
        } else {
            runInAction(() => { gameStore.isMyTurn = false; })
        }

    }, [signalRStore.whoseturnToFire, gameStore.isMyTurn, userStore.currentUser!.login])

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
            fieldOptionsStore.firedCount = fieldOptionsStore.firedCount + 1;
        })
    }

    function endGame() {
        userStore.currentUser!.winner = false;
        gameResult.isWinner = true;
        gameResult.countOfMoves = signalRStore.ALLPOINTS;
        gameStore.updateGame(gameResult);
        history.push('/winner');
    }

    const clickedPoint = new point();
    const gameResult = new UserAfterGame();
    gameResult.login = userStore.currentUser!.login;

    return (
        <>
            {!userStore.currentUser!.winner ? (
                <Segment>
                    <h2 >Поле игрока {userStore.currentUserOpponent?.login}</h2>
                    {arr.map((row, indexRow) => (
                        <div className="field-row" key={indexRow}>
                            {row.map((number, indexColumn) => (
                                <button
                                    className={'enemySquare'}
                                    key={indexColumn}
                                    disabled={!gameStore.isMyTurn}
                                    onClick={
                                        () => {
                                            pointX(indexRow, indexColumn)
                                            clickedPoint.setPoint(indexRow, indexColumn, userStore.currentUserOpponent!.login, userStore.currentUser!.login);
                                            signalRStore.firePoint(clickedPoint);
                                            signalRStore.changingTurn(userStore.currentUserOpponent!.login);
                                        }
                                    }
                                >
                                    {arr[indexRow][indexColumn]}
                                </button>
                            ))}
                            {signalRStore.SUCCESSFULPOINTS === fieldOptionsStore.ALL_POINTS ? (userStore.currentUser!.winner = true) : (<></>)}
                        </div>
                    ))}
                </Segment>
            ) : (
                <>
                    {endGame()}
                </>
            )}
        </>
    )
})