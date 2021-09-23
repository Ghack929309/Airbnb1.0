import Image from "next/image";
import {
	SearchIcon,
	GlobeAltIcon,
	MenuIcon,
	UserCircleIcon,
	UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

export const Header = ({ placeholder }) => {
	const [search, setSearch] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [guests, setGuests] = useState(1);
	const router = useRouter();

	const selectedRange = {
		startDate: startDate,
		endDate: endDate,
		key: "selection",
	};

	const handleSelect = (ranges) => {
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};

	const resetInput = () => {
		setSearch("");
	};

	const searchClick = () => {
		router.push({
			pathname: "/search",
			query: {
				location: search,
				startDate: startDate.toISOString(),
				enDate: endDate.toISOString(),
				guests: guests,
			},
		});
	};

	return (
		<header className="sticky h-20 top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-20">
			{/* left section */}
			<div
				onClick={() => router.push("/")}
				className="relative flex items-center  h-10 cursor-pointer my-auto"
			>
				<Image
					src="https://links.papareact.com/qd3"
					layout="fill"
					objectFit="contain"
					objectPosition="left"
				/>
			</div>

			{/* //middle section */}
			<div className="flex items-center md:border-2 rounded-full py-2 md: shadow-sm ">
				<input
					className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 
                    placeholder-gray-400
                    "
					type="text"
					placeholder={placeholder || "Start your search"}
					value={search}
					onChange={({ target }) => setSearch(target.value)}
				/>
				<SearchIcon
					className="hidden md:inline-flex h-8
                 bg-red-400 text-white
                  rounded-full p-2 cursor-pointer
                  md:mx-2
                  "
				/>
			</div>
			{/* //right section */}
			<div className="flex items-center space-x-4 justify-end text-gray-500 ">
				<p className="hidden md:inline cursor-pointer">Become a host</p>
				<GlobeAltIcon className="h-6" />
				<div
					className="flex items-center space-x-2 border-2 p-2 
				rounded-full "
				>
					<MenuIcon className="h-6 " />
					<UserCircleIcon className="h-6" />
				</div>
			</div>
			{search && (
				<div className="flex flex-col col-span-3 mx-auto">
					<DateRangePicker
						ranges={[selectedRange]}
						minDate={new Date()}
						rangeColors={["#FD5B61"]}
						onChange={handleSelect}
					/>
					<div className="flex items-center border-b mb-4 bg-white">
						<h2 className="text-2xl flex-grow font-semibold">
							Number of Guests
						</h2>
						<UsersIcon className="h-5" />
						<input
							type="number"
							min={1}
							onChange={({ target }) => setGuests(target.value)}
							value={guests}
							className="w-12 pl-2 text-lg outline-none text-red-400 border-2"
						/>
					</div>
					<div className="flex bg-white pt-0">
						<button onClick={resetInput} className="flex-grow text-gray-500">
							Cancel
						</button>
						<button onClick={searchClick} className="flex-grow text-red-400">
							{" "}
							search
						</button>
					</div>
				</div>
			)}
		</header>
	);
};
