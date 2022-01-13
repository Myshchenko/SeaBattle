import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Button } from 'semantic-ui-react';

export default observer(function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='homepage'>
            <Container text>
                <Header as='h1' inverted content="Добро пожаловать в Морской бой!" />
                <Button as={Link} to='/login' size='huge' inverted>
                    Вход
                </Button>
                <Button as={Link} to='/register' size='huge' inverted>
                    Регистрация
                </Button>
            </Container>
        </Segment>
    )
})