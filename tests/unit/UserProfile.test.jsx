import {
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import UserProfile from "../../src/pages/UserProfile.jsx";
import * as AuthUserService from "../../src/services/AuthUserService.js";

describe("User Profile Tests", () => {
	describe("User Profile Service", () => {
		let mockUserService;
		let mockId;
		let mockJwtToken;
		let editProfileButton;
		vi.mock("../../src/services/AuthUserService.js");
		beforeEach(async () => {
			AuthUserService.loggedIn.mockReturnValue(true);
			mockId = "123";
			mockJwtToken = "mock.jwt.token";
			await waitFor(() => {
				render(
					<MemoryRouter initialEntries={[`/members/${mockId}`]}>
						<Routes>
							<Route
								path="/members/:id"
								element={<UserProfile id={mockId} token={mockJwtToken} />}
								/>
						</Routes>
					</MemoryRouter>
				);
			});
			mockUserService = vi.spyOn(AuthUserService, "getUser");
			editProfileButton = await screen.findByText(/edit profile/i);
			vi.mock("../../src/services/AuthUserService.js");
		});
		afterEach(() => {
			vi.clearAllMocks();
		});

		it("collects the user's profile based on id", async () => {
			const user = {
				firstName: "Tania",
				lastName: "Lace",
				joined: "26/06/2024",
				bio: "Some bio here...",
				profilePicture: "/assets/images/avatar.png",
				reviews: [],
				watchlist: [],
			};
			mockUserService.mockResolvedValueOnce({ data: user });
			const result = await AuthUserService.getUser(mockId, mockJwtToken);
			expect(result.data).toEqual(user);
		});

		it("collects the user's watchlist", async () => {
			const user = {
				firstName: "Tania",
				lastName: "Lace",
				joined: "26/06/2024",
			};
			const userWatchlist = [
				{
					_id: "667e0058f50861336e3aa373",
					dramaId: 246331,
					title: "Su Ji and U Ri",
					year: 2024,
					voteAverage: 6.3,
					voteCount: 3,
					image: "/bGVdZ8nc99GIwCDxmXpGP0oCSzT.jpg",
					synopsis:
						"A healing romance begins between fallen star doctor Jin Su Ji and stubborn newbie doctor Choi U Ri.",
					genreIds: [10751, 18],
					reviews: [],
					cast: [],
					__v: 0,
				},
				{
					_id: "667e0058f50861336e3aa374",
					dramaId: 248155,
					title: "The Brave Yong Soo-jung",
					year: 2024,
					voteAverage: 8.5,
					voteCount: 2,
					image: "/v0Ld4z1pn61Ojb6ujfsyTZoFNPV.jpg",
					synopsis:
						"An ingenuous home-shopping host Su Jeong dreams of becoming a successful businesswoman who wins people before money. After losing her parents as a kid, she travels around the country with tinker Jang Won and grows up as a strong woman full of courage. She may look fierce on the outside, but in fact, she is a softhearted, clumsy crybaby and a dork who cannot even make eye contact with her crush, Joo Woo Jin. Meanwhile, there is Yeo Eui Ju, a man who gets on her nerves by loafing around her. As a soldier, he is more logical rather than empathetic, but he passes out whenever he gets drunk. He loses his face after meeting Su Jeong, who drinks like a fish, but he starts to fall for her. By a twist of fate, he realizes he is the second grandson of Masung Group, and his older brother is Su Jeong's crush, Woo Jin.",
					genreIds: [18],
					reviews: [],
					cast: [],
					__v: 0,
				},
			];
			mockUserService.mockResolvedValueOnce({
				data: user,
				watchlist: userWatchlist,
			});
			const result = await AuthUserService.getUser(mockId, mockJwtToken);
			expect(result.watchlist).toEqual(userWatchlist);
    });
    
		it("collects the user's list of reviews", async () => {
			const user = {
				firstName: "Tania",
				lastName: "Lace",
				joined: "26/06/2024",
				bio: "Some bio here...",
				profilePicture: "/assets/images/avatar.png",
        reviews: [{dramaId: 246331, title: "Amazzing", review: "Great drama!"}],
				watchlist: [],
			};
			mockUserService.mockResolvedValueOnce({
				data: user,
			});
			const result = await AuthUserService.getUser(mockId, mockJwtToken);
			expect(result.data.reviews).toEqual(user.reviews);
    });
    
		it("should have an 'Edit Profile' button", async () => { 
			AuthUserService.loggedIn.mockReturnValue(true);
      const editProfileButton = await screen.findByText(/edit profile/i);
      expect(editProfileButton).toBeInTheDocument();
    });
	});
});
