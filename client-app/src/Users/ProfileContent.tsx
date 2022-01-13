import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Header, Icon, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { ProfileGames } from "./Models/profileGames";
import ProfileGamesInfo from "./ProfileGamesInfo";


export default observer(function ProfileContent() {

    const { profileStore, userStore } = useStore();

    useEffect(() => {
        profileStore.getProfileInfo(userStore.currentUser!.login);
        if (profileStore.profileGames.length <= 1) {
            profileStore.getProfileGameInfo(userStore.currentUser!.login);
        }

    }, [profileStore, userStore])

    return (
        <>
            <Segment>
                <Item>
                    <Item.Content verticalAlign='middle'>
                        <Header as='h2' content={"Мои успехи:"} />
                    </Item.Content>
                    <Item.Content verticalAlign='middle'>

                        <Label basic size="big">
                            <Icon name='gamepad' size="big" />
                            Всего партий: {profileStore.profile?.allMyGames}
                        </Label>

                        <Label basic size="big">
                            <Icon name='winner' size="big" />
                            Победы:  {profileStore.profile?.countOfMyWins}
                        </Label>

                    </Item.Content>
                </Item>
            </Segment>
            <Segment>
                <Item>
                    <Item.Content verticalAlign='middle'>
                        <Header as='h2' content={"Мои игры:"} />
                    </Item.Content>
                    <Item.Content verticalAlign='middle'>
                        {profileStore.profileGames.map((game: ProfileGames) => (
                            <ProfileGamesInfo key={game.gameDate} profileGame={game} />
                        ))}
                    </Item.Content>
                </Item>
            </Segment>
        </>

    )
})