import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Add useLocation
import mainLogo from '../assets/Images/mainLogo.png';
import { useAuth } from '../Context/Auth';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Add this hook
    const user = useSelector(state => state.user?.data);
    const [pages] = useState(['/login', '/signup', '/forget_password']);
    const auth = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Sync login state with user data
    useEffect(() => {
        setIsLoggedIn(!!user?.token);
    }, [user?.token]);

    const handleLogout = () => {
        auth.logout();
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const { t } = useTranslation();

    // Check if current path should hide navbar
    const shouldHideNavbar = () => {
        // Hide for login, signup, etc.
        if (pages.some(page => location.pathname === page)) {
            return true;
        }

        // Hide only for `/exam/:courseId`
        const examPathPattern = /^\/exam\/[^/]+$/; // matches /exam/anything
        if (examPathPattern.test(location.pathname)) {
            return true;
        }

        return false;
    };

    return (
        <>
            {shouldHideNavbar() ? null : (
                <nav className="relative z-40 bg-white shadow-lg text-mainColor">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo on the left */}
                            <div className="flex-shrink-0">
                                <Link to="/">
                                    <img
                                        src={mainLogo}
                                        alt="Maths House Logo"
                                        className="object-contain w-auto h-12"
                                    />
                                </Link>
                            </div>

                            {/* User Profile and Actions - Desktop */}
                            <div className="flex items-center space-x-4">
                                {isLoggedIn && user ? (
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                                            {user.image_link && user.image !== "default.png" ? (
                                                <img
                                                    src={user.image_link}
                                                    alt={user.nick_name || user.f_name || 'User'}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <FaUser className="w-6 h-6 text-gray-600" />
                                            )}
                                        </div>
                                        <span className="text-sm font-medium">{user.nick_name || user.f_name || 'User'}</span>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-700 transition-colors duration-200 bg-red-100 rounded-lg hover:bg-red-200"
                                        >
                                            <LogOut size={16} />
                                            <span>Logout</span>
                                        </button>
                                    </div>

                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            to="/login"
                                            className="text-sm transition-colors duration-200 hover:text-secondColor"
                                        >
                                            {t('login')}
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="px-4 py-2 text-sm text-white transition duration-200 rounded-lg bg-secondColor hover:bg-opacity-90"
                                        >
                                            {t('signup')}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

export default Navbar;