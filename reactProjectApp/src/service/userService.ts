import $api from '../http';
import { AxiosResponse } from 'axios';
import { TUser } from '../models/TUser';

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<TUser[]>> {
        return $api.get<TUser[]>('/users');
    }
}
