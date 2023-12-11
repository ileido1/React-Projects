import { SortBy } from "../types.d";

export const Options = ({ setColor , setSortCountry, sort , setReset, setFilterCountry}: { setFilterCountry:(country:string)=> void, setReset: () => void, setColor: () => void, setSortCountry : () =>void, sort: SortBy} ) => {
    return (
        <div>
            <button onClick={() => setColor()}>Change color</button>
            <button onClick={() => setSortCountry()}> {sort === SortBy.NONE ? 'Order by countries' : 'Order regular '}</button>
            <button onClick={() => setReset()}>Reset Users</button>
            <input type="text" placeholder="Search" onChange={(e) => {setFilterCountry(e.target.value)}} />
        </div>
    );
};
