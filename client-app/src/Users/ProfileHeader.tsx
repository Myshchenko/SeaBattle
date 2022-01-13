import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid, Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function ProfileHeader() {

    const { profileStore, userStore } = useStore();

    useEffect(() => {
        profileStore.getProfileInfo(userStore.currentUser!.login)
    }, [profileStore.getProfileInfo, profileStore, userStore.currentUser])

    return (
        <>
            <Segment>
                <Grid>
                    <Grid.Column width={12}>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src={'/user.jpg'} />
                                <Item.Content verticalAlign='middle'>
                                    <Header as='h1' content={profileStore.profile?.login} />
                                </Item.Content>
                            </Item>  
                        </Item.Group>
                    </Grid.Column>
                </Grid>
            </Segment>
        </>

    )
})