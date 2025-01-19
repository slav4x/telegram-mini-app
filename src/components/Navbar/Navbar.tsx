import { NavLink } from 'react-router';

import styles from './Navbar.module.css';

export const Navbar = () => {
	return (
		<ul className={styles['navbar']}>
			<li>
				<NavLink className={({ isActive }) => (isActive ? styles['navbar-active'] : '')} to="/tasks">
					Tasks
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? styles['navbar-active'] : '')} to="/">
					Earn
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? styles['navbar-active'] : '')} to="/boost">
					Boost
				</NavLink>
			</li>
			<li>
				<NavLink className={({ isActive }) => (isActive ? styles['navbar-active'] : '')} to="/fame">
					Fame
				</NavLink>
			</li>
		</ul>
	);
};
