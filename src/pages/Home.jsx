import { useEffect, useState } from "react";

import DoubleTextContainer from "../components/DoubleTextContainer";
import { getDramas } from "../services/DramaService.js";
import HomeCarousel from "../components/HomeCarousel";
import LoadingStub from "../components/LoadingStub";
import PageTitle from "../components/PageTitle";
import Slider from "../components/Slider";
import RandomPick from "../components/RandomPick.jsx";

const Home = () => {
	const [homeDramas, setHomeDramas] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const text1 =
		"Founded in the year 2000, Drama Nexus is a boutique company dedicated to curating and cataloging Korean dramas. From the heart of Seoul, we embarked on a journey to capture the essence of Korean storytelling and share it with the world. Our passion for K-dramas drives us to meticulously gather and maintain an extensive database that includes classics that have defined the genre, as well as the latest releases that continue to captivate audiences globally.";
	const text2 =
		"Over the years, Drama Nexus has become a cherished resource for fans and researchers alike, offering detailed insights, reviews, and ratings. Our commitment to celebrating Korean culture through its dramas has fostered a vibrant community of enthusiasts who rely on us for the most accurate and comprehensive K-drama information.";

	const renderDramas = async () => {
		try {
			setIsLoading(true);
			const dramaList = await getDramas();
			dramaList.dramas.sort((a, b) => b.year - a.year);
			setHomeDramas(dramaList.dramas.slice(0, 10));
		} catch (e) {
			console.error("Failed to fetch dramas:", e.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		renderDramas();
	}, []);

	return (
		<>
			<PageTitle title="Home" />
			{isLoading ? (
				<LoadingStub />
			) : (
				homeDramas.length > 1 && (
					<>
						<HomeCarousel homeDramas={homeDramas} />
					</>
				)
			)}
			<section className="container wrapper">
				<div className="col-span-12">
					{isLoading ? (
						<LoadingStub />
					) : (
						<>
							<h2 className="text-4xl">Top 10 Dramas</h2>
							<Slider />
						</>
					)}
				</div>
			</section>
			<RandomPick />
			<section className="container wrapper">
				<DoubleTextContainer title="About Us" text1={text1} text2={text2} />
			</section>
		</>
	);
};
export default Home;
