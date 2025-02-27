import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/" className="navbarLink">
					<h1 className="navbar-brand m-1">ContactAPI by dualss <i class="bi bi-journal-text"></i></h1>
				</Link>
			</div>
		</nav>
	);
};