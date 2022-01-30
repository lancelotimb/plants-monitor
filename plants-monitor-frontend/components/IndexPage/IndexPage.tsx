import * as React from 'react';
import { useHumidityMeasurements } from 'lib/api/humidity-measurements';

export const IndexPage: React.FunctionComponent = () => {
    const { data, isLoading, isError } = useHumidityMeasurements();

    if (isError) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    return <div>{JSON.stringify(data)}</div>;
};
