import { Link } from "react-router-dom";
import notFound from "/assets/images/notFound.svg";
import PageTitle from "../components/PageTitle";

const NotFound = () => {
	return (
		<>
			<PageTitle title="Page not found" />
			<section className="container wrapper">
				<div className="col-span-12 flex flex-col justify-evenly items-center gap-3 text-center z-1">
					<h1>Page Not Found!</h1>
					<p className="h4">
						Sorry, it looks like the connection was lost and we couldn&apos;t
						find what you were looking for.
					</p>
					<img src={notFound} className="h-full w-full py-5" />
					<Link className="button" to="/">
						Return to home
					</Link>
				</div>
			</section>
		</>
	);
};
export default NotFound;
