import {Link, useNavigate} from 'react-router-dom';
import Review from './Review';

const Reviews = ({ dramaReviews, dramaId, dramaTitle, dramaPoster, userId }) => {
	const navigate = useNavigate();
	const handleReview = async () => {
		if (!userId) {
			navigate("/login");
			return;
		}
		navigate(`/drama/${dramaId}/add-review`);
		return;
	};

	return (
		<div className="col-span-12 border-t border-grey-300 pt-7.5">
			<div className="flex justify-between">
				<h3 className="mt-0 pt-0">Reviews</h3>
				<button
					onClick={handleReview}
					className={`button`}
				>
					Add Review
				</button>
			</div>
			{dramaReviews.length > 0 ? (
				dramaReviews.map((review, index) => (
					<div key={index} className="col-span-6">
						<Review review={review} />
					</div>
				))
			) : (
				<div className="col-span-12 text-center mt-2.5">
					<p>No reviews.</p>
				</div>
			)}
		</div>
	);
};
export default Reviews