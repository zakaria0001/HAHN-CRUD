import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">Job Board</Link>
          </h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/jobs/new" className="hover:underline">Post Job</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6">
        <Outlet />
      </main>

      <footer className="bg-blue-800 text-white text-center p-4">
        © {new Date().getFullYear()} Hahn JobBoard
      </footer>
    </div>
  );
}
