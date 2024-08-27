import React from "react";
import Pagination from 'react-js-pagination';

const Pagination = ( { page, count, handleChangePage, postPerPage }) => {

    return (
        <div>
            <Pagination
            activePage={Number(page)}
            itemCountPerPage={postPerPage}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={handleChangePage}
            />
        </div>
    )
}