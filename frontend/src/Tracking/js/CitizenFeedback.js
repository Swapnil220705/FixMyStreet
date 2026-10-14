import React, { useState } from 'react';
import '../css/CitizenFeedback.css';

const CitizenFeedback = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    setError(null);
    if (onSubmit) {
      onSubmit({ comment, rating });
    }
    setComment('');
    setRating(0);
  };

  return (
    <div className="citizen-feedback">
      <h3>Submit Your Feedback</h3>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="comment">Your Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your feedback here..."
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Rate the Resolution</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'selected' : ''}`}
                onClick={() => handleRatingChange(star)}
              >
                {String.fromCharCode(9733)}
              </span>
            ))}
          </div>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="btn-primary">Submit Feedback</button>
      </form>
    </div>
  );
};

export default CitizenFeedback;
