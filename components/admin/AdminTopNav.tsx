import { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { io } from "socket.io-client";

const AdminTopNav = () => {
	// const socket = io("http://127.0.0.1:8000/notif_socket/");

	const router = useRouter();
	const onLogout = () => {
		localStorage.clear();
		router.push("/");
	};

	// useEffect(() => {
	// 	console.log("This is the socket: ", socket);
	// 	socket.on("connect", () => {
	// 		console.log(`Connected to socket ${socket.id}`);
	// 	});
	// 	return () => {
	// 		socket.disconnect();
	// 	};
	// }, []);

	// const handleClick = () => {
	// 	socket.emit("message", { data: "Hello from React" });
	// };

	return (
		<div className="w-full h-full shadow border-b border-gray-200 flex justify-between items-center px-10 font-mont text-gray-700">
			{/*  */}
			<div></div>
			{/*  */}
			<div className="flex items-center gap-x-5">
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className="p-3 rounded-full bg-purple-100"
								// onClick={handleClick}
							>
								<div className="flex items-center gap-x-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5 "
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
										/>
									</svg>
									{/* <svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="w-5 h-5 text-white"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
										/>
									</svg> */}
								</div>
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute z-10 mt-3 right-1 bg-white p-5 rounded-lg shadow border-b-200 w-96"></Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>

				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button className="p-3 rounded-full bg-purple-100">
								<Popover.Button className="flex items-center gap-x-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5 text-purple-60"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
										/>
									</svg>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-5 h-5 text-purple-60"
									>
										<path
											fillRule="evenodd"
											d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
											clipRule="evenodd"
										/>
									</svg>
								</Popover.Button>
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute z-10 mt-3 right-1 bg-white p-5 rounded-lg shadow border-b-200">
									<button
										onClick={onLogout}
										className="flex items-center gap-x-3 text-gray-400 hover:text-gray-700"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 text-current"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
											/>
										</svg>
										<p className="text-sm">Logout</p>
									</button>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
			</div>
			{/*  */}
		</div>
	);
};

export default AdminTopNav;
