import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import PostReviewModal from '../PostReviewModal';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import './ReviewList.css';

const ReviewList = ({ reviews }) => {
    const sessionUser = useSelector((state) => state.session.user)
    const spot = useSelector((state) => state.spots.spot)

    // console.log("Session User", sessionUser);
    // console.log("current spot", spot)
    // console.log("Reviews here", reviews)

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
                <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<PostReviewModal spotId={spot.id}/>}
                />
            )}

            {reviews.length === 0 ? (
                <p>Be the first to post a review!</p>
            ) : (
                formatDate.map((review, idx) => (
                    <div key={idx} className="review">
                        <p className="review-user-name">{review.User?.firstName}</p>
                        <p className="post-date">{review.formatDate}</p>
                        <p className="review-comment">{review.review}</p>
                        {sessionUser && review.userId === sessionUser.id && (
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spot.id} />}
                            />
                        )}

                    </div>
                ))
            )}
        </div>

    );
};

export default ReviewList;
