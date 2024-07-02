import $api from '../http';
import { AxiosResponse } from 'axios';
import { TCartItem } from '../models/TCartItem';

export default class CartService {
    static fetchCart(): Promise<AxiosResponse<TCartItem[]>> {
        return $api.get<TCartItem[]>('/cart');
    }

    static async addToCart(prod_id: string): Promise<AxiosResponse> {
        return $api.post(`/production/${prod_id}/cart`);
    }

    static deleteCartItem(prod_id: string): Promise<AxiosResponse> {
        return $api.delete(`/production/${prod_id}/cart`);
    }
}
