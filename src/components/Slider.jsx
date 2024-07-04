import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import DramaCard from "../components/DramaCard";

const Slider = ({ dramas }) => {
	const [dramaCards, setDramaCards] = useState([]);

	useEffect(() => {
		const renderDramas = async () => {
			try {
				dramas.sort((a, b) => b.voteAverage - a.voteAverage);
				setDramaCards(
					dramas.slice(0, 10).map((element) => (
						<SwiperSlide key={element.dramaId}>
							<DramaCard dramaDetails={element} />
						</SwiperSlide>
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
			<Swiper
				modules={[Autoplay, Navigation, Pagination]}
				spaceBetween={20}
				slidesPerView={2}
				breakpoints={{
					576: {
						// width: 576,
						slidesPerView: 2,
					},
					768: {
						// width: 768,
						slidesPerView: 3,
					},
				}}
				navigation
				pagination={false}
			>
				{dramaCards}
			</Swiper>
			<div className="text-center mt-5">
				<Link to="/explore" className="button">
					See more
				</Link>
			</div>
		</>
	);
};
export default Slider;
