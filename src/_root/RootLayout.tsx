
import Navbar from '../components/all/Navbar';
import Home from './page/Home';
import PhatNguoi from './page/PhatNguoi';

import { Outlet } from 'react-router-dom';
const RootLayout = () => {
  return (
    <main className="w-full h-screen flex flex-col bg-white">
      {/* Navbar */}
      <div className="w-full fixed top-0 left-0">
        <Navbar />
      </div>

      {/* Dynamic content for child routes */}
      <div className="w-full flex-grow pt-[4rem]"> {/* Added padding to account for Navbar height */}
        <Home/>
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
