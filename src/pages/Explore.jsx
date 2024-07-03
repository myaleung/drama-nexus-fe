import { useState } from "react";

import DramaCard from "../components/DramaCard";
import { getDramas } from "../services/DramaService.js";
import PageTitle from "../components/PageTitle";
import { useEffect } from "react";

const Explore = () => {
	const [dramaCards, setDramaCards] = useState([]);
	
	useEffect(() => {
		const renderDramas = async () => {
			try {
				const dramaList = await getDramas();
				setDramaCards(
					dramaList.dramas.map((element) => (
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
		renderDramas();
	}, []);

	return (
		<>
			<PageTitle title="Explore" />
			<section className="container wrapper">
				<div className="col-span-12">
					<h1 className="text-5xl">Explore K-Dramas</h1>
					<div className="container">
						{dramaCards}
					</div>
				</div>
			</section>
		</>
	);
};
export default Explore;
