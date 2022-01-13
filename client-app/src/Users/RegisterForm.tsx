import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import MyTextInput from "../commonFiles/MyTextInput";
import * as Yup from 'yup';
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer( function RegisterForm() {

    const {userStore} = useStore();

    return(
        <Formik 
            initialValues={{email: '', password: '', login: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
                setErrors({error: 'Неправильный логин и/или пароль'}))}

            validationSchema={Yup.object({
                login: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}    
        >
            {({handleSubmit, errors, isValid, dirty}) => (
                <Segment textAlign='center'>
                   <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                   <Header as='h2' content='Регистрация' color='grey' textAlign='center'/>
                   <MyTextInput name='login' placeholder='Логин' />
                   <MyTextInput name='email' placeholder='Почта' />
                   <MyTextInput name='password' placeholder='Пароль' type='password' />
                   <ErrorMessage
                            name='error' 
                            render={() =>
                                    <div> 
                                        <Label basic color='red' content={errors.error}/> 
                                    </div>
                             }
                        />
                   <Button disabled={!isValid || !dirty} style={{ margin:'10px'}} color="grey" content='Зарегистрироваться' type='submit' size='medium' />
                </Form>
                </Segment>
            )}
        </Formik>
    )
})