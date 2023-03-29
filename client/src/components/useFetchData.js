import { useEffect } from 'react';
import axios from 'axios';

function useFetchData(url, stateSetter) {
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(url);
                stateSetter(response.data);
            } catch (error) {
                //console.error(error);
            }
        }
        fetchData();
    }, [url, stateSetter]);
};

export { useFetchData };