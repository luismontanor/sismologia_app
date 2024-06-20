import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import Modal from './components/Modal';

function App() {
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/api/features?page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        setFeatures(data.data);
        setTotalPages(Math.ceil(data.meta.total / data.meta.per_page));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [currentPage]);

  const handleCardClick = (feature) => {
    setSelectedFeature(feature);
  };

  const handleCloseModal = () => {
    setSelectedFeature(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="App">
      <div className="flex flex-wrap justify-center">
        {features.map(feature => (
          <Card key={feature.id} feature={feature} onClick={handleCardClick} />
        ))}
      </div>
      <Modal feature={selectedFeature} onClose={handleCloseModal} />
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2">{currentPage} / {totalPages}</span>
        <button
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
