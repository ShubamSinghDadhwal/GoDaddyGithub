import { useEffect, useState } from 'react'
import { MdOutlineSearch } from "react-icons/md";
import './styles.css'

const Search = ({ callback, placeholder, searchString = '' }) => {
    const [searchValue, setSearchValue] = useState(searchString);

    useEffect(() => {
        setSearchValue(searchString);
    }, [searchString]);

    return (
        <section className="customSearchContainer">
            <div className="searchBlock">
                <div className="searchField">
                    <div className="addOn">
                        <MdOutlineSearch size={20} />
                    </div>
                    <input
                        type="text"
                        className="inputField"
                        value={searchValue}
                        onChange={(e) => {
                            const userQuery = e.target.value;
                            setSearchValue(userQuery);
                            callback(userQuery);
                        }}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </section>
    );
};

export { Search };