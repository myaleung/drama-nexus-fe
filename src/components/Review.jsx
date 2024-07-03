import { useLocation, Link } from "react-router-dom";
import { ratingColour } from "../utils/ratingColour";
import { posterImageUrl } from "../utils/collectDramaImage.js";

const Review = ({ review }) => {
	const location = useLocation();
	const dramaPathRegex = /^\/drama\/[^\/]+$/;
	const memberProfilePathRegex = /^\/members\/[^\/]+$/;
	const isDramaPage = dramaPathRegex.test(location.pathname);
	const isProfilePage = memberProfilePathRegex.test(location.pathname);
	const reviewDate = new Date(review.createdAt).toLocaleDateString("en-UK", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<>
			<div className="grid grid-cols-12 col-span-12 gap-2 md:gap-3 py-7.5 first-of-type:pt-0">
				<div className="col-span-2 md:col-span-3 self-start">
					{isProfilePage && (
						<>
							<Link to={`/drama/${review.drama._id}`}>
								<img
									src={posterImageUrl().concat(review.drama.poster)}
									className="h-auto w-full bg-grey-100"
									alt={review.drama.title}
								/>
							</Link>
							<p className="text-semibold text-sm lg:text-base mt-1">{review.drama.title}</p>
						</>
					)}
					{isDramaPage && (
						<>
							<Link to={`/members/${review.author.user._id}`} className="no-underline">
								<img
									src={review.author.profilePicture}
									className="h-auto w-24 bg-grey-100"
									alt="Drama Image"
								/>
								<p className="text-semibold text-sm lg:text-lg">
									{review.author.user.name.firstName +
										" " +
										review.author.user.name.lastName}
								</p>
							</Link>
						</>
					)}
				</div>
				<div className="col-span-8">
					<p className="text-semibold text-sm">{reviewDate}</p>
					<div className="flex items-center">
						<h6 className="subtitle mr-5">{review.title}</h6>
						<p className={`font-semibold ${ratingColour(review.stars)}`}>
							{review.stars}
						</p>
					</div>
					<p className="mt-2.5">{review.description}</p>
				</div>
			</div>
		</>
	);
};
export default Review;
