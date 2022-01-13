import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid, Item, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { inviting } from "../Users/Models/inviting";
import { User } from "../Users/Models/user";
import Inviting from "./Inviting";
import Opponent from "./Opponent";
import SendedInvitations from "./SendedInvitations";
import { history } from "..";
import { field } from "./Models/field";
import { runInAction } from "mobx";

export default observer(function FindOpponent() {

    const { userStore, signalRStore, fieldStore, fieldOptionsStore } = useStore();

    useEffect(() => {

        if (userStore.currentUser?.login === null) {
            history.push('/login');
        }        

        if (userStore.users.length <= 1) {
            userStore.loadUsers(userStore.currentUser!.login);
            signalRStore.createHubConnection();
        }
        const UserField = new field(10, 10, userStore.currentUser!.login);

        if (signalRStore.invitationAccepted?.isAccepted &&
            (signalRStore.invitationAccepted?.sender?.login === userStore.currentUser!.login ||
                signalRStore.invitationAccepted?.recipient?.login === userStore.currentUser!.login)
        ) {
            history.push('/game');
            fieldStore.handleAddField(UserField);
            runInAction(() => { fieldOptionsStore.isGameStarted = true;});
           
        }

    }, [userStore, fieldStore, signalRStore.invitationAccepted, signalRStore])

    return (
        <>
            <Grid>
                <Grid.Column width={11}>
                    {userStore.users.map((user: User) => (
                        <Opponent key={user.login} user={user} currentUser={userStore.currentUser} />
                    ))}
                </Grid.Column>

                <Grid.Column width={5}>
                    <Segment clearing color='grey' size={"big"}>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Item.Header>
                                        Приглашения:
                                    </Item.Header >
                                    <Item.Description>
                                        {signalRStore.invitingsArray.map((inv: inviting, index: any) => (
                                            inv.recipient!.login === userStore.currentUser!.login
                                                ? <Inviting key={index} sender={inv.sender} currentUser={userStore.currentUser} index={index}  />
                                                : <></>
                                        ))}
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>

                    <Segment clearing color='grey' size={"big"}>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Item.Header>
                                        Отправлено:
                                    </Item.Header >
                                    <Item.Description>
                                        {signalRStore.invitingsArray.map((inv: inviting, index: any) => (
                                            inv.sender?.login === userStore.currentUser!.login
                                                ? <SendedInvitations key={index} nameRecipient={inv.recipient!.login} />
                                                : <></>
                                        ))}

                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Grid.Column>
            </Grid>
        </>
    )
})