import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faBars,
  faTimes,
  faGear,
  faHome,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, NavLink } from 'react-router-dom';
import LogoImage from '../assets/logoImage.jpg';

export default function Header({ name, role, image, type, menuOpen, setMenuOpen }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const guestTypes = [
    'Home',
    'LoginClub',
    'LoginStudent',
    'RegisterClub',
    'RegisterStudent',
    'EventDashboard'
  ];

  const guestLinks = [
    { label: 'Home', href: '#Home' },
    { label: 'Events', href: '#Events' },
    { label: 'About Us', href: '#Footer' },
    { label: 'Feedback', href: '#Feedback' },
    { label: 'Event Dashboard', href: '/EventDashboard' }
  ];

  const studentClubLinks = [
    { icon: faHome, label: 'Home', href: '/Home' },
    { icon: faRightFromBracket, label: 'LogOut', href: '#' }
  ];

  const LoginRegisterLinks = [
    { label: 'Home', href: '/Home' },
    { label: 'Event Dashboard', href: '/EventDashboard' }
  ];

  const linksToShow =
    role === 'Student' || role === 'Club'
      ? studentClubLinks
      : type === 'Home'
      ? guestLinks
      : LoginRegisterLinks;

  return (
    <nav className="bg-white shadow-md w-full z-50 relative">
      <div className="w-11/12 mx-auto px-2 md:px-4">
        <div className="flex justify-between items-center h-16">
    
          <div className="flex-shrink-0 w-1/5">
            <img src={LogoImage} alt="Logo" className="w-24 md:w-30" />
          </div>

          <div
            className={`hidden md:flex items-center justify-between w-full`}
          >
            <div
              className={`flex ${
                role === 'Student' || role === 'Club'
                  ? 'w-10/20 ml-10 space-x-10 md:space-x-40'
                  : 'w-1/2 space-x-10 lg:space-x-12'
              }`}
            >
              {linksToShow.map((link, idx) => (
                <div key={idx}>
                  {role === 'Student' || role === 'Club' ? (
                    <NavLink
                      to={link.href}
                      className="headerLink font-medium text-black hover:text-blue-600 flex items-center"
                    >
                      {link.icon && (
                        <FontAwesomeIcon icon={link.icon} className="mr-2" />
                      )}
                      {link.label}
                    </NavLink>
                  ) : (
                    <a
                      href={link.href}
                      className="headerLink font-medium text-black hover:text-blue-600"
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div
              className="hidden md:flex items-center relative mx-4 flex-1 max-w-md w-1/5"
              style={{ minWidth: '240px' }}
            >
              <input
                type="text"
                placeholder="Search Content"
                className="w-3/4 h-3/4 border border-gray-400 rounded-2xl pl-10 pr-4 py-2 text-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
              />
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>

            {role === '' ? (
              <>
                {type === 'Home' && (
                  <div className="flex space-x-6">
                    <button
                      className="bg-skyblue text-white px-5 py-2 rounded-2xl"
                      onClick={() => {
                        handleNavigation('/LoginClub');
                      }}
                    >
                      Clubs
                    </button>
                    <button
                      className="bg-skyblue text-white px-5 py-2 rounded-2xl"
                      onClick={() => {
                        handleNavigation('/LoginStudent');
                      }}
                    >
                      Students
                    </button>
                  </div>
                )}
                {type === 'EventDashboard' && (
                  <div className="flex space-x-6">
                    <button
                      className="bg-skyblue text-white px-5 py-2 rounded-2xl"
                      onClick={() => {
                        handleNavigation('/LoginClub');
                      }}
                    >
                      Clubs
                    </button>
                    <button
                      className="bg-skyblue text-white px-5 py-2 rounded-2xl"
                      onClick={() => {
                        handleNavigation('/LoginStudent');
                      }}
                    >
                      Students
                    </button>
                  </div>
                )}
                {(type === 'LoginClub' || type === 'RegisterClub') && (
                  <div className="flex space-x-6">
                    <button
                      className="bg-skyblue text-white px-5 py-2 rounded-2xl"
                      onClick={() => {
                        handleNavigation('/LoginStudent');
                      }}
                    >
                      Login as Student
                    </button>
                  </div>
                )}
                {(type === 'LoginStudent' || type === 'RegisterStudent') && (
                  <div className="flex space-x-6">
                    <button
                      className="bg-skyblue text-white px-5 py-2 rounded-2xl"
                      onClick={() => {
                        handleNavigation('/LoginClub');
                      }}
                    >
                      Login as Club
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex space-x-4 items-center">
                <button className="hidden md:flex text-black text-2xl ps-2 pe-4 rounded-2xl">
                  <FontAwesomeIcon icon={faGear} />
                </button>
                <div className="flex space-x-4 items-center">
                  <a href="/Clubprofile">
                    <img
                      src={image}
                      alt="Profile"
                      className="w-10 h-10 md:w-13 md:h-13 rounded-full border"
                    />
                  </a>
                  <div className="text-left">
                    <p className="text-sm">Hello!</p>
                    <p className="font-semibold text-sm md:text-base">{name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center justify-end">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
          </div>
        </div>
      </div>

      {menuOpen &&
        guestTypes.includes(type) && (
          <div className="fixed inset-0 bg-black/50 z-40">
            <div className="absolute min-h-screen w-4/5 sm:w-1/2 bg-white border border-gray-300 shadow-md">
              <div className="flex items-center justify-between w-full p-4 border-b border-gray-300">
                <img
                  src={LogoImage}
                  alt="Logo"
                  className="w-24 h-auto object-contain"
                />
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-gray-700 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
              </div>

              <div className="px-4 pt-4 pb-6 space-y-6">
                {linksToShow.map((link, idx) => (
                  <div
                    key={idx}
                    className="hover:bg-blue-600 hover:text-white p-2 rounded-lg transition-all"
                  >
                    <a
                      href={link.href}
                      className="block font-medium"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </div>
                ))}

                {role === '' && (
                  <>
                    <div className="hover:bg-blue-600 hover:text-white p-2 rounded-lg transition-all">
                      <a
                        href="/LoginClub"
                        className="block font-medium"
                        onClick={() => setMenuOpen(false)}
                      >
                        Login as Club
                      </a>
                    </div>
                    <div className="hover:bg-blue-600 hover:text-white p-2 rounded-lg transition-all">
                      <a
                        href="/LoginStudent"
                        className="block font-medium"
                        onClick={() => setMenuOpen(false)}
                      >
                        Login as Student
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
    </nav>
  );
}
