import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import PageTitle from "../components/PageTitle";
import { isFormValid } from "../utils/isFormValid";
import { submitProfileUpdate } from "../services/AuthFormService";

const UserProfileEdit = ({ id, token }) => {
	const [newProfilePicture, setNewProfilePicture] = useState("");
	const [newBio, setNewBio] = useState("");
	const [newFirstName, setNewFirstName] = useState("");
	const [newLastName, setNewLastName] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

  const handleSubmit = async (e) => {
		let errorMessages = [];
		e.preventDefault();
		setErrors("");
		setSuccess("");

		const formValid = isFormValid({
			newFirstName,
			newLastName,
			newPassword,
			confirmPassword,
			oldPassword,
    });
		if (formValid.length > 0) {
			return setErrors(formValid);
		}

		const body = {
			oldPassword: oldPassword,
			newPassword: newPassword,
			firstName: newFirstName,
			lastName: newLastName,
			profilePicture: newProfilePicture,
			bio: newBio,
		};
    const result = await submitProfileUpdate(body, id, token);
		switch (result.status) {
      case 200:
        setErrors([]);
				setSuccess("Profile updated successfully.");
				navigate(`/members/${id}`);
				break;
      case 400:
        Object.keys(result.data.errors).forEach((key) => {
          const errorMessage = result.data.errors[key];
					errorMessages.push(errorMessage.msg);
				});
        setErrors(errorMessages);
				break;
			case 401:
				errorMessages.push(result.data);
				setErrors(errorMessages);
				break;
			case 403:
				errorMessages.push("Forbidden. Please log in.");
				setErrors(errorMessages);
				break;
			case 404:
				errorMessages.push(result.data.message);
				setErrors(errorMessages);
				break;
			case 500:
				errorMessages.push(result.data.message);
				setErrors(errorMessages);
				break;
			default:
				errorMessages.push("An unknown error occurred. Please try again.");
				setErrors(errorMessages);
				break;
		}
	};

	return (
		<>
			<PageTitle title={"Edit Profile"} />
			<section className="container wrapper">
				<div className="col-span-12">
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
					<h1>Edit your profile</h1>
					<form
						name="authForm"
						className="flex flex-col gap-5"
						action="/edit"
						onSubmit={handleSubmit}
					>
						<Field>
							<Label
								htmlFor="profilePicture"
								className="text-md font-medium leading-6 text-gray-900 mb-2"
							>
								Profile Picture
							</Label>
							<Input
								type="profilePicture"
								id="profilePicture"
								placeholder="Enter your profile picture URL"
								className="bg-white border border-gray-300 rounded-lg text-gray-dark text-sm md:text-base px-5 py-3 lg:px-4 lg:py-2 mt-1 w-full focus-visible:outline-none focus:ring-2 focus:ring-teal-600"
								value={newProfilePicture}
								onChange={(e) => setNewProfilePicture(e.target.value)}
								tabIndex={3}
							/>
						</Field>
						<Field>
							<Label
								htmlFor="bio"
								className="text-md font-medium leading-6 text-gray-900 mb-2"
							>
								Bio
							</Label>
							<Textarea
								type="bio"
								id="bio"
								placeholder="Enter your bio"
								className="bg-white border border-gray-300 rounded-lg text-gray-dark text-sm md:text-base px-5 py-3 lg:px-4 lg:py-2 mt-1 w-full focus-visible:outline-none focus:ring-2 focus:ring-teal-600"
								value={newBio}
								onChange={(e) => setNewBio(e.target.value)}
								tabIndex={3}
							/>
						</Field>
						<Field>
							<Label
								htmlFor="newFirstName"
								className="text-md font-medium leading-6 text-gray-900 mb-2"
							>
								First Name
							</Label>
							<Input
								type="text"
								id="newFirstName"
								placeholder="Enter your first name"
								className="bg-white border border-gray-300 rounded-lg text-gray-dark text-sm md:text-base px-5 py-3 lg:px-4 lg:py-2 mt-1 w-full focus-visible:outline-none focus:ring-2 focus:ring-teal-600"
								value={newFirstName}
								onChange={(e) => setNewFirstName(e.target.value)}
								tabIndex={5}
							/>
						</Field>
						<Field>
							<Label
								htmlFor="newLastName"
								className="text-md font-medium leading-6 text-gray-900 mb-2"
							>
								Last Name
							</Label>
							<Input
								type="text"
								id="newLastName"
								placeholder="Enter your last name"
								className="bg-white border border-gray-300 rounded-lg text-gray-dark text-sm md:text-base px-5 py-3 lg:px-4 lg:py-2 mt-1 w-full focus-visible:outline-none focus:ring-2 focus:ring-teal-600"
								value={newLastName}
								onChange={(e) => setNewLastName(e.target.value)}
								tabIndex={5}
							/>
						</Field>
						<Field>
							<Label
								htmlFor="newPassword"
								className="text-md font-medium leading-6 text-gray-900 mb-2"
							>
								New Password
							</Label>
							<Input
								type="password"
								id="newPassword"
								placeholder="Enter your new password"
								className="bg-white border border-gray-300 rounded-lg text-gray-dark text-sm md:text-base px-5 py-3 lg:px-4 lg:py-2 mt-1 w-full focus-visible:outline-none focus:ring-2 focus:ring-teal-600"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								tabIndex={5}
							/>
						</Field>
						<Field>
							<Label
								htmlFor="confirmPassword"
								className="text-md font-medium leading-6 text-gray-900 mb-2"
							>
								Confirm New Password
							</Label>
							<Input
								type="password"
								id="confirmPassword"
								placeholder="Confirm your new password"
								className="bg-white border border-gray-300 rounded-lg text-gray-dark text-sm md:text-base px-5 py-3 lg:px-4 lg:py-2 mt-1 w-full focus-visible:outline-none focus:ring-2 focus:ring-teal-600"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								tabIndex={5}
							/>
						</Field>
						<Field>
							<div className="flex items-center justify-between">
								<Label
									htmlFor="oldPassword"
									className="text-md font-medium leading-6 text-gray-900 mb-2"
								>
									Please confirm your changes with your current password
								</Label>
							</div>
							<Input
								type="password"
								id="oldPassword"
								placeholder="Enter your old password"
								className="bg-white border border-gray-300 rounded-lg text-gray-dark text-sm md:text-base px-5 py-3 lg:px-4 lg:py-2 mt-1 w-full focus-visible:outline-none focus:ring-2 focus:ring-teal-600"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								tabIndex={5}
								required
							/>
						</Field>
						<Button
							type="submit"
							className="button rounded-lg bg-teal py-3 px-4 mt-2.5 text-sm text-white data-[hover]:bg-teal-500 data-[active]:bg-teal-700"
							tabIndex={7}
						>
							Submit
						</Button>
					</form>
				</div>
			</section>
		</>
	);
};
export default UserProfileEdit;
