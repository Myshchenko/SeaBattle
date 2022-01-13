import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import MyTextInput from "../commonFiles/MyTextInput";
import { useStore } from "../stores/store";

export default observer( function LoginForm() {

    const {userStore} = useStore();

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
                    setErrors({error: 'Неправильный логин и/или пароль'}))}
        >
            {({ handleSubmit, errors, isValid, dirty }) => (
                <Segment textAlign='center'>
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off' >
                        <Header as='h2' content='Вход в аккаунт' color='grey' />
                        <MyTextInput name='email' placeholder='Почта' />
                        <MyTextInput name='password' placeholder='Пароль' type='password' />
                        <ErrorMessage 
                            name='error' 
                            render={() =>
                                    <div> 
                                        <Label  basic color='red' content={errors.error}/> 
                                    </div>
                             }
                        />
                        <Button disabled={!isValid || !dirty} style={{ margin:'10px'}} color="grey" content='Вход' type='submit' size='medium'/>       
                    </Form>
                </Segment>
            )}
        </Formik>)
})

