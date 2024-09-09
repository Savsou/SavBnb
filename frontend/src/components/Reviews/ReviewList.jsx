import './ReviewList.css'

const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return <p>No Reviews</p>
    }

    const formatDate = reviews.map((review) => {
        const date = new Date(review.createdAt);
        const month = date.toLocaleString('default', {month: 'long'});
        const year = date.getFullYear();

        return {
            ...review,
            formatDate: `${month} ${year}`
        }
    })

    return (
        <div className="review-list">
            {formatDate.map((review, idx) => (
                <div key={idx} className="review">
                    <p className="review-user-name">{review.User.firstName}</p>
                    <p className="post-date">{review.formatDate}</p>
                    <p className='review-comment'>{review.review}</p>
                </div>
            ))}
        </div>
    )
}

export default ReviewList;
