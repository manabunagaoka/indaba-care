// src/components/TestComponent.jsx
import React from 'react';

const TestComponent = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-coral-500 mb-4">Test Heading</h1>
      <p className="text-gray-700 mb-4">This is a test paragraph with Tailwind styling.</p>
      <button className="bg-coral-500 text-white px-4 py-2 rounded">Test Button</button>
    </div>
  );
};

export default TestComponent;