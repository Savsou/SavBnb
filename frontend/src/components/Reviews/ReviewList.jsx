import { useSelector } from 'react-redux'
import './ReviewList.css'

const ReviewList = ({ reviews }) => {
    const sessionUser = useSelector((state) => state.session.user)
    const spot = useSelector((state) => state.spots.spot)

    // console.log("Session User", sessionUser);
    // console.log("current spot", spot)

    const userReview = reviews.find(review => review.userId === sessionUser?.id);
    const postReview = sessionUser && sessionUser.id !== spot.Owner.id && !userReview;

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
            {postReview && (
                <button className="post-review-button">Post Your Review</button>
            )}

            {reviews.length === 0 ? (
                <p>Be the first to post a review!</p>
            ) : (
                formatDate.map((review, idx) => (
                    <div key={idx} className="review">
                        <p className="review-user-name">{review.User.firstName}</p>
                        <p className="post-date">{review.formatDate}</p>
                        <p className="review-comment">{review.review}</p>
                    </div>
                ))
            )}
        </div>

    );
};

export default ReviewList;
