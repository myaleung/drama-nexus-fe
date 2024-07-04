import axios from "axios";
import {
	waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as DramaService from "../../src/services/DramaService.js";
import testDramaData from "../data/testDramaData.js";

describe("DramaService", () => { 
	describe("Get dramas", async () => {
		let mockError;
		let mockResponse;
		let mockGetDramas;
		let mockGetDrama;
		beforeEach(async () => {
			mockError = {
				response: {
					data: {
						message: "Drama not found",
					},
					status: 404,
				},
			};
			vi.mock("axios");
			mockGetDramas = vi.spyOn(DramaService, "getDramas");
			mockGetDrama = vi.spyOn(DramaService, "getDrama");
		});
		afterEach(() => {
			vi.clearAllMocks();
			mockResponse = null;
			mockError = null;
		});
		
		it("should return all dramas", async () => {
			mockResponse = { data: testDramaData.results };
			axios.get.mockResolvedValue(mockResponse);

			const response = await DramaService.getDramas();
			await waitFor(() => {
				expect(response).toEqual(testDramaData.results);
			});
		});

		it("should handle error when the request fails", async () => {
			mockGetDramas.mockRejectedValue(mockError);

			await expect(DramaService.getDramas()).rejects.toEqual(mockError);
			try {
				await DramaService.getDramas();
			} catch (e) {
				expect(e.response.data.message).toBe(mockError.response.data.message);
				expect(e.response.status).toBe(404);
				expect(mockGetDramas).toHaveBeenCalledTimes(2);
			}
		});

		it("should return a queried drama", async () => {
			const mockId = "12345";
			mockResponse = { data: testDramaData.mockDrama };
			axios.get.mockResolvedValue(mockResponse);

			const response = await DramaService.getDrama(mockId);
			await waitFor(() => {
				expect(response).toEqual(testDramaData.mockDrama);
			});
		});

		it("should handle error when the request fails", async () => {
			const mockId = "12346";
			mockGetDrama.mockRejectedValue(mockError);

			await expect(DramaService.getDrama(mockId)).rejects.toEqual(mockError);
			try {
				await DramaService.getDrama(mockId);
			} catch (e) {
				expect(e.response.data.message).toBe(mockError.response.data.message);
				expect(e.response.status).toBe(404);
				expect(mockGetDrama).toHaveBeenCalledTimes(2);
			}
		});
	});
});