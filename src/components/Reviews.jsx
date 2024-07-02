import {Link} from 'react-router-dom';
import Review from './Review';

const Reviews = ({ dramaReviews, dramaId, dramaTitle, dramaPoster }) => {
	return (
		<div className="col-span-12 border-t border-grey-300 pt-7.5">
			<div className="flex justify-between">
				<h3 className="mt-0 pt-0">Reviews</h3>
				<Link
					to={{
						pathname: `/drama/${dramaId}/add-review`,
						state: { dramaTitle: dramaTitle, dramaPoster: dramaPoster },
					}}
					className="button !mt-0"
				>
					Add Review
				</Link>
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