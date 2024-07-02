const LoadingStub = () => {
	return (
		<div className="flex flex-col w-full h-60justify-center items-center bg-gray-300 px-5 py-10">
			<div className="lds-spinner">
				{Array.from({ length: 12 }).map((_, index) => (
					<div key={index}></div>
				))}
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

export default LoadingStub;
