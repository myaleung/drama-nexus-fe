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

describe.skip("AuthForm", () => {
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
});
