import React, { useState, useEffect, Fragment } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [currentPageUrl, setCurrentPageUrl] = useState(
        'https://pokeapi.co/api/v2/pokemon'
    );

    useEffect(() => {
        setLoading(true);

        let cancel;

        axios
            .get(currentPageUrl, {
                cancelToken: new axios.CancelToken(c => (cancel = c)),
            })
            .then(res => {
                setNextPageUrl(res.data.next);
                setPrevPageUrl(res.data.previous);
                setPokemon(res.data.results.map(p => p.name));
                setLoading(false);
            });

        return () => cancel();
    }, [currentPageUrl]);

    function goToNextPage() {
        setCurrentPageUrl(nextPageUrl);
    }

    function goToPreviousPage() {
        setCurrentPageUrl(prevPageUrl);
    }

    if (loading) return 'Loading page...';

    return (
        <Fragment>
            <PokemonList pokemon={pokemon} />
            <Pagination
                goToNextPage={nextPageUrl ? goToNextPage : null}
                goToPreviousPage={prevPageUrl ? goToPreviousPage : null}
            />
        </Fragment>
    );
}

export default App;
