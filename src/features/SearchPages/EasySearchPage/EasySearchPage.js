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
 } from '../../../app/cssMaterial';
import "normalize.css"
import "../../../app/general.css";

//
import IconSearchPage from '../IconSearchPage.js';

const StyledFeatureTag = styled.span`
    flex-shrink: 0;

    display: inline-block;
    // border: black 1px solid;
    padding: 6px 14px;
    background-color: ${styledVariables.color.gray100};
    border-radius: 100px;

    > h3 {
        font-weight: 400;
        color: ${styledVariables.color.gray300};
    }
`;

const FeatureTag = () => {
    return (
        <StyledFeatureTag>
            <h3>抽取</h3>
        </StyledFeatureTag>
    )
}

const StyledFeatureTags = styled.div`
    display: flex;
    flex-wrap: nowrap;

    > :not(span:last-of-type) {
        margin-right: 10px;
    }
`;

const StyledFeatureBar = styled.div`
    width: 100%;
    height: 30px;
    overflow-x: scroll;
    margin-top: 6px;
`;

const FeatureBar = () => {
    return (
        <StyledFeatureBar>
            <StyledFeatureTags>
                {Array.from({length: 10}).map(() => (<FeatureTag />))}
            </StyledFeatureTags>
        </StyledFeatureBar>
    )
}

const StyledSearchCard = styled.div`
    position: relative;
    flex-shrink: 0;

    display: inline-block;
    width: 116px;
    height: 192px;
    padding: 12px 0 ${styledVariables.SearchCard.SelfPaddingBottom} 0;
    margin-right: 10px;
    // border: black solid 1px;

    > img {
        display: block;
        width: 110px;
        margin: 0 auto;
        height: 110px;
    }

    > p.SearchCardTitle {
        margin-top: 8px;
        padding: 0 2px;
        // border: black solid 1px;

        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal;            
    }

    > p.SearchCardPrice {
        position: absolute;
        bottom: ${styledVariables.SearchCard.SelfPaddingBottom};
        padding: 0 2px;

        color: ${styledVariables.color.pink400};
        font-weight: 700;

        > .priceTag {
            margin-right: 6px;
        }
    }

    > svg.IconBookmark {
        position: absolute;
        top: 4px;
        right: 10px;
    }

    > svg.IconAdd2CartUnselected {
        position: absolute;
        bottom: ${styledVariables.SearchCard.SelfPaddingBottom};
        right: 10px;
    }
`;

const SearchCard = () => {
    return (
        <StyledSearchCard>
            <IconSearchPage.Bookmark className="IconBookmark"/>
            <img />
            <p className="SearchCardTitle">商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名商品名</p>
            <p className="SearchCardPrice">
                <span className="priceTag">$</span>
                <span>119</span>
            </p>
            <IconSearchPage.Add2Cart_unselected className="IconAdd2CartUnselected"/>
        </StyledSearchCard>
    )
}

const StyledSearchCards = styled.div`
    display: flex;
    overflow-x: scroll;
`;

const StyledSearchItem = styled.div`
    position: relative;
    width: 100%;
    padding: 0 10px;
    padding-top: ${styledVariables.SearchItem.TitleHeight};
    margin-top: 6px;
    background-color: ${styledVariables.color.white};

    > .SearchItemTitle {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        height: ${styledVariables.SearchItem.TitleHeight};
        background-color: ${styledVariables.color.gray100};
        display: flex;
        justify-content: center;
        align-items: center;

        > h3 {
            color: ${styledVariables.color.gray300};
        }
    }
`;

const SearchItem = () => {
    return (
        <StyledSearchItem>
            <div className="SearchItemTitle">
                <h3>衛生紙</h3>
            </div>
            <FeatureBar />
            <StyledSearchCards>
                {Array.from({length: 10}).map(() => (<SearchCard />))}
            </StyledSearchCards>
        </StyledSearchItem>
    )
}

const StyledEasySearchPage = styled.div`
    overflow-y: scroll;

    > div:last-of-type {
        margin-bottom: 10px;
    }
`;

const EasySearchPage = () => {
    return (
        <StyledEasySearchPage>
            <SearchItem />    
            <SearchItem />
            <SearchItem />         
        </StyledEasySearchPage>
    )
}

export default EasySearchPage