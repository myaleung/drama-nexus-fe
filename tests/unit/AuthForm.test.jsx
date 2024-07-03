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

// import AuthForm from "../../src/components/AuthForm.jsx";
import * as AuthService from "../../src/services/AuthFormService.js";
import { submitAuthForm } from "../../src/services/AuthFormService.js";
import Login from "../../src/pages/Login.jsx";

describe("AuthForm", () => {
	describe("Login Page", () => {
		let mockSubmitAuthForm;
		let emailAddress;
		let password;
		let button;
		const mockJwtToken = "mock.jwt.token";
		beforeEach(async () => {
			await waitFor(() => {
				render(
					<MemoryRouter initialEntries={["/login"]}>
						<Routes>
							<Route path="/login" element={<Login />} />
						</Routes>
					</MemoryRouter>
				);
			});
			emailAddress = screen.queryByLabelText("Email", {
				selector: "input",
			});
			password = screen.queryByLabelText("Password", {
				selector: "input",
			});
			button = screen.getByRole("button");
			mockSubmitAuthForm = vi.spyOn(AuthService, "submitAuthForm");
			document.cookie = `token=${mockJwtToken}`;
		});
		afterEach(() => {
      vi.clearAllMocks();
      mockSubmitAuthForm.mockClear();
			document.cookie = "token=; Max-Age=0";
		});

		it("should render the login form on /login path", async () => {
			expect(screen.getByText("Login")).toBeInTheDocument();
			expect(emailAddress).toBeInTheDocument();
			expect(password).toBeInTheDocument();
			expect(button).toBeInTheDocument();
			await waitFor(() => {
				expect(button).toHaveTextContent("Login");
			});
		});

		it("should submit the login form", async () => {
			const emailText = "user@test.com";
			const passwordText = "Password123.";
			const body = { email: emailText, password: passwordText };
			mockSubmitAuthForm.mockResolvedValue({ status: 200 });

			await userEvent.type(emailAddress, emailText);
			await userEvent.type(password, passwordText);
			await userEvent.click(button);

			await waitFor(() => {
				expect(mockSubmitAuthForm).toHaveBeenCalledTimes(1);
				expect(mockSubmitAuthForm).toHaveBeenCalledWith(body, "/login");
			});
		});

		it("should handle the form submission correctly and return success", async () => {
			const emailText = "user@test.com";
			const passwordText = "Password123.";
			const body = { email: emailText, password: passwordText };
			mockSubmitAuthForm.mockResolvedValue({
				status: 200,
				token: mockJwtToken,
			});

			await userEvent.type(emailAddress, "email@email.com");
			await userEvent.type(password, "Password123.");

			const response = await submitAuthForm(body, "/login");

			expect(response.status).toBe(200);
		});

		it("should respond with 500 if Auth Service rejects", async () => {
			const errorResponse = new Error("Please enter a valid email address");
			errorResponse.status = 500;
			mockSubmitAuthForm.mockRejectedValue(errorResponse);
			const body = { email: emailAddress, password: password };
			userEvent.type(emailAddress, "email@email");
			userEvent.type(password, " ");

			try {
				await submitAuthForm(body, "/login");
			} catch (e) {
				expect(e.message).toBe("Please enter a valid email address");
				expect(e.status).toBe(500);
				expect(mockSubmitAuthForm).toHaveBeenCalledTimes(1);
			}
		});
	});

	describe("Sign Up Page", () => {
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
			button = screen.getByRole("button", { name: /Sign Up/i });
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

		it("should call the submitAuthForm service on submit", async () => {
			const firstNameText = "user";
			const lastNameText = "test";
			const emailText = "user@test.com";
			const passwordText = "Password123.";
			const body = { firstName: firstNameText, lastName: lastNameText, email: emailText, password: passwordText };
			mockSubmitAuthForm.mockResolvedValue({ status: 200 });

			await userEvent.type(firstName, firstNameText);
			await userEvent.type(lastName, lastNameText);
			await userEvent.type(emailAddress, emailText);
			await userEvent.type(password, passwordText);
			await submitAuthForm(body, "/sign-up");

			await waitFor(() => {
        expect(mockSubmitAuthForm).toHaveBeenCalledTimes(1);
			});
		});
		
    it("should return status 200 if valid details supplied", async () => {
			const firstNameText = "user";
			const lastNameText = "test";
			const emailText = "user@test.com";
      const passwordText = "Password123.";
      const body = { firstName: firstNameText, lastName: lastNameText, email: emailText, password: passwordText };
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
      const body = { firstName: firstNameText, lastName: lastNameText, email: emailText, password: passwordText };

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
