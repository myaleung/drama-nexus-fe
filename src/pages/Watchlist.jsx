import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import collectAvatar from "../utils/collectAvatar.js";
import DramaList from "../components/DramaList";
import { getUser, loggedIn } from "../services/AuthUserService.js";
import PageTitle from "../components/PageTitle";

const Watchlist = ({ userId, token }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [hasFetched, setHasFetched] = useState(false);
	const [userProfile, setUserProfile] = useState(null);
	const [profilePicture, setProfilePicture] = useState(
		"/assets/images/avatar.png"
	);
	const [watchlist, setWatchlist] = useState([]);

	useEffect(() => {
		if (!token) return;
		const result = loggedIn();
		if (!result) {
			navigate("/login");
			return;
		}

		const userProfileFromStorage = localStorage.getItem("userProfile");
		if (userProfileFromStorage) {
			const userProfileObject = JSON.parse(userProfileFromStorage);
			setUserProfile(userProfileObject.userProfile);
		}
	}, [navigate, token]);

	useEffect(() => {
		if (userProfile) {
			setProfilePicture(userProfile.profilePicture);
		}
	}, [userProfile]);

	const handleUserWatchlist = async () => {
		try {
			const response = await getUser(id, token);
			setWatchlist(response.data.userProfile.watchlist);
			return;
		} catch (error) {
			console.error("Failed to fetch user:", error);
		}
	};

	useEffect(() => {
		handleUserWatchlist();
		setHasFetched(true);
		return () => setHasFetched(false);
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
							<Link to={`/members/${id}`} className="button">
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
