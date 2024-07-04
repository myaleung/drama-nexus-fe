import axios from "axios";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loginData, registerData } from "../data/UserTestData.js";
import * as AuthFormService from "../../src/services/AuthFormService.js";
import {
	submitAuthForm,
	submitProfileUpdate,
} from "../../src/services/AuthFormService.js";

describe("AuthFormService", () => {
	describe("Submit Auth Form", async () => {
		let mockError;
		let mockResponse;
		let mockSubmitAuthForm;
		let mockSubmitProfileUpdate;
		beforeEach(async () => {
			mockError = {
				response: {
					data: {
						message: "User not found",
					},
					status: 404,
				},
			};
			vi.mock("axios");
			mockSubmitAuthForm = vi.spyOn(AuthFormService, "submitAuthForm");
			mockSubmitProfileUpdate = vi.spyOn(
				AuthFormService,
				"submitProfileUpdate"
			);
		});
		afterEach(() => {
			vi.clearAllMocks();
			mockResponse = null;
			mockError = null;
		});

		it("should post login form details", async () => {
			mockResponse = { data: { message: "User found" } };
			axios.post.mockResolvedValue(mockResponse);

			const response = await submitAuthForm(
				{ email: loginData.email, password: loginData.password },
				"/login"
			);
			await waitFor(() => {
				expect(response).toEqual(mockResponse);
				expect(mockSubmitAuthForm).toHaveBeenCalledTimes(1);
			});
		});

		it("should post sign up form details", async () => {
			mockResponse = { data: { message: "Account successfully created" } };
			axios.post.mockResolvedValue(mockResponse);

			const response = await submitAuthForm(
				{
					firstName: registerData.firstName,
					lastName: registerData.lastName,
					email: registerData.email,
					password: registerData.password,
				},
				"/sign-up"
			);
			await waitFor(() => {
				expect(response).toEqual(mockResponse);
				expect(mockSubmitAuthForm).toHaveBeenCalledTimes(1);
      });
      
    });
    
    it("should update profile details", async () => { 
      mockResponse = { data: { message: "Account bio updated." } };
      const mockId = "123";
      const mockJwtToken = "mock.jwt";
      const profileUpdate = {
        profilePicture: "image.jpg",
        bio: "Hi my name is Amy",
        newPassword: "newPassword123!",
        oldPassword: "oldPassword123!",
      };
      axios.put.mockResolvedValue(mockResponse);
      
      const response = await submitProfileUpdate(profileUpdate, mockId, mockJwtToken);

      expect(response).toEqual(mockResponse);
      expect(mockSubmitProfileUpdate).toHaveBeenCalledTimes(1);
    });
    
    it("should throw error if details invalid", async () => { 
      mockResponse = { data: { message: "Account bio updated." } };
      const mockId = "123";
      const mockJwtToken = "mock.jwt";
      const profileUpdate = {
				profilePicture: "image.jpg",
				bio: "Hi my name is Amy",
				newPassword: "oldPassword123!",
				oldPassword: "oldPassword123!",
			};
      axios.put.mockRejectedValue(mockResponse);

      try {
				await submitProfileUpdate(profileUpdate, mockId, mockJwtToken);
			} catch (e) {
				expect(e.response.data.message).toBe(
					mockResponse.data.message
				);
				expect(e.response.status).toBe(404);
				expect(mockGetUser).toHaveBeenCalledTimes(1);
			}
    });
	});
});
