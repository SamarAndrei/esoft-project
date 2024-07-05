import React from 'react';
import Spinner from './Spinner';
import $api from '../http';

const withDataFetching = (url: string) => (WrappedComponent: React.FC) => {
    return function WithDataFetching({ page, ...props }: { page?: number }) {
        const [data, setData] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        if (page) {
            page -= 1;
        }

        React.useEffect(() => {
            fetchData()
                .then(result => {
                    setData(result);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }, [page]);

        const fetchData = async () => {
            let result = undefined;
            if (page) {
                const offset = page * 3;
                const limit = 3;
                await $api
                    .get(`${url}?offset=${offset}&limit=${limit}`)
                    .then(function (response) {
                        result = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                return result;
            } else {
                await $api
                    .get(url)
                    .then(function (response) {
                        result = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                return result;
            }
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
