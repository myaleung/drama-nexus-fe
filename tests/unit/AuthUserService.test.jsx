import axios from "axios";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import * as AuthUserService from "../../src/services/AuthUserService.js";
import { getUser } from "../../src/services/AuthUserService.js";
import userProfile from "../../../backend/src/models/UserProfile.model.js";

describe("Auth User Service", () => {
	describe("Get user", async () => {
		let mockError;
		let mockResponse;
		let mockUserId;
		let mockGetUser;
		const mockJwtToken = "mock.jwt.token";
		beforeEach(async () => {
			mockResponse = {
				userProfile: {
					_id: "12345",
					user: "9876a",
					profilePicture: "image.jpg",
					bio: "Hi my name is Amy",
					watchlist: [],
					reviews: [],
				},
				status: 200,
			};
			mockError = {
				response: {
					data: {
						message: "User not found",
					},
					status: 404,
				},
			};
			vi.mock('axios');
			mockGetUser = vi.spyOn(AuthUserService, "getUser");
		});
		afterEach(() => {
			vi.clearAllMocks();
			mockResponse = null;
		});

		it("should return a user profile on send", async () => {
			mockUserId = "12345";
			axios.get.mockResolvedValue(mockResponse);

			const response = await getUser(mockUserId, mockJwtToken);
			await waitFor(() => {
				expect(response).toEqual(mockResponse);
			});
		});
		
		it("should handle error when the request fails", async () => {
			mockUserId = "nonexistent";
			mockGetUser.mockRejectedValue(mockError);

			await expect(getUser(mockUserId, mockJwtToken)).rejects.toEqual(mockError);
			try {
				await getUser(mockUserId, mockJwtToken);
			} catch (e) {
				expect(e.response.data.message).toBe(mockError.response.data.message);
				expect(e.response.status).toBe(404);
				expect(mockGetUser).toHaveBeenCalledTimes(2);
			}
		});
	});
});
