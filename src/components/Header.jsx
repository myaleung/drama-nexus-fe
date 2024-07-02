import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "/assets/images/logo.png";
import { loggedIn } from "../services/AuthUserService";
import collectAvatar from "../utils/collectAvatar";

const Header = ({id, token, handleLogout}) => {
	const location = useLocation();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userAvatar, setUserAvatar] = useState("/assets/images/avatar.png");
	const navigation = [
		{ name: "Home", href: "/", current: true },
		{ name: "Explore", href: "/explore", current: false },
		{ name: "About Us", href: "/about-us", current: false },
	];

	navigation.forEach((item) => {
		if (location.pathname === item.href) {
			item.current = true;
		} else { 
			item.current = false;
		}
	});
	let userNavigation;
	let avatar;

	const loggedInUserNavigation = [
		{ name: "Profile", href: `/members/${id}` },
		{ name: "Watchlist", href: `/members/${id}/watchlist` },
		{ name: "Sign Out", onClick: () => handleLogout() },
	];
	const loggedOutUserNavigation = [{ name: "Login", href: "/login" }];

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	useEffect(() => {
		const result = loggedIn(token);
		const fetchAvatar = async () => {
			try {
				const avatar = await collectAvatar(id, token);
				return setUserAvatar(avatar);
			} catch (error) {
				console.error("Failed to fetch avatar:", error);
			}
		};
		setIsLoggedIn(result);
		fetchAvatar();
	}, [userNavigation]);
	
	if (isLoggedIn) {
		userNavigation = loggedInUserNavigation;
		avatar = userAvatar;
	} else {
		userNavigation = loggedOutUserNavigation;
		avatar = "/assets/images/avatar.png";
	}

	return (
		<>
			<header className="bg-teal-dark py-3 md:py-5">
				<Disclosure as="nav">
					{({ open }) => (
						<>
							<div className="container wrapper">
								<div className="order-3 sm:hidden col-span-2 flex justify-end">
									{/* Mobile menu button*/}
									<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-teal hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</DisclosureButton>
								</div>
								<div className="order-1 col-span-8 md:col-span-9 lg:col-span-10 flex flex-1 items-center sm:items-stretch justify-start">
									<div className="flex flex-shrink-0 items-center mr-8">
										<NavLink to="/" className="flex items-center">
											<img
												className="h-8 w-auto"
												src={logo}
												alt="Drama Nexus"
											/>
										</NavLink>
									</div>
									<div className="hidden sm:flex self-center space-x-4">
										{navigation.map((item) => (
											<NavLink
												key={item.name}
												to={item.href}
												className={classNames(
													item.current
														? "bg-gray-900 text-white"
														: "text-gray-300 hover:bg-teal hover:text-white",
													"rounded-md px-3 py-2 text-sm font-medium"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</NavLink>
										))}
									</div>
								</div>
								<div className="order-2 col-span-2 md:col-span-3 lg:col-span-2 flex justify-end sm:ml-6">
									{/* User Dropdown */}
									<Menu as="div" className="relative ml-3 self-center">
										<MenuButton className="relative flex rounded-full bg-teal border-0 text-sm focus:outline-none  focus:ring-offset-gray-800">
											<span className="absolute -inset-1.5" />
											<span className="sr-only">Open user menu</span>
											<img
												className="h-8 w-8 rounded-full"
												src={avatar}
												alt="Profile"
											/>
										</MenuButton>
										<MenuItems
											transition
											className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
										>
											{userNavigation.map((item) => (
												<MenuItem key={item.name}>
													{({ focus }) => (
														<NavLink
															to={item.href}
															onClick={item.onClick}
															className={classNames(
																focus ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-teal"
															)}
														>
															{item.name}
														</NavLink>
													)}
												</MenuItem>
											))}
										</MenuItems>
									</Menu>
								</div>
							</div>

							<DisclosurePanel className="sm:hidden">
								<div className="space-y-1 px-2 pb-3 pt-2">
									{navigation.map((item) => (
										<DisclosureButton
											key={item.name}
											as="a"
											href={item.href}
											className={classNames(
												item.current
													? "bg-gray-900 text-white"
													: "text-gray-300 hover:bg-teal hover:text-white",
												"block rounded-md px-3 py-2 text-base font-medium"
											)}
											aria-current={item.current ? "page" : undefined}
										>
											{item.name}
										</DisclosureButton>
									))}
								</div>
							</DisclosurePanel>
						</>
					)}
				</Disclosure>
			</header>
		</>
	);
};
export default Header;
