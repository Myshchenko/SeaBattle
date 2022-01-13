import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Icon, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {

    const { userStore, fieldOptionsStore, signalRStore } = useStore();

    return (
        <Menu inverted fixed='top'>
            {userStore.currentUser !== null ? (
                    signalRStore.invitationAccepted?.isAccepted === false || fieldOptionsStore.isGameStarted === false ? (
                    <>
                        <Container>
                            <Menu.Item header as={Link} to="/findOpponent">
                                <Icon name='game' />
                                Игра!
                            </Menu.Item>
                            <Menu.Item position="right" as={Link} to={"/userProfile"}>
                                <Icon name='user circle' size="large" />
                                Мой профиль
                            </Menu.Item>
                            <Menu.Item position="right"
                                onClick={() => {
                                    userStore.logout();
                                    signalRStore.closeConnection();
                                }}>
                                <Icon name='log out' />
                                Выход
                            </Menu.Item>
                        </Container>
                    </>) : (
                    <> </>
                )
            ) : (
                <Container>
                    <Menu.Item header as={Link} to="/" >
                        <Icon name='home' size='large' />
                    </Menu.Item>
                </Container>
            )}
        </Menu >
    )
})