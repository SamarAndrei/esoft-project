import React from 'react';
import Spinner from './Spinner';
import $api from '../http';
import { TProduct } from '../models/TProduct';

interface ProductionGridResponse {
    production: TProduct[];
    totalPages: number;
}

function isProductionGridResponse(item: ProductionGridResponse | any) {
    if ('production' in item) {
        return true;
    }
    return false;
}

const withDataFetching = (url: string) => (WrappedComponent: React.FC) => {
    return function WithDataFetching({
        page,
        genderQuery,
        typeQuery,
        setTotalPage,
        qQuery,
        ...props
    }: {
        page?: number;
        setTotalPage?: any;
        qQuery?: string;
        genderQuery?: string;
        typeQuery?: string;
    }) {
        const [data, setData] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            fetchData()
                .then(result => {
                    if (!isProductionGridResponse(result)) {
                        setData(result);
                        console.log(result);
                    } else {
                        setData(result.production);
                    }
                    setLoading(false);
                    setTotalPage(result.totalPages);
                    console.log(result);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }, [page, qQuery, setTotalPage, genderQuery, typeQuery]);

        const fetchData = async () => {
            let result = undefined;
            let queryParams = '';

            if (page) {
                const offset = (page - 1) * 3;
                const limit = 3;
                queryParams = `?offset=${offset}&limit=${limit}`;
            }

            if (qQuery) {
                queryParams += `&q=${qQuery}`;
            }

            if (genderQuery) {
                queryParams += `&gender=${genderQuery}`;
            }

            if (typeQuery) {
                queryParams += `&type=${typeQuery}`;
            }

            await $api
                .get(`${url}${queryParams}`)
                .then(function (response) {
                    result = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });

            return result;
        };

        return (
            <div>
                {loading ? (
                    <Spinner />
                ) : (
                    <WrappedComponent data={data} {...(props as any)} />
                )}
            </div>
        );
    };
};

export default withDataFetching;
