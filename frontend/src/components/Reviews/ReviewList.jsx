import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviewsSpotById } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import PostReviewModal from '../PostReviewModal';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import './ReviewList.css';

const ReviewList = ({ spotId }) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user)
    const spot = useSelector((state) => state.spots.spot)
    const spotReviews = useSelector((state) => state.reviews.spotReviews);

    // console.log("Session User", sessionUser);
    // console.log("current spot", spot)
    // console.log("Reviews here", reviews)

    useEffect(() => {
        dispatch(fetchReviewsSpotById(spotId));
    }, [dispatch, spotId]);

    const userReview = spotReviews.find(review => review.userId === sessionUser?.id);
    const postReview = sessionUser && sessionUser.id !== spot.Owner.id && !userReview;

    const formatDate = spotReviews.map((review) => {
        const date = new Date(review.createdAt);
        const month = date.toLocaleString('default', {month: 'long'});
        const year = date.getFullYear();

        return {
            ...review,
            formatDate: `${month} ${year}`
        }
    })

    const reverseReviews = [...formatDate].reverse();

    return (
        <div className="review-list">
            {postReview && (
                <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<PostReviewModal spotId={spot.id}/>}
                />
            )}

            {spotReviews.length === 0 ? (
                <p>Be the first to post a review!</p>
            ) : (
                reverseReviews.map((review, idx) => (
                    <div key={idx} className="review">
                        <p className="review-user-name">{review.User?.firstName}</p>
                        <p className="post-date">{review.formatDate}</p>
                        <p className="review-comment">{review.review}</p>
                        {sessionUser && review.userId === sessionUser.id && (
                            <div className='delete-modal-btn'>
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteReviewModal reviewId={review.id} />}
                                />
                            </div>
                        )}

                    </div>
                ))
            )}
        </div>

    );
};

export default ReviewList;
