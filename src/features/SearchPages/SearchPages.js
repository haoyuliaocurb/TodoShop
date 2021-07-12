// script modules
import { 
    useState,
    useEffect,
} from 'react';
import {
    Link,
} from 'react-router-dom';

// styling modules
import styled from '@emotion/styled'
import { 
    styledVariables,
    styledCSS,
 } from '../../app/cssMaterial';
import "normalize.css"
import "../../app/general.css";

//
import EasySearchPage from './EasySearchPage/EasySearchPage.js';

const StyledSearchPages = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${styledVariables.color.white};

    > nav {
        position: absolute;
        top: calc( -${styledVariables.shared.barHeight} - 5px);
        width: 100%;
        height: ${styledVariables.shared.barHeight};
        background-color: ${styledVariables.color.gray100};
    }

`;

const SearchNavBar = () => {
    return (
        <nav></nav>
    )
}

const FilterBar = () => {
    return (
        <div></div>
    )
}

const SearchPages = () => {
    return (
        <StyledSearchPages>
            <SearchNavBar />
            {(false) ? <div></div> : <FilterBar />}
            <EasySearchPage />
        </StyledSearchPages>
    )
}

export default SearchPages