import { useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import PageTitle from "../components/PageTitle";

const Login = () => {
	const location = useLocation();

	const content =
		location.pathname === "/login" ? (
			<>
				<h4 className="font-bold mt-5">
					Benefits of your free Drama Nexus account
				</h4>
				<ul className="list-disc space-y-1 ml-5">
					<li>Discover shows you&apos;ll love.</li>
					<li>Your Watchlist to help track everything you want to watch.</li>
					<li>Contribute by adding your ratings and reviews on dramas.</li>
				</ul>
			</>
		) : (
			<>
				<h3 className="text-teal-dark font-bold mt-5">Welcome back to Drama Nexus</h3>
				<ul className="list-disc space-y-1 ml-5">
					<li>Discover shows you&apos;ll love.</li>
					<li>
						Stay up-to-date with the latest K-drama news, releases, and
						exclusive content.
					</li>
					<li>
						Access detailed information about dramas, including cast, synopsis,
						and user ratings.
					</li>
				</ul>
			</>
		);

	return (
		<>
			<PageTitle title={location.pathname === "/login" ? "Login" : "Sign Up"} />
			<section className="container wrapper">
				<div className="col-span-12 md:col-span-7 md:order-2">
					<h1>
						{location.pathname === "/login" ? "Log In" : "Create Account"}
					</h1>
					<AuthForm path={location.pathname} />
				</div>
				<div className="col-span-12 md:col-span-5 md:order-1 mt-3 md:mt-0 border-t md:border-t-0 md:border-r md:border-gray-100 pr-5">
					{content}
				</div>
			</section>
		</>
	);
};
export default Login;
