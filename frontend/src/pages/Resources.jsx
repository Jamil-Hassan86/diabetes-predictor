import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from "../components/Footer";

const Resources = () => {
  const location = useLocation();
  const ethnicity = new URLSearchParams(location.search).get('ethnicity');

  const resources = {
    'south-asian': [
      {
        description: 'Provides culturally sensitive health information and resources for the South Asian community.',
      },
      {
        description: 'Information and resources about diabetes for South Asians.',
      },
    ],
    'african': [
      {
        description: 'Dedicated to improving the health and wellness of Black women and girls.',
      },
      {
        description: 'Addresses tobacco-related health disparities in the African American community.',
      },
    ],
    'eastern-pacific': [
      {
        description: 'Works to improve the health and well-being of Asian Americans and Pacific Islanders.',
      },
      {
        description: 'Represents and advocates for the health interests of Asian and Pacific Islander communities.',
      },
    ],
  };

  const ethnicityResources = resources[ethnicity] || [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6 text-center">
        {ethnicity || 'General'} Resources
      </h1>
      {ethnicityResources.length > 0 ? (
        <ul>
          {ethnicityResources.map((resource, index) => (
            <li key={index} className="mb-4">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {resource.name}
              </a>
              <p>{resource.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No specific resources found for {ethnicity}. Please see general resources.</p>
      )}
      <Footer />
    </div>
  );
};

export default Resources;
