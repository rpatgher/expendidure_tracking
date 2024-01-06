import { useState, useEffect } from "react";

const Filter = ({filter, setFilter}) => {
    return (
        <div className="filtros sombra contenedor">
            <form
            
            >
                <div className="campo">
                    <label htmlFor="filter">Filter Expeditures: </label>
                    <select 
                        name="category" 
                        id="filter"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value="">-- All --</option>
                        <option value="saving">Saving</option>
                        <option value="food">Food</option>
                        <option value="housing">Housing</option>
                        <option value="general">General</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                        <option value="bills">Bills</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default Filter;
