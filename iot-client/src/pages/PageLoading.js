import React from "react";
import ReactLoading from "react-loading";

function PageLoading() {
	return (
		<div className=" container-fluid d-flex flex-column justify-content-center align-content-center">
			<ReactLoading
				type={"cylon"}
				color={"5A5858"}
				height={100}
				width={100}
				className=" container-fluid d-flex flex-column justify-content-center align-content-center"
			/>
		</div>
	);
}

export default PageLoading;
