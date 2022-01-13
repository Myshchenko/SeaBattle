import { Link } from "react-router-dom";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function Winner() {

    const { userStore, signalRStore, gameStore } = useStore();

    return (
        <>
            <Grid centered>
                <Grid.Row >
                    <Header as='h1'>Конец игры! Победил игрок <Header as='h1' color='blue'>{gameStore.winner}</Header></Header>
                </Grid.Row >

                <Grid.Row >
                    <Image src='/EndOfGame.png' />
                </Grid.Row >

                <Grid.Row >
                    <Header as='h3'> Вернуться на главное меню </Header>
                </Grid.Row >

                <Grid.Row >
                    <Button as={Link} to={'/findOpponent'} onClick={() => { userStore.currentUser!.winner = false; signalRStore.invitationAccepted!.isAccepted = false; }}>
                        Вернуться
                    </Button>
                </Grid.Row >
            </Grid>
        </>
    )
}