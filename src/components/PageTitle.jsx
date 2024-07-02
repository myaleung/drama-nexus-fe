import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PageTitle = ({ title }) => {
	const location = useLocation();

	useEffect(() => {
		document.title = title + " | Drama Nexus";
	}, [location, title]);

	return null;
};

export default PageTitle;
