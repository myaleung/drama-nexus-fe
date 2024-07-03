import { useEffect, useState } from "react";
import { getDramas } from "../services/DramaService.js";
import { Link } from "react-router-dom";
import LoadingStub from "../components/LoadingStub";
import { posterImageUrl } from "../utils/collectDramaImage.js";
import { shuffleArray } from "../utils/shuffleArray.js";

const RandomPick = () => {
	const [dramaList, setDramaList] = useState([]);
	const [randomDrama, setRandomDrama] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const renderDramas = async () => {
		try {
			setIsLoading(true);
			const dramas = await getDramas();
			setDramaList(dramas.dramas);
		} catch (e) {
			console.error("Failed to fetch dramas:", e.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRandomPick = () => {
		const shuffledDramas = shuffleArray([...dramaList]);
		const selectedDrama = shuffledDramas[0];
    setRandomDrama(selectedDrama);
	};

	useEffect(() => {
		renderDramas();
	}, []);

	return (
		<>
			{isLoading ? (
				<LoadingStub />
			) : (
				dramaList.length > 5 && (
					<div
						className={`relative bg-blue-light bg-cover bg-top bg-no-repeat text-center mt-7.5 mb-5`}
						style={{ backgroundImage: `url("/assets/images/clouds.jpg")` }}
					>
						<div className="container wrapper h-full min-h-80 lg:min-h-96 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:md:bg-gradient-to-r after:md:to-80% after:from-black after:bg-opacity-20 after:h-full">
							<div className="flex flex-col place-items-center self-center col-span-12 p-5 pb-7.5 md:py-7.5 z-1">
								<h3 className="text-4xl xl:text-5xl text-white">
									Can't decide what to watch?
								</h3>
								<div className="relative flex flex-col items-center mb-5 text-center group">
									{randomDrama.title ? (
										<>
											<p className="text-xl mb-2.5 group-hover:text-teal-light transition-colors">
												Try watching: {randomDrama.title}
											</p>
											<img
												src={posterImageUrl().concat(randomDrama.poster)}
												className="group-hover:scale-105 transition-all h-75 w-auto bg-grey-100"
												alt={randomDrama.title}
											/>
											<Link
												to={`/drama/${randomDrama._id}`}
												className="after:absolute after:inset-0 after:content-['']"
											>
												<span className="sr-only">Tell me more</span>
											</Link>
										</>
									) : (
										<p className="text-xl">Let us decide for you...</p>
									)}
								</div>
								<button onClick={handleRandomPick} className={`button`}>
									Pick for me!
								</button>
							</div>
						</div>
					</div>
				)
			)}
		</>
	);
};
export default RandomPick;
