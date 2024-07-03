import {
	Button,
	Field,
	Input,
	Label,
	Select,
	Textarea,
} from "@headlessui/react";
import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { isFormValid } from "../utils/isFormValid";
import { submitReviewForm } from "../services/ReviewService";

const ReviewForm = ({ userId, token }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [reviewRating, setReviewRating] = useState(1);
	const [reviewTitle, setReviewTitle] = useState("");
	const [reviewDescription, setReviewDescription] = useState("");
	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState("");
	const action = location.pathname.split("/")[3]; // add-review or edit-review
  const userInfo = JSON.parse(localStorage.getItem("userProfile"));

	const handleSubmit = async (e) => {
		let body;
		let errorMessages = [];
		e.preventDefault();
		setErrors("");
		setSuccess("");

		const formValid = isFormValid({
			path: action,
			title: reviewTitle,
		});
		if (formValid.length > 0) {
			return setErrors(formValid);
		}
		body = {
			stars: reviewRating,
			title: reviewTitle,
			description: reviewDescription,
		};
		const result = await submitReviewForm(
			body,
			action,
			id,
			userInfo.userProfile._id,
			token
		);
		switch (result.status) {
			case 200:
				//Review Updated. Redirect to drama page
				setErrors("");
				//redirect to drama page
				window.location.href = `/drama/${id}`;
				break;
			case 201:
				//Review added. Return them to drama page
				setErrors("");
				navigate(`/drama/${id}`, {
					state: {
						signUpMessage: "Review successfully created.",
					},
				});
				break;
			case 401:
				//Invalid password
				errorMessages.push(result.data);
				setErrors(errorMessages);
				break;
			case 400:
				//Bad request
				Object.keys(result.data.errors).forEach((key, index) => {
					const errorMessage = result.data.errors[key];
					errorMessages.push(errorMessage.msg);
				});
				setErrors(errorMessages);
				break;
			case 404:
				//User not found
				errorMessages.push(result.data.message);
				setErrors(errorMessages);
				// setErrors(result.message);
				break;
			case 500:
				//Invalid credentials
				errorMessages.push(result.data.message);
				setErrors(errorMessages);
				break;
			default:
				errorMessages.push("Something went wrong. Please try again later.");
				setErrors(errorMessages);
		}
	};

	return (
		<>
			<PageTitle title="Add a review" />
			<section className="container wrapper">
				<div className="col-span-12 flex flex-col justify-evenly items-center gap-3 text-center z-1">
					<h1>Add your review</h1>
					<p className="h4">
						Use the fields below to add your review to this drama.
					</p>
					<div className="flex flex-col md:flex-row space-x-6">
						<div className="order-2 md:order-1">
							{/* <img
								src={dramaPoster}
								className="h-auto w-full bg-grey-100"
								alt={dramaTitle}
							/>
							<p className="text-semibold text-sm lg:text-xl">{dramaTitle}</p> */}
						</div>
						<div className="order-1 md:order-2">
							{success !== "" && (
								<div className="bg-teal-100 border-l-4 border-teal-500 text-teal-700 p-4 rounded mb-4">
									<p className="font-bold">Success</p>
									<p>{success}</p>
								</div>
							)}
							{errors.length > 0 && (
								<div
									className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4"
									role="alert"
								>
									<p className="font-bold">Error</p>
									{errors.map((error, index) => {
										return <p key={index}>{error}</p>;
									})}
								</div>
							)}
							<form
								name="authForm"
								className="flex flex-col gap-5"
								action={
									location.pathname === "/add-review"
										? "/add-review"
										: "/edit-review"
								}
								onSubmit={handleSubmit}
							>
								<Field>
									<Label
										htmlFor="reviewRating"
										className="text-md font-medium leading-6 text-gray-900 mb-2"
									>
										Rating
									</Label>
									<Select
										id="reviewRating"
										className="bg-white border border-gray-300 rounded-lg text-gray-dark text-sm md:text-base px-5 py-3 lg:px-4 lg:py-2 mt-1 w-full focus-visible:outline-none focus:ring-2 focus:ring-teal-600"
										name="reviewRating"
										aria-label="Review Rating"
										value={reviewRating}
										onChange={(e) => setReviewRating(e.target.value)}
									>
										<option value="1">1 stars</option>
										<option value="2">2 stars</option>
										<option value="3">3 stars</option>
										<option value="4">4 stars</option>
										<option value="5">5 stars</option>
										<option value="6">6 stars</option>
										<option value="7">7 stars</option>
										<option value="8">8 stars</option>
										<option value="9">9 stars</option>
										<option value="10">10 stars</option>
									</Select>
								</Field>
								<Field>
									<Label
										htmlFor="reviewTitle"
										className="text-md font-medium leading-6 text-gray-900 mb-2"
									>
										Title
									</Label>
									<Input
										type="text"
										id="reviewTitle"
										placeholder="Enter your review title"
										className="bg-white border border-gray-300 rounded-lg text-gray-dark text-sm md:text-base px-5 py-3 lg:px-4 lg:py-2 mt-1 w-full focus-visible:outline-none focus:ring-2 focus:ring-teal-600"
										value={reviewTitle}
										onChange={(e) => setReviewTitle(e.target.value)}
										tabIndex={1}
									/>
								</Field>
								<Field>
									<Label
										htmlFor="reviewDescription"
										className="text-md font-medium leading-6 text-gray-900 mb-2"
									>
										Your review
									</Label>
									<Textarea
										type="text"
										id="reviewDescription"
										placeholder="Enter your review"
										className="bg-white border border-gray-300 rounded-lg text-gray-dark text-sm md:text-base px-5 py-3 lg:px-4 lg:py-2 mt-1 w-full focus-visible:outline-none focus:ring-2 focus:ring-teal-600"
										value={reviewDescription}
										onChange={(e) => setReviewDescription(e.target.value)}
										tabIndex={2}
									/>
								</Field>
								<Button
									type="submit"
									className="button rounded-lg bg-teal py-3 px-4 mt-2.5 text-sm text-white data-[hover]:bg-teal-500 data-[active]:bg-teal-700"
									tabIndex={3}
								>
									{location.pathname === "/add-review"
										? "Submit Review"
										: "Edit Review"}
								</Button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default ReviewForm;
