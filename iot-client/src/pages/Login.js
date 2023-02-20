import React from "react";

function Login() {
	return (
		<div className="card">
			<div className="card-body">
				<h5 className="card-title text-center">Login</h5>
				<form>
					<div className="form-group">
						<label htmlFor="id">ID</label>
						<input
							type="text"
							className="form-control"
							id="id"
							placeholder="Enter ID"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="Enter Email"
						/>
					</div>
					<button type="submit" className="btn btn-primary btn-block">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
