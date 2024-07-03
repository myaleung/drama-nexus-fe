import { useState } from "react";

import DramaCard from "../components/DramaCard";
import { getDramas } from "../services/DramaService.js";
import PageTitle from "../components/PageTitle";
import { useEffect } from "react";

const Explore = () => {
	const [dramaCards, setDramaCards] = useState([]);
	const [visibleDramas, setVisibleDramas] = useState(12);
	const [dramaArray, setDramaArray] = useState([]);
	const showMoreDramas = () => {
		setVisibleDramas((prevVisibleDramas) => prevVisibleDramas + 8); // Show 4 more cast members
	};
	
	const renderDramas = async () => {
		try {
			const dramaList = await getDramas();
			setDramaArray(dramaList.dramas);
			setDramaCards(
				dramaList.dramas.slice(0, visibleDramas).map((element) => (
					<div
						className="flex flex-col col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
						key={element.dramaId}
					>
						<DramaCard dramaDetails={element} />
					</div>
				))
			);
		} catch (e) {
			console.error("Failed to fetch dramas:", e.message);
		}
	};

	useEffect(() => {
		renderDramas();
	}, [dramaArray]);

	return (
		<>
			<PageTitle title="Explore" />
			<section className="container wrapper">
				<div className="col-span-12">
					<h1 className="text-5xl">Explore K-Dramas</h1>
					<div className="container">
						{dramaCards}
						{visibleDramas < dramaArray.length && (
							<button
								onClick={showMoreDramas}
								className="flex flex-col items-center col-span-12 mt-4 px-4 py-2 text-teal-dark"
							>
								<span>Show More</span>
								<svg className="text-teal-dark h-8 w-8">
									<use xlinkHref="/assets/images/symbols.svg#show-more"></use>
								</svg>
							</button>
						)}
					</div>
				</div>
			</section>
		</>
	);
};
export default Explore;
