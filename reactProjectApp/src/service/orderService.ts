import $api from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { CardType } from '../components/TCard';

export default class OrderService {
    static async createOrder(cart: CardType[]): Promise<AxiosResponse> {
        return $api.post<AuthResponse>(`/orders`, {
            status: 'Оплачено',
            data: cart,
        });
    }
}
