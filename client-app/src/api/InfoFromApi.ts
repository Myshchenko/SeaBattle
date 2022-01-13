import axios, { AxiosError, AxiosResponse } from "axios";
import { field } from "../Game/Models/field";
import { point } from "../Game/Models/point";
import { Profile } from "../Users/Models/profile";
import { User, UserFormValues } from "../Users/Models/user";
import { history } from "..";
import { ProfileGames } from "../Users/Models/profileGames";
import { inviting } from "../Users/Models/inviting";
import { game } from "../Game/Models/game";
import { UserAfterGame } from "../Users/Models/userAfterGame";

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    return response;
}, (error: AxiosError) => {
    const { status } = error.response!;
    console.log(error.response);
    switch (status) {
        case 500:
            history.push('/errors');
            break;
    }
    return Promise.reject(error);
})

const responseBody = (response: AxiosResponse) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Account = {
    current: () => request.get<User>('/account'),
    login: (user: UserFormValues) => request.post<User>('/account/login', user),
    register: (user: UserFormValues) => request.post<User>('/account/register', user)
}

const Profiles = {
    list: (currentLogin: string) => request.get<User[]>(`/findOpponent/${currentLogin}`),
    getCurrent: (login: string) => request.get<Profile>(`/profile/${login}`),
    getGameInfo: (loginUser: string) => request.get<ProfileGames[]>(`/profile/${loginUser}/info`)
}

const Field = {
    setCoordinates: (point: point[]) => request.post<point[]>('/field/setCoordinates', point),
    createField: (field: field) => request.post<field>('/field/createField', field),
    deleteField: (userLogin: string) => request.delete<void>(`/field/${userLogin}`),
    clearField: (userLogin: string) => request.delete<void>(`/field/${userLogin}/clear`)
}

const Invitings = {
    sendInviting: (inviting: inviting) => request.post<inviting>('/inviting/sendInviting', inviting),
    getIntitings: (userLogin: string) => request.get<inviting[]>(`/inviting/${userLogin}`),
    deleteInvitation: (invitingNumber: number) => request.delete<void>(`/inviting/${invitingNumber}`),
}

const Game = {
    createGame: (game: game) => request.post<game>('/game/createGame', game),
    endGame: (user: UserAfterGame) => request.post<UserAfterGame>('/game/updateGame', user) 
}

const agent = {
    Account,
    Profiles,
    Field,
    Invitings,
    Game
}

export default agent;