import $api from '../http';
import { AxiosResponse } from 'axios';

export default class CommentsService {
    static async sendComment(
        prod_id: number,
        comment: string,
        rating: number,
    ): Promise<AxiosResponse> {
        return $api.post(`/production/${prod_id}/comments`, {
            comment,
            rating,
        });
    }
}
