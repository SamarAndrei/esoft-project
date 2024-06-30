import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
import React from 'react';
import axios from 'axios';

const withDataFetching = (url: string) => (WrappedComponent: React.FC) => {
    return function WithDataFetching(props: {}) {
        const [data, setData] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            // Simulate fetching data
            fetchData()
                .then(result => {
                    setData(result);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
            // Simulate loading for 2 seconds
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
                    <Grid
                        container
                        justifyContent="center"
                        mt={4}
                        sx={{ marginTop: 10 }}
                    >
                        <svg width={0} height={0}>
                            <defs>
                                <linearGradient
                                    id="my_gradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="0%"
                                    y2="100%"
                                >
                                    <stop offset="0%" stopColor="#e01cd5" />
                                    <stop offset="100%" stopColor="#1CB5E0" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <CircularProgress
                            sx={{
                                'svg circle': { stroke: 'url(#my_gradient)' },
                            }}
                        />
                    </Grid>
                ) : (
                    <WrappedComponent data={data} {...(props as any)} />
                )}
            </div>
        );
    };
};

export default withDataFetching;
