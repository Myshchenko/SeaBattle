import { Button, Grid, Image } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function Errors() {

    const { userStore, signalRStore } = useStore();

    return (
        <>
            <Grid centered>
                <Grid.Row >
                    <Image src='/Error.png' />
                </Grid.Row >
                <Grid.Row >
                    <Button color='grey' onClick={() => {
                        userStore.logout();
                        signalRStore.closeConnection();
                    }}>Выход</Button>
                </Grid.Row >
            </Grid>

        </>
    )
}
