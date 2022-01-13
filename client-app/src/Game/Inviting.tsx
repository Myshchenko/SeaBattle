import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { inviting } from "../Users/Models/inviting";
import { User } from "../Users/Models/user";
import { field } from "./Models/field";
import { game } from "./Models/game";

interface Props {
    sender: User | null,
    currentUser: User | null;
    index: number
}

export default observer(function Inviting({ sender, currentUser, index}: Props) {

    const { fieldStore, signalRStore, userStore, gameStore } = useStore();
    const UserField = new field(10, 10, currentUser!.login);

    const currentGame = new game();
    currentGame.setGame(new Date(), currentUser!.login, sender!.login);


    const accepting = new inviting();

    return (
        <Segment.Group >
            <Segment size={"big"}>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Description>
                                {sender?.login}
                                <Button compact basic floated='right' content="Отменить" onClick={() => {
                                    runInAction(() => {
                                         signalRStore.invitingsArray.splice(index, 1);
                                    })
                                }} />

                                <Button compact basic floated='right' content="Принять"
                                    as={Link}
                                    to='/game'
                                    onClick={() => {
                                        
                                        fieldStore.handleAddField(UserField);
                                        
                                        runInAction(() => {userStore.currentUserOpponent = sender;});
                                        accepting.setInviting(true, sender, currentUser);
                                        signalRStore.receiveInv(accepting);
                                        gameStore.createGame(currentGame);
                                        signalRStore.whoseturnToFire = userStore.currentUser!.login;
                                    }} />
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
})