import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import About from "./pages/About";
import Drama from "./pages/Drama";
import Explore from "./pages/Explore";
import Footer from "./components/Footer";
import { getUser } from "./services/AuthUserService";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { logout } from "./services/AuthUserService";
import NotFound from "./pages/NotFound";
import Page from "./components/Page";
import ReviewForm from "./pages/ReviewForm";
import UserProfile from "./pages/UserProfile";
import UserProfileEdit from "./pages/UserProfileEdit";
import Watchlist from "./pages/Watchlist";

const App = () => {
	let id;
	const [userProfile, setUserProfile] = useState({});
	const user = localStorage.getItem("user");
	const token = Cookies.get("token");
	if (user) {
		id = JSON.parse(user).id;
	}

	const getUserInfo = async () => {
		if (!id || !token) return;
		const info = await getUser(id, token);		
		if (
			localStorage.getItem("userProfile") === null ||
			localStorage.getItem("userProfile") === undefined
		) {
			localStorage.setItem("userProfile", JSON.stringify(info.data));
			setUserProfile(localStorage.getItem("userProfile"));
		}
	};

	useEffect(() => {
		getUserInfo();
	}, [userProfile]);

	return (
		<>
			<Header id={id} token={token} handleLogout={logout} />
			<Page>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/explore" element={<Explore />} />
					<Route
						path="/drama/:id"
						element={<Drama userId={id} token={token} />}
					/>
					<Route
						path="/drama/:id/add-review"
						element={<ReviewForm userId={id} token={token} />}
					/>
					<Route path="/sign-up" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/members/:id"
						element={<UserProfile id={id} token={token} />}
					/>
					<Route
						path="/members/:id/edit"
						element={<UserProfileEdit id={id} token={token} />}
					/>
					<Route
						path="/members/:id/watchlist"
						element={<Watchlist id={id} token={token} />}
					/>
					<Route path="/about-us" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Page>
			<Footer />
		</>
	);
};
export default App;
