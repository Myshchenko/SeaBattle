import { observer } from "mobx-react-lite";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { User } from "../Users/Models/user";
import React from "react";
import { inviting } from "../Users/Models/inviting";

interface Props {
    user: User,
    currentUser: User | null,
}

export default observer(function Opponent({ user, currentUser }: Props) {

    const { signalRStore } = useStore();
    const Invitation = new inviting();

    return (
        <Segment.Group>
            <Segment clearing color='grey' size={"big"}>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header>
                                {user.login}
                            </Item.Header >
                            <Item.Description>
                                <Label basic color='grey' >
                                    <Icon name='winner' />
                                    Побед: {user.countOfWins}
                                </Label>
                                <Label basic color='grey' >
                                    <Icon name='gamepad' />
                                    Всего партий: {user.allGames}
                                </Label>
                            </Item.Description>
                            <Button
                                color='grey' basic
                                floated='right'
                                content='Пригласить'
                                onClick={() => {
                                    Invitation.sender = currentUser;
                                    Invitation.recipient = user;
                                    signalRStore.sendInv(Invitation);
                                }}
                            />
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
})