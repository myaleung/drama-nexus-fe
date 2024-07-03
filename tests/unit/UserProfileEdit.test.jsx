import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as AuthFormService from "../../src/services/AuthFormService.js";
import * as AuthUserService from "../../src/services/AuthUserService.js";
import * as IsFormValid from "../../src/utils/isFormValid.js";
import { submitProfileUpdate } from "../../src/services/AuthFormService.js";
import UserProfile from "../../src/pages/UserProfile.jsx";
import UserProfileEdit from "../../src/pages/UserProfileEdit.jsx";

describe("User Profile Tests", () => {
	describe("Get User Profile Tests", () => {
		let mockGetUserProfile;
		let editProfileLink;
		let profilePicture;
		let reviewHeading;
		let watchlistLink;
		let user;
		vi.mock("../../src/services/AuthUserService.js");
		beforeEach(async () => {
			AuthUserService.loggedIn.mockReturnValue(true);
			await waitFor(() => {
				render(
					<MemoryRouter initialEntries={["/members/:id"]}>
						<Routes>
							<Route
								path="/members/:id"
								element={<UserProfile userId={"1234"} token={"mockToken"} />}
							/>
						</Routes>
					</MemoryRouter>
				);
			});
			profilePicture = screen.getByAltText("User Profile");
			reviewHeading = screen.getByText("Reviews");
			editProfileLink = await screen.findByRole("link", {
				name: /Edit Profile/i,
			});
			watchlistLink = await screen.findByRole("link", { name: /Watchlist/i });
			mockGetUserProfile = vi.spyOn(AuthUserService, "getUser");
			user = {
				firstName: "Tania",
				lastName: "Lace",
				joined: "26/06/2024",
				bio: "Some bio here...",
				profilePicture: "/assets/images/avatar.png",
				reviews: [
					{ dramaId: 246331, title: "Amazzing", review: "Great drama!" },
				],
				watchlist: [],
			};
		});
		afterEach(() => {});
		
		it("should render the user profile on path /members/:id", async () => {
			await waitFor(() => {
				expect(profilePicture).toBeInTheDocument();
				expect(reviewHeading).toBeInTheDocument();
				expect(editProfileLink).toBeInTheDocument();
				expect(editProfileLink).toHaveTextContent("Edit Profile");
				expect(watchlistLink).toBeInTheDocument();
				expect(watchlistLink).toHaveTextContent("Watchlist");
			});
		});
	});

	describe("Edit Profile Tests", () => {
		let mockSubmitAuthForm;
		let mockIsFormValid;
		let mockId;
		let mockToken;
		let firstName;
		let lastName;
		let profilePicture;
		let bio;
		let newPassword;
		let confirmPassword;
		let oldPassword;
		let button;
		beforeEach(async () => {
			await waitFor(() => {
				render(
					<MemoryRouter initialEntries={["/members/:id/edit"]}>
						<Routes>
							<Route path="/members/:id/edit" element={<UserProfileEdit />} />
						</Routes>
					</MemoryRouter>
				);
			});
			firstName = screen.queryByLabelText("First Name", {
				selector: "input",
			});
			lastName = screen.queryByLabelText("Last Name", {
				selector: "input",
			});
			profilePicture = screen.queryByLabelText("Profile Picture", {
				selector: "input",
			});
			bio = screen.queryByLabelText("Bio", {
				selector: "textarea",
			});
			newPassword = screen.queryByLabelText("New Password", {
				selector: "input",
			});
			confirmPassword = screen.queryByLabelText("Confirm New Password", {
				selector: "input",
			});
			oldPassword = screen.queryByLabelText(
				"Please confirm your changes with your current password",
				{
					selector: "input",
				}
			);
			button = screen.getByRole("button", { name: /Submit/i });
			mockSubmitAuthForm = vi.spyOn(AuthFormService, "submitProfileUpdate");
			mockIsFormValid = vi.mock("../../src/utils/isFormValid.js", () => ({
				isFormValid: vi.fn(),
			}));
			mockId = "12345";
			mockToken = "mockJwtToken";
		});
		afterEach(() => {
			vi.clearAllMocks();
			mockSubmitAuthForm.mockClear();
		});

		it("should render the user profile edit form on path /members/:id/edit", async () => {
			expect(screen.getByText("Edit your profile")).toBeInTheDocument();
			expect(firstName).toBeInTheDocument();
			expect(lastName).toBeInTheDocument();
			expect(profilePicture).toBeInTheDocument();
			expect(bio).toBeInTheDocument();
			expect(newPassword).toBeInTheDocument();
			expect(confirmPassword).toBeInTheDocument();
			expect(oldPassword).toBeInTheDocument();
			expect(button).toBeInTheDocument();
			await waitFor(() => {
				expect(button).toHaveTextContent("Submit");
			});
		});

		it("should call the submitFormService and isValid on submit", async () => {
			const firstNameText = "user";
			const lastNameText = "test";
			const bioText = "Some bio message";
			const passwordText = "Password123.";
			mockSubmitAuthForm.mockResolvedValue({ status: 200 });
			IsFormValid.isFormValid.mockReturnValue([]);

			await userEvent.type(firstName, firstNameText);
			await userEvent.type(lastName, lastNameText);
			await userEvent.type(bio, bioText);
			await userEvent.type(oldPassword, passwordText);
			await userEvent.click(button);

			await waitFor(() => {
				expect(mockSubmitAuthForm).toHaveBeenCalledTimes(1);
				expect(IsFormValid.isFormValid).toHaveBeenCalled();
			});
		});

		it("should respond with error message if isFormValid returns an error", async () => {
			const firstNameText = "user";
			const lastNameText = "test";
			const bioText = "Some bio message";
			const badPasswordText = "ord123";
			const errorMessage = "Error message";
			IsFormValid.isFormValid.mockReturnValue([errorMessage]);

			await userEvent.type(firstName, firstNameText);
			await userEvent.type(lastName, lastNameText);
			await userEvent.type(bio, bioText);
			await userEvent.type(oldPassword, badPasswordText);
			await userEvent.click(button);

			await waitFor(() => {
				expect(IsFormValid.isFormValid).toHaveBeenCalled();
				expect(screen.getByText(errorMessage)).toBeInTheDocument();
			});
		});

		it("should return status 200 if valid details supplied", async () => {
			const firstNameText = "user";
			const lastNameText = "test";
			const bioText = "This is my bio.";
			const passwordText = "Password123.";
			const body = {
				firstName: firstNameText,
				lastName: lastNameText,
				bio: bioText,
				oldPassword: passwordText,
			};
			mockSubmitAuthForm.mockResolvedValue({ status: 200 });

			await userEvent.type(firstName, firstNameText);
			await userEvent.type(lastName, lastNameText);
			await userEvent.type(bio, bioText);
			await userEvent.type(oldPassword, passwordText);

			const response = await submitProfileUpdate(body, mockId, mockToken);

			await waitFor(() => {
				expect(mockSubmitAuthForm).toHaveBeenCalledTimes(1);
				expect(response.status).toBe(200);
				expect(mockSubmitAuthForm).toHaveBeenCalledWith(
					body,
					mockId,
					mockToken
				);
			});
		});

		it("should respond with error if AuthFormService rejects", async () => {
			const errorResponse = new Error("Please enter a valid new password");
			errorResponse.status = 500;
			mockSubmitAuthForm.mockRejectedValue(errorResponse);
			const firstNameText = "user";
			const bioText = "New text here";
			const newPasswordText = "Password";
			const oldPasswordText = "Password123.";
			const body = {
				firstName: firstNameText,
				bio: bioText,
				newPassword: newPasswordText,
				oldPassword: oldPasswordText,
			};

			await userEvent.type(firstName, firstNameText);
			await userEvent.type(bio, bioText);
			await userEvent.type(newPassword, newPasswordText);
			await userEvent.type(oldPassword, oldPasswordText);

			try {
				await submitProfileUpdate(body, mockId, mockToken);
			} catch (e) {
				expect(e.message).toBe("Please enter a valid new password");
				expect(e.status).toBe(500);
				expect(mockSubmitAuthForm).toHaveBeenCalledTimes(1);
				expect(mockSubmitAuthForm).toHaveBeenCalledWith(
					body,
					mockId,
					mockToken
				);
			}
		});
	});
});
