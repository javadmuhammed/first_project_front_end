import React, { Fragment, useEffect, useState } from 'react';

function PaginationComponent({ currentPage, pagePerPost, children, pageState, totalOrders }) {

    const [pageTransform, setPageTransform] = useState([]);
    let [totalPageShow, setTotalPageShow] = useState(5);

    useEffect(() => {
        let pageCount = []
        let totalPages = Math.ceil(totalOrders / pagePerPost);
        for (let index = 1; index <= totalPages; index++) {
            pageCount.push(index)
        }



        let sliceFrom = (((currentPage - 1) + totalPageShow) <= totalPages) ? currentPage - 1 : totalPages - totalPageShow
        let sliceTo = (currentPage - 1) + totalPageShow;

        pageCount = pageCount.slice(sliceFrom - 1, sliceTo);


        setPageTransform(pageCount)
    }, [children]);


    function pagination(pageNumber) {
        if (pageNumber === 'PREV' && currentPage > 1) {
            pageState(currentPage - 1)
        } else if (pageNumber === 'NEXT' && currentPage < totalOrders) {
            pageState(currentPage + 1)
        } else if (typeof pageNumber === 'number') {
            pageState(pageNumber)
        }
    }

    return (
        <>
            {
                children
            }

            <div class="col-lg-12 col-md-12 ">
                <div className='mt-2'>
                    Page of  {currentPage} out of {Math.ceil(totalOrders / pagePerPost)}
                </div>

                

                <div className="pageTransaform">
                    {
                        currentPage <= 1 ? null : <button onClick={() => pagination('PREV')}>&#60; PREV</button>
                    }

                    {pageTransform.map((pt) => (
                        <button key={pt} onClick={() => pagination(pt)}>{pt}</button>
                    ))}
                    {
                        (currentPage + totalPageShow) <= (totalOrders / pagePerPost) ? <Fragment><button onClick={() => { }}>...</button><button onClick={() => pagination(currentPage + totalPageShow)}>{currentPage + totalPageShow}</button></Fragment> : null
                    }
                    {
                        currentPage >= (Math.floor(totalOrders / pagePerPost)) ? null : <button onClick={() => pagination('NEXT')}>NEXT &#62;</button>
                    }

                </div>
            </div>
        </>
    );
}

export default PaginationComponent;
