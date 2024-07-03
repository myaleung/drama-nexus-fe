import DoubleTextContainer from "../components/DoubleTextContainer";
import PageTitle from "../components/PageTitle";

const About = () => {
	const text1 =
		"Founded in the year 2000, Drama Nexus is a boutique company dedicated to curating and cataloging Korean dramas. From the heart of Seoul, we embarked on a journey to capture the essence of Korean storytelling and share it with the world. Our passion for K-dramas drives us to meticulously gather and maintain an extensive database that includes classics that have defined the genre, as well as the latest releases that continue to captivate audiences globally.";
	const text2 =
		"Over the years, Drama Nexus has become a cherished resource for fans and researchers alike, offering detailed insights, reviews, and ratings. Our commitment to celebrating Korean culture through its dramas has fostered a vibrant community of enthusiasts who rely on us for the most accurate and comprehensive K-drama information.";

	return (
		<>
			<PageTitle title="About" />
			<div
				className={`hero relative -mt-7.5 bg-slate-400 bg-cover bg-bottom bg-no-repeat`}
				style={{
					backgroundImage: `url("/assets/images/clouds.jpg")`,
				}}
			>
				<div className="container wrapper">
					<div className="col-span-12 py-24 md:py-7.5 z-1">
						<svg className="text-teal-dark w-full h-auto">
							<use xlinkHref="/assets/images/symbols.svg#hello"></use>
						</svg>
						<h1 className="text-3xl xl:text-5xl mb-5">Hi There</h1>
						<p>
							Welcome to Drama Nexus—your ultimate destination for discovering
							and exploring the vibrant world of Korean dramas. Whether you're a
							newcomer seeking your first K-drama experience or a seasoned
							enthusiast looking for your next favorite series, Drama Nexus is
							here to guide you through the rich tapestry of Korean
							entertainment.
						</p>
					</div>
				</div>
			</div>
			<section className="container wrapper">
				<div className="col-span-12">
					<h2>Our Mission</h2>
					<p>
						At Drama Nexus, our mission is to create a dedicated space for
						K-drama lovers to find, review, and discuss their favorite shows. We
						aim to simplify the search for quality content, foster a passionate
						community, and promote cross-cultural appreciation through the lens
						of Korean dramas.
					</p>
				</div>
				<DoubleTextContainer title="Our Story" text1={text1} text2={text2} />
				<div className="col-span-12">
					<h3>Our Vision</h3>
					<p>
						We envision Drama Nexus as more than just a database—it’s a hub for
						cultural exchange and mutual appreciation. By promoting the rich
						narrative traditions of Korean dramas, we hope to bridge cultural
						gaps and bring people closer through shared interests and
						experiences.
					</p>
				</div>
				<div className="col-span-12">
					<h3>Join Our Community</h3>
					<p>
						Become a part of the Drama Nexus community today. Share your
						thoughts, discover new shows, and connect with fellow fans.
						Together, let's celebrate the magic of Korean dramas and embark on
						countless storytelling adventures.
					</p>
				</div>
			</section>
		</>
	);
};
export default About;
