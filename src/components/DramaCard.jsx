import { Link } from 'react-router-dom';
import { posterImageUrl } from "../utils/collectDramaImage.js";

const DramaCard = ({ dramaDetails }) => {
	return (
		<>
			<div className="card group relative max-w-sm bg-white rounded-lg h-full shadow dark:bg-brown-dark dark:border-brown-dark overflow-hidden aspect-card">
				<div className="card-image after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black overflow-hidden">
					<img
						src={posterImageUrl().concat(dramaDetails.poster)}
						alt={dramaDetails.title}
						className="bg-brown-light w-100 min-h-40 object-cover object-center group-hover:scale-110 transition-all"
					/>
				</div>
				<div className="card-body flex flex-col justify-end  h-full absolute bottom-0 p-5">
					<h2 className="card-title mb-2 md:text-2xl font-bold tracking-tight text-brown-dark dark:text-white">
						{dramaDetails.title}
					</h2>
					<p className="card-text mb-3 font-normal text-brown-dark dark:text-blue-light hidden md:line-clamp-3">
						{dramaDetails.synopsis}
					</p>
					<Link
						to={`/drama/${dramaDetails._id}`}
						className="inline-flex items-center text-sm font-medium text-center text-white after:absolute after:inset-0 after:content-['']"
					>
						View Drama &raquo;
					</Link>
				</div>
			</div>
		</>
	);
};
export default DramaCard;
