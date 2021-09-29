import React from 'react';

export default function PokemonList({ pokemon }) {
    return (
        <div class='center'>
            {pokemon.map(p => (
                <div key={p}>{p}</div>
            ))}
        </div>
    );
}
