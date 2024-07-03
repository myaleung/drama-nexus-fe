import { useEffect, useState } from "react";
import { getDramas } from "../services/DramaService.js";
import { shuffleArray } from "../utils/shuffleArray.js";

const RandomPick = () => {
  const [dramaList, setDramaList] = useState([]);
  const [randomDrama, setRandomDrama] = useState({});
  
  const renderDramas = async () => {
		try {
			const dramas = await getDramas();
			setDramaList(dramas.dramas);
		} catch (e) {
			console.error("Failed to fetch dramas:", e.message);
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
			<div
				className={`relative bg-blue-light bg-cover bg-top bg-no-repeat text-center  mt-7.5`}
				style={{ backgroundImage: `url("/assets/images/clouds.jpg")` }}
			>
				<div className="container wrapper h-full min-h-80 lg:min-h-96 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:md:bg-gradient-to-r after:md:to-80% after:from-black after:bg-opacity-20 after:h-full">
					<div className="col-span-12 p-5 pt-24 md:pt-5 z-1">
						<h3 className="text-4xl xl:text-5xl text-white">
							Can't decide what to watch?
						</h3>
						<div>
							{randomDrama.title ? (
								<div>{randomDrama.title}</div>
							) : (
								<div>Let us decide for you...</div>
							)}
						</div>
						<button onClick={handleRandomPick} className={`button`}>
							Pick for me!
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
export default RandomPick;
