import { screen, render, waitFor } from "@testing-library/react";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, vi } from "vitest";

import Watchlist from "../../src/pages/Watchlist.jsx";
import DramaList from "../../src/components/DramaList.jsx";
import DramaMiniCard from "../../src/components/DramaMiniCard.jsx";
import * as AuthUserService from "../../src/services/AuthUserService.js";

describe("User Watchlist Tests", () => {
	describe("User Watchlist Service", () => {
		let mockUserService;
		let mockId;
		let mockJwtToken;
		let mockWatchlist;

		beforeEach(async () => {
			mockId = "123";
			mockJwtToken = "mock.jwt.token";
			mockUserService = vi.spyOn(AuthUserService, "getUser");
			mockWatchlist = [
				{ id: 1, title: "Drama 1", description: "Description 1" },
				{ id: 2, title: "Drama 2", description: "Description 2" },
			];
			await waitFor(() => {
				render(
					<MemoryRouter initialEntries={[`/members/${mockId}/watchlist`]}>
						<Routes>
							<Route
								path="/members/:id/watchlist"
								element={<Watchlist id={mockId} token={mockJwtToken} />}
							/>
						</Routes>
					</MemoryRouter>
				);
			});
		});
		afterEach(() => {
			vi.clearAllMocks();
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

    //? Needs to be an Integration test
		it.skip("displays the user's watchlist as mini drama cards", async () => {
			render(
				<Watchlist.Provider value={mockWatchlist}>
					<DramaList watchlist={mockWatchlist} />
				</Watchlist.Provider>
			);
			// const cards = screen.getByTestId("drama-mini-card");
			// expect(cards).toHaveLength(mockWatchlist.length);
			mockWatchlist.forEach((drama) => {
				expect(screen.getByText(drama.title)).toBeInTheDocument();
			});
		});

    //? Needs to be an Integration test
		it.skip("displays a default message if user's watchlist is empty", () => {
			const msg = screen.getByText("No dramas in your watchlist.");
			expect(msg).toBeInTheDocument();
		});
	});
});
