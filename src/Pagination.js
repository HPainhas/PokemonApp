import React from 'react';
import './App.css';

export default function Pagination({ goToNextPage, goToPreviousPage }) {
    return (
        <div class='center'>
            {goToPreviousPage && (
                <button onClick={goToPreviousPage}>Previous</button>
            )}
            {goToNextPage && <button onClick={goToNextPage}>Next</button>}
        </div>
    );
}
