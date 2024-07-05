import $api from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export default class CommentsService {
    static async sendComment(
        prod_id: number,
        comment: string,
        rating: number,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`/production/${prod_id}/comments`, {
            comment,
            rating,
        });
    }
}
