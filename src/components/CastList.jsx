import { useEffect, useState } from "react";
import { castImageUrl } from "../utils/collectDramaImage";

const CastList = ({ cast }) => {
	const [visibleCast, setVisibleCast] = useState(8);
	const showMoreCast = () => {
		setVisibleCast((prevVisibleCast) => prevVisibleCast + 4); // Show 4 more cast members
	};

	useEffect(() => {}, [cast]);

	return (
		<>
			<div className="container">
				{cast.slice(0, visibleCast).map((actor, index) => (
					<div
						key={index}
						className="col-span-6 md:col-span-4 lg:col-span-3 flex flex-col items-center"
					>
						{/* To add once actor bios are added */}
						{/* <Link
						to={`/actors/${actor.id}`}
						className="flex flex-col items-center overflow-hidden md:max-w-xl no-underline group"
					> */}
						<img
							className="object-cover rounded-full h-16 w-16 lg:h-24 lg:w-24 shadow border-2 border-teal-dark dark:shadow-none group-hover:border-teal-600 transition-colors"
							src={castImageUrl().concat(actor.actor.image)}
							// src="https://0.viki.io/u/54233701u/csv5299ghQ.jpg?s=120x120&e=t&q=g&f=t"
							alt={actor.actor.name}
						/>
						<div className="flex flex-col justify-between pt-3 leading-normal text-center">
							<h5 className="mb-2 text-md font-bold tracking-tight text-teal-dark group-hover:text-teal-600">
								{actor.actor.name}
							</h5>
							<p className="text-sm font-normal text-teal-dark line-clamp-3 group-hover:text-teal-600">
								as {actor.role}
							</p>
						</div>
						{/* </Link> */}
					</div>
				))}
				{visibleCast < cast.length && (
					<button
						onClick={showMoreCast}
						className="flex flex-col items-center col-span-12 mt-4 px-4 py-2 text-teal-dark"
					>
						<span>Show More</span>
						<svg className="text-teal-dark h-8 w-8">
							<use xlinkHref="/assets/images/symbols.svg#show-more"></use>
						</svg>
					</button>
				)}
			</div>
		</>
	);
};
export default CastList;
