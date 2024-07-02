import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import collectAvatar from "../utils/collectAvatar.js";
import PageTitle from "../components/PageTitle";
import Reviews from "../components/Reviews";
import { getUser } from "../services/AuthUserService.js";

const UserProfile = ({ id, token }) => {
	const [profilePicture, setProfilePicture] = useState("/assets/images/avatar.png");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [bio, setBio] = useState("");
	const [joinedDate, setJoinedDate] = useState("");
	const [reviews, setReviews] = useState([]);

	const handleUser = async () => {		
		try {
			const response = await getUser(id, token);
			const date = new Date(
				response.data.userProfile.user.createdAt
			).toLocaleDateString("en-UK");
			setFirstName(response.data.userProfile.user.name.firstName);
			setLastName(response.data.userProfile.user.name.lastName);
			setProfilePicture(response.data.userProfile.profilePicture);
			setBio(response.data.userProfile.bio);
			setJoinedDate(date);
			setReviews(response.data.userProfile.reviews);
			return;
		} catch (error) {
			console.error("Failed to fetch user:", error);
		}
	};
	
	useEffect(() => {
		handleUser();
	}, [id, token]);

	return (
		<>
			<PageTitle title="User Profile" />
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
						<h2 className="mt-0 pt-0">
							{firstName} {lastName}
						</h2>
						<p className="mb-2 font-semibold text-teal">
							Joined on {joinedDate}
						</p>
						<p>{bio}</p>
						<div className="mt-3 space-x-4">
							<Link to={`/members/${id}/watchlist`} className="button">
								Watchlist
							</Link>
							<Link to={`/members/${id}/edit`} className="button">
								Edit Profile
							</Link>
						</div>
					</div>
				</div>
			</section>
			<section className="container wrapper">
				<div className="col-span-12">
					<div className="container">
						<div className="col-span-12 pt-7.5">
							<Reviews dramaReviews={reviews} />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default UserProfile;
