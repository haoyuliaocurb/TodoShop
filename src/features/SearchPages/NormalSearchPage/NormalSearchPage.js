const Trial = () => {
    return (
        <StyledEasySearchPage>
            <div className="SearchItem">
                <h2 className="SearchItemTitle"></h2> {/* Normal 隱藏*/}
                <div className="FeatureBar">
                    <FeatureTag />
                    <FeatureTag />
                </div>
                <div className="SearchCards">
                    <div className="SearchCard">
                    </div>
                </div>
            </div>
            <SearchItem />
        </StyledEasySearchPage>
    )
}

const SearchPages = () => {
    return (
        <StyledSearchPages>
            <SearchNavBar />
            <FilterBar /> {/* Normal 顯示*/}
            <EasySearchPage />
        </StyledSearchPages>
        {/* TabBar 可以在往上滑的時候滑進，向下滑時滑出 */}
    )
}