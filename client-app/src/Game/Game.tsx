import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Label } from "semantic-ui-react";
import { history } from "..";
import { useStore } from "../stores/store";
import { inviting } from "../Users/Models/inviting";
import CheckShips from "./CheckShips";
import CreateField from "./CreateField";
import EnemyField from "./EnemyField";
import GameLog from "./GameLog";
import Instructions from "./Instructions";

export default observer(function Game() {

    const { fieldOptionsStore, fieldStore, userStore, signalRStore } = useStore();

    useEffect(() => {

        if (!signalRStore.invitationAccepted?.isAccepted) {
            history.push('/findOpponent');
            fieldStore.handleDeleteField(userStore.currentUser!.login);
        }

        if(signalRStore.CURRENTUSEROPPONENT?.login === userStore.currentUser?.login){
            userStore.currentUserOpponent = signalRStore.CURRENTUSER;
        }

        if(signalRStore.readyUser?.login === userStore.currentUser?.login){
            userStore.currentUser!.isReadyToPlay = true;
        } 

        if(signalRStore.readyUser?.login === userStore.currentUserOpponent?.login) {
            userStore.currentUserOpponent!.isReadyToPlay = true;
        }

        if(userStore.currentUser?.isReadyToPlay === true && userStore.currentUserOpponent?.isReadyToPlay === true){
            runInAction(() => fieldOptionsStore.isEnemyFieldVisible = true);
        }

    }, [signalRStore.invitationAccepted, signalRStore.readyUser, fieldStore, userStore, signalRStore.CURRENTUSEROPPONENT?.login, fieldOptionsStore, signalRStore.CURRENTUSER ])

    const accepting = new inviting();

    return (
        <>
            <Grid columns={2} centered>
                <Grid.Row >
                    <Grid.Column width='7' textAlign="center">
                        {fieldOptionsStore.isCheckBoxVisible && (
                            <CheckShips />
                        )}
                        <CreateField />
                    </Grid.Column>

                    <Grid.Column width='7' textAlign="center">
                        {fieldOptionsStore.isEnemyFieldVisible && (
                            <EnemyField />
                        )}
                    </Grid.Column>
                </Grid.Row>

                {!fieldOptionsStore.isEnemyFieldVisible && (
                    <Grid.Row>
                        <Label color='grey' basic>
                            <Icon loading name='spinner' />
                            Ожидание противника
                        </Label>
                    </Grid.Row>
                )}

                <Grid.Row >
                    {fieldOptionsStore.isButtonStartVisible && (
                        <Button
                            color='grey'
                            content='Старт'
                            //disabled={fieldOptionsStore.ALL_POINTS === 20 ? false : true} потом вернуть
                            onClick={() => {
                                signalRStore.startingGame(userStore.currentUser);
                                fieldOptionsStore.HideEditingWindows();
                            }}
                        />
                    )}

                    <Button color='grey'
                        content='Выход'
                        as={Link}
                        to='/findOpponent'
                        onClick={() => {
                            fieldStore.handleDeleteField(userStore.currentUser!.login);
                            runInAction(() => {
                                fieldOptionsStore.isGameStarted = false;
                                fieldOptionsStore.isEnemyFieldVisible = false;
                            });
                            accepting.isAccepted = false;
                            signalRStore.receiveInv(accepting);
                            fieldOptionsStore.ClearAll();
                            signalRStore.ClearAll();
                            fieldOptionsStore.resetVisibless();
                            userStore.currentUser!.isReadyToPlay = false;
                        }} />
                </Grid.Row>
            </Grid>

            {fieldOptionsStore.isEnemyFieldVisible && (
                <GameLog />
            )}

            <Instructions />
        </>
    )
})