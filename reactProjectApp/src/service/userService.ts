import $api from '../http';
import { AxiosResponse } from 'axios';
import { TUser } from '../models/TUser';
import { TFormUser } from '../models/TFormUser';

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<TUser[]>> {
        return $api.get<TUser[]>('/users');
    }

    static putUser(newUserData: TFormUser): Promise<AxiosResponse> {
        return $api.put('/users', newUserData);
    }
}
