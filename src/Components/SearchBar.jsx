import React from 'react'

//style sheets
import '../Css/Component.style/SearchBar.css'

//react icons
import { LuSearch } from 'react-icons/lu';
import { RxCross1 } from 'react-icons/rx';

const SearchBar = ({ setSearchInput, searchInput }) => {
  return (
    <div className="search_container_inbox">
      <div className='search_bar_container_inbox'>
        <div className="search_icons_wrapper_inbox" id='pointer'>
          {searchInput ? <RxCross1 size={20} onClick={() => setSearchInput('')} /> : <LuSearch size={20} />}
        </div>
        <input className='search_input' placeholder="Search task title..." type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      </div>
    </div>
  )
}

export default SearchBar