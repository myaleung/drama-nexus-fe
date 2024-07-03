import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import collectAvatar from "../utils/collectAvatar.js";
import DramaList from "../components/DramaList";
import { getUser } from "../services/AuthUserService.js";
import PageTitle from "../components/PageTitle";

const Watchlist = ({ userId, token }) => {
	const { id } = useParams();	
	const [profilePicture, setProfilePicture] = useState(
		"/assets/images/avatar.png"
	);
	const [watchlist, setWatchlist] = useState([]);
	const fetchAvatar = async () => {
		try {
			const avatar = await collectAvatar(userId, token);
			setProfilePicture(avatar);
			return;
		} catch (error) {
			console.error("Failed to fetch profile image:", error);
		}
	};

	const handleUserWatchlist = async () => {
		try {
			const response = await getUser(userId, token);
			setWatchlist(response.data.userProfile.watchlist);
			return;
		} catch (error) {
			console.error("Failed to fetch user:", error);
		}
	};

	useEffect(() => {
		fetchAvatar();
		handleUserWatchlist();
	}, [userId, token]);

	return (
		<>
			<PageTitle title="Your Watchlist" />
			<section className="container wrapper">
				<div className="grid col-span-12 grid-cols-subgrid">
					<div className="col-span-3">
						<img
							src={profilePicture}
							className="h-auto w-full"
							alt="User Profile"
						/>
					</div>
					<div className="col-span-8 col-start-5">
						<h2 className="mt-0 pt-0">Your Watchlist</h2>
						<div className="mt-3 space-x-4">
							<Link to={`/members/profile/${id}`} className="button">
								Back to Profile
							</Link>
						</div>
					</div>
				</div>
				<div className="col-span-12 border-t border-grey-300 pt-7.5">
					<DramaList list={watchlist} />
				</div>
			</section>
		</>
	);
};
export default Watchlist;
