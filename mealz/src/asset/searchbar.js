import { ReactComponent as SearchIcon } from './icon/icon-search.svg';

function SearchBar() {
    return(
        <div class="search-bar-container">
            <div class="search-bar">
                <input type="text" placeholder='식품 및 가게 검색'></input>
                <SearchIcon className="icon-medium" />
            </div>
        </div>
    )
}

export default SearchBar;