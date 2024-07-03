import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { dramaImageUrl } from "../utils/collectDramaImage.js";
import { getGenres } from "../utils/getGenres";
import { ratingColour } from "../utils/ratingColour";

const HomeCarousel = ({homeDramas}) => {
	const [dramaHero, setDramaHero] = useState([]);
	useEffect(() => {
		setDramaHero(
			homeDramas.map((drama) => (
				<SwiperSlide
					key={drama.dramaId}
					className="min-h-52 lg:min-h-80 xl:min-h-650 h-auto"
				>
					<div
						className={`hero h-full relative bg-blue-light bg-cover bg-center bg-no-repeat]`}
						style={{
							backgroundImage: `url(${dramaImageUrl().concat(drama.image)})`,
						}}
					>
						<div className="container wrapper h-full min-h-80 lg:min-h-500 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:md:bg-gradient-to-r after:md:to-80% after:from-black after:bg-opacity-20 after:h-full">
							<div className="col-span-12 p-5 z-1">
								<h1 className="text-4xl xl:text-5xl text-white">
									{drama.title}
								</h1>
								<div className="flex items-center gap-x-3">
									<p className="text-white">{drama.year}</p>
									<span className="flex items-center gap-x-1">
										<p
											className={`font-semibold ${ratingColour(
												drama.voteAverage
											)}`}
										>
											{drama.voteAverage.toFixed(1)}
										</p>
										<svg className="text-mauve-light h-3 w-3">
											<use xlinkHref="/assets/images/symbols.svg#star-icon"></use>
										</svg>
									</span>
								</div>
								<p className="pb-4 text-white">
									Genre:&nbsp;
									{getGenres(drama.genreIds).map((genre, index) => {
										return (
											<span key={index} className="mr-1.5">
												{genre}
												{index !== drama.genreIds.length - 1 && ","}
											</span>
										);
									})}
								</p>
								<Link to={`/drama/${drama._id}`} className="button">
									View more
								</Link>
							</div>
						</div>
					</div>
				</SwiperSlide>
			))
		);
	}, [homeDramas]);


	return (
		<section className="-mt-7.5">
			<Swiper
				modules={[Autoplay, Navigation, Pagination]}
				spaceBetween={50}
				slidesPerView={1}
				centeredSlides={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: true,
				}}
				loop={true}
				navigation
				pagination={{ clickable: true }}
				className="hey"
			>
				{dramaHero}
			</Swiper>
		</section>
	);
};
export default HomeCarousel;
