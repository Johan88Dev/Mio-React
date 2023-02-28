import React, { Component } from 'react';

class SearchBar extends Component {
    
    render() { 
        return (

            <div id="searchField">
            <form>
                <input type="text" id="search" name="search" placeholder='Sök Produkt' onChange={(e) => this.props.onChange(e.target.value)}/>
            </form>
          </div>

        );
    }
}

export default SearchBar ;