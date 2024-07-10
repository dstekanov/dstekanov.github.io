import React from 'react';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4">My Projects Portfolio</h1>
          <p className="text-xl">Explore my journey through code and creativity</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <ProjectCard
            title="Tic-Tac-Toe Game"
            description="A classic game with an unbeatable AI opponent. Test your skills against the machine!"
            link="https://dstekanov.github.io/tictactoe-project"
            linkText="Play Tic-Tac-Toe"
            icon="🎮"
          />
          {/* Add more ProjectCard components here for other projects */}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ title, description, link, linkText, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <div className="p-6">
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <a 
          href={link} 
          className="inline-block bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition duration-300"
        >
          {linkText}
        </a>
      </div>
    </div>
  );
}

export default HomePage;