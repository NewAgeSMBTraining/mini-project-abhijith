import React from 'react';
import { FaSearch } from "react-icons/fa"

function TableFilter({ filter, setFilter }) {
    return (
        <div>
            <span><FaSearch /></span>
            <input className="search-input" type="text" placeholder="search here....." value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
        </div>
    )
}

export default TableFilter;
