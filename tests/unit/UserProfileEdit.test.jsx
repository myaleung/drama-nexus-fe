import {
	render,
	screen,
	fireEvent,
	getByRole,
	getByText,
	getByDisplayValue,
	waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as AuthService from "../../src/services/AuthFormService.js";
import { submitProfileUpdate } from "../../src/services/AuthFormService.js";
import UserProfileEdit from "../../src/pages/UserProfileEdit.jsx";

describe.skip("User Profile Tests", () => {
	describe("Edit Profile Tests", () => {
		let mockSubmitAuthForm;
		let firstName;
		let lastName;
		let emailAddress;
		let password;
		let button;
		beforeEach(async () => {
			await waitFor(() => {
				render(
					<MemoryRouter initialEntries={["/sign-up"]}>
						<Routes>
							<Route path="/sign-up" element={<Login />} />
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
			emailAddress = screen.queryByLabelText("Email", {
				selector: "input",
			});
			password = screen.queryByLabelText("Password", {
				selector: "input",
			});
			button = screen.getByRole("button");
			mockSubmitAuthForm = vi.spyOn(AuthService, "submitAuthForm");
		});
		afterEach(() => {
			vi.clearAllMocks();
			mockSubmitAuthForm.mockClear();
		});

		it("should render the sign up form on path /sign-up", async () => {
			expect(screen.getByText("Create Account")).toBeInTheDocument();
			expect(firstName).toBeInTheDocument();
			expect(lastName).toBeInTheDocument();
			expect(emailAddress).toBeInTheDocument();
			expect(password).toBeInTheDocument();
			expect(button).toBeInTheDocument();
			await waitFor(() => {
				expect(button).toHaveTextContent("Sign Up");
			});
		});

		it("should call the submiteAuthForm service on submit", async () => {
			const firstNameText = "user";
			const lastNameText = "test";
			const emailText = "user@test.com";
			const passwordText = "Password123.";
			mockSubmitAuthForm.mockResolvedValue({ status: 200 });

			await userEvent.type(firstName, firstNameText);
			await userEvent.type(lastName, lastNameText);
			await userEvent.type(emailAddress, emailText);
			await userEvent.type(password, passwordText);
			await userEvent.click(button);

			await waitFor(() => {
				expect(mockSubmitAuthForm).toHaveBeenCalledTimes(1);
			});
		});

		it("should return status 200 if valid details supplied", async () => {
			const firstNameText = "user";
			const lastNameText = "test";
			const emailText = "user@test.com";
			const passwordText = "Password123.";
			const body = {
				firstName: firstNameText,
				lastName: lastNameText,
				email: emailText,
				password: passwordText,
			};
			mockSubmitAuthForm.mockResolvedValue({ status: 200 });

			await userEvent.type(firstName, firstNameText);
			await userEvent.type(lastName, lastNameText);
			await userEvent.type(emailAddress, emailText);
			await userEvent.type(password, passwordText);

			const response = await submitAuthForm(body, "/sign-up");

			await waitFor(() => {
				expect(mockSubmitAuthForm).toHaveBeenCalledTimes(1);
				expect(response.status).toBe(200);
				expect(mockSubmitAuthForm).toHaveBeenCalledWith(body, "/sign-up");
				//? Unsure how to test useNavigate
				// expect(mockedUsedNavigate).toHaveBeenCalledWith(`/sign-up`, {
				//   state: {
				//     signUpMessage: "Account successfully created. Please log in.",
				//   },
				// });
			});
		});

		it("should respond with 500 if Auth Service rejects", async () => {
			const errorResponse = new Error("Please enter a valid email address");
			errorResponse.status = 500;
			mockSubmitAuthForm.mockRejectedValue(errorResponse);
			const firstNameText = "user";
			const lastNameText = "test";
			const emailText = "user@";
			const passwordText = "Password123.";
			const body = {
				firstName: firstNameText,
				lastName: lastNameText,
				email: emailText,
				password: passwordText,
			};

			await userEvent.type(firstName, firstNameText);
			await userEvent.type(lastName, lastNameText);
			await userEvent.type(emailAddress, emailText);
			await userEvent.type(password, passwordText);

			try {
				await submitAuthForm(body, "/sign-up");
			} catch (e) {
				expect(e.message).toBe("Please enter a valid email address");
				expect(e.status).toBe(500);
				expect(mockSubmitAuthForm).toHaveBeenCalledTimes(1);
				expect(mockSubmitAuthForm).toHaveBeenCalledWith(body, "/sign-up");
			}
		});
	});
});
