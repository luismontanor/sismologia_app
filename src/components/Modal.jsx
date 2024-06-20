import React, { useState, useEffect } from 'react';

const Modal = ({ feature, onClose }) => {
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (feature) {
      fetch(`http://localhost:3000/api/features/${feature.id}/comments`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const extractedComments = data.map(item => item.data.attributes);
          setComments(extractedComments);
          setError(null);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
          setError('Error fetching comments');
        });
    }
  }, [feature]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/features/${feature.id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: { body: commentBody } }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(newComment => {
        setComments([...comments, newComment.data.attributes]);
        setCommentBody('');
        setError(null);
      })
      .catch(error => {
        console.error('Error posting comment:', error);
        setError('Error posting comment');
      });
  };

  if (!feature) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.attributes.title}</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Magnitude: {feature.attributes.magnitude}</p>
              <p className="text-sm text-gray-500">Place: {feature.attributes.place}</p>
              <p className="text-sm text-gray-500">Time: {new Date(feature.attributes.time).toLocaleString()}</p>
              <p className="text-sm text-gray-500">Tsunami: {feature.attributes.tsunami ? 'Yes' : 'No'}</p>
              <p className="text-sm text-gray-500">Mag Type: {feature.attributes.mag_type}</p>
              <p className="text-sm text-gray-500">Coordinates: {feature.attributes.coordinates.latitude}, {feature.attributes.coordinates.longitude}</p>
              <a href={feature.links.external_url} className="text-blue-500" target="_blank" rel="noopener noreferrer">More Info</a>
            </div>
            <div className="mt-4">
              <h4 className="text-lg leading-6 font-medium text-gray-900">Comments</h4>
              {error && <p className="text-red-500">{error}</p>}
              <ul className="mt-2">
                {comments.map((comment, index) => (
                  <li key={index} className="text-sm text-gray-500">{comment.body}</li>
                ))}
              </ul>
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  className="w-full p-2 border rounded"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  placeholder="Add a comment"
                  required
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
              </form>
            </div>
            <div className="mt-5 sm:mt-6">
              <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
