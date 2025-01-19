import { NavLink } from 'react-router';

import styles from './Header.module.css';

export const Header = () => {
	return (
		<div className={styles['header']}>
			<div className={styles['header-balance']}>0</div>
			<ul className={styles['header-nav']}>
				<li>
					<NavLink className={({ isActive }) => (isActive ? styles['daily-active'] : '')} to="/daily">
						Daily
					</NavLink>
				</li>
				<li className={styles['shop']}>
					<NavLink className={({ isActive }) => (isActive ? styles['shop-active'] : '')} to="/shop">
						Shop
					</NavLink>
				</li>
			</ul>
		</div>
	);
};
