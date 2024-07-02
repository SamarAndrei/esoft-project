import React from 'react';
import axios from 'axios';
import Spinner from './Spinner';

const withDataFetching = (url: string) => (WrappedComponent: React.FC) => {
    return function WithDataFetching(props: {}) {
        const [data, setData] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);

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
        }, []);

        const fetchData = async () => {
            let result = undefined;
            await axios
                .get(url)
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
