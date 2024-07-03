import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import CastList from "../components/CastList";
import PageTitle from "../components/PageTitle";
import { getDrama } from "../services/DramaService";
import { getGenres } from "../utils/getGenres";
import { ratingColour } from "../utils/ratingColour";
import Reviews from "../components/Reviews";
import { updateWatchlist } from "../services/WatchlistService";
import { updateLocalWatchlist } from "../utils/updateLocalWatchlist";
import { dramaImageUrl } from "../utils/collectDramaImage.js";
import { posterImageUrl } from "../utils/collectDramaImage.js";

const Drama = ({ userId, token }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const userInfo = JSON.parse(localStorage.getItem("userProfile"));
	const initialState = userInfo?.userProfile.watchlist.includes(id);
	const [dramaTitle, setDramaTitle] = useState("");
	const [dramaYear, setDramaYear] = useState("");
	const [dramaRating, setDramaRating] = useState("");
	const [dramaGenres, setDramaGenres] = useState([]);
	const [dramaSynopsis, setDramaSynopsis] = useState("");
	const [dramaImage, setDramaImage] = useState("");
	const [dramaPoster, setDramaPoster] = useState("");
	const [dramaCast, setDramaCast] = useState([]);
	const [dramaReviews, setDramaReviews] = useState([]);
	const [onWatchlist, setOnWatchlist] = useState(
		userInfo ? initialState : false
	);

	const handleWatchlist = async () => {
		setOnWatchlist(!onWatchlist);
		if (!userId) {
			navigate("/login");
			return;
		}
		await updateWatchlist({ userId, id, token });
		updateLocalWatchlist(id);
		return;
	};

	const getDetails = async () => {
		try {
			const dramaDetails = await getDrama(id);
			setDramaTitle(dramaDetails.drama.title);
			setDramaYear(dramaDetails.drama.year);
			setDramaRating(dramaDetails.drama.voteAverage.toFixed(1));
			setDramaGenres(getGenres(dramaDetails.drama.genreIds));
			setDramaSynopsis(dramaDetails.drama.synopsis);
			setDramaImage(dramaImageUrl().concat(dramaDetails.drama.image));
			setDramaPoster(posterImageUrl().concat(dramaDetails.drama.poster));
			setDramaReviews(dramaDetails.drama.reviews);
			setDramaCast(dramaDetails.drama.cast);
		} catch (e) {
			console.error("Failed to fetch drama:", e.message);
		}
	};

	useEffect(() => {
		getDetails();
	}, [id, onWatchlist]);

	return (
		<>
			<PageTitle title="Drama" />
			<div
				className={`Hero relative -mt-7.5 bg-cover bg-top bg-no-repeat]`}
				style={{ backgroundImage: `url(${dramaImage})` }}
			>
				<div className="container wrapper min-h-80 lg:min-h-500 after:bg-slate-400 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:md:bg-gradient-to-r after:md:to-80% after:from-black after:bg-opacity-20 after:h-full">
					<div className="col-span-12 p-5 pt-24 md:pt-5 z-1">
						<h1 className="text-white text-3xl xl:text-5xl mb-5">
							{dramaTitle}
						</h1>
						<div className="flex items-center gap-x-3 text-white">
							<p>{dramaYear}</p>
							<span className="flex items-center gap-x-1">
								<p className={`font-semibold ${ratingColour(dramaRating)}`}>
									{dramaRating}
								</p>
								<svg className="text-mauve-light h-3 w-3">
									<use xlinkHref="/assets/images/symbols.svg#star-icon"></use>
								</svg>
							</span>
						</div>
						<p className="pb-4 text-white">
							Genre:&nbsp;
							{dramaGenres.map((genre, index) => {
								return (
									<span key={index} className="mr-1.5">
										{genre}
										{index !== dramaGenres.length - 1 && ","}
									</span>
								);
							})}
						</p>
						<button
							onClick={handleWatchlist}
							className={`button ${
								onWatchlist && "bg-mauve-light hover:bg-mauve-dark"
							}`}
						>
							{onWatchlist ? "Remove from watchlist" : "Add to watchlist"}
						</button>
					</div>
				</div>
			</div>
			<section className="container wrapper">
				<div className="col-span-12">
					<div className="container">
						<div className="col-span-12 pt-2.5">
							<h3>Synopsis</h3>
							<p>{dramaSynopsis}</p>
						</div>
						{dramaCast.length > 0 && (
							<div className="col-span-12">
								<h3>Cast</h3>
								<CastList cast={dramaCast} />
							</div>
						)}
					</div>
				</div>
			</section>
			<section className="container wrapper">
				<div className="col-span-12">
					<div className="container">
						<div className="col-span-12 pt-7.5">
							<Reviews
								dramaReviews={dramaReviews}
								dramaId={id}
								dramaTitle={dramaTitle}
								dramaPoster={dramaPoster}
								userId={userId}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default Drama;
