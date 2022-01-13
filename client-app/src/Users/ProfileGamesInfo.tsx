import { observer } from "mobx-react-lite";
import React from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { ProfileGames } from "./Models/profileGames";

interface Props {
    profileGame: ProfileGames;
}

export default observer(function ProfileGamesInfo({ profileGame }: Props) {
    return (
        <>
            <Segment clearing color='grey'>
                <Item>

                    <Item.Content verticalAlign='middle'>
                        <Header as='h3' content={profileGame.gameDate} />
                    </Item.Content>

                    <Item.Content verticalAlign='middle'>
                        <strong>Противник:</strong>   {profileGame.opponentName}
                    </Item.Content>

                    <Item.Content verticalAlign='middle'>
                        <strong>Результат:</strong>    {profileGame.result}
                    </Item.Content>

                    <Item.Content verticalAlign='middle'>
                        <strong>Количество моих ходов:</strong>  {profileGame.currentCustomerMoves}
                    </Item.Content>

                    <Item.Content verticalAlign='middle'>
                        <strong>Количество ходов противника:</strong>    {profileGame.opponentMoves}
                    </Item.Content>

                </Item>
            </Segment>
        </>
    )
})