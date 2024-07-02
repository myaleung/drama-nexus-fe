import { useEffect } from "react";
import DramaMiniCard from "./DramaMiniCard";

const DramaList = ({ list }) => {
	useEffect(() => { }, [list]);

	return (
		<div className="container">
			{list.length > 0 ? (
				list.map((drama, index) => (
					<div key={index} className="col-span-6">
						<DramaMiniCard drama={drama} />
					</div>
				))
			) : (
					<div className="col-span-12 text-center">
						<p>No dramas in your watchlist.</p>
					</div>
			)}
		</div>
	);
};
export default DramaList;
