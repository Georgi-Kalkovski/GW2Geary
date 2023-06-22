function Pagination({ filtered, itemsPerPage, totalPages, page, setPage }) {

    if (filtered.length < itemsPerPage) {
        return null;
    }

    const renderPageNumbers = [];
    const totalPagesToShow = 4;

    let startPage, endPage;
    if (totalPages <= totalPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const middlePage = Math.floor(totalPagesToShow / 2);
        let leftOffset = Math.min(middlePage, Math.floor(totalPagesToShow / 2) - 1);
        let rightOffset = Math.min(middlePage, totalPages - totalPagesToShow + 1) - 1;

        if (page <= middlePage) {
            startPage = 1;
            endPage = totalPagesToShow;
        } else if (page >= totalPages - middlePage) {
            startPage = totalPages - totalPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = page - leftOffset;
            endPage = page + rightOffset;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        renderPageNumbers.push(
            <button
                key={i}
                className={i === page ? 'pagination-item active' : 'pagination-item'}
                onClick={() => setPage(i)}
                disabled={i === page}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="pagination-container">
            <button
                className="pagination-item"
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
            >
                &lt;
            </button>
            {startPage > 1 && (
                <>
                    <button
                        className="pagination-item"
                        onClick={() => setPage(1)}
                    >
                        1
                    </button>
                    {startPage > 2 && (
                        <span className="pagination-ellipsis">...</span>
                    )}
                </>
            )}
            {renderPageNumbers}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && (
                        <span className="pagination-ellipsis">...</span>
                    )}
                    <button
                        className="pagination-item"
                        onClick={() => setPage(totalPages)}
                    >
                        {totalPages}
                    </button>
                </>
            )}
            <button
                className="pagination-item"
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;