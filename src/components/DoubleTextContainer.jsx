const DoubleTextContainer = ({ title, text1, text2 }) => {
  return (
		<>
			<div className="grid grid-cols-subgrid col-span-12">
				<div className="col-span-12">
					<h3>{title}</h3>
				</div>
				<div className="col-span-12 md:col-span-6">{text1}</div>
				<div className="col-span-12 md:col-span-6">{text2}</div>
			</div>
		</>
	);
}
export default DoubleTextContainer