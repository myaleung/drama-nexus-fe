import { Link } from "react-router-dom";
import { posterImageUrl } from "../utils/collectDramaImage.js";

const DramaCard = ({ drama }) => {
	return (
		<>
			<Link
				to={`/drama/${drama._id}`}
				className="group flex flex-col items-center bg-white rounded-lg shadow dark:bg-teal-dark overflow-hidden md:flex-row md:max-w-xl hover:bg-teal-dark dark:hover:bg-teal no-underline transition-colors"
				data-testid="drama-mini-card"
			>
				<img
					className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg group-hover:scale-110 transition-all"
					src={posterImageUrl().concat(drama.poster)}
					alt={drama.title}
				/>
				<div className="flex flex-col justify-between p-4 leading-normal">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-teal-dark dark:text-white">
						{drama.title}
					</h5>
					<p className="mb-3 font-normal text-teal-dark dark:text-blue-light line-clamp-3">
						{drama.synopsis}
					</p>
				</div>
			</Link>
		</>
	);
};
export default DramaCard;
