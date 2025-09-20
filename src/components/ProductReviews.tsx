'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, User, Calendar } from 'lucide-react';
import { apiService, Review } from '@/services/apiService';

interface ProductReviewsProps {
  productId: number;
  className?: string;
}

export default function ProductReviews({ productId, className = '' }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const data = await apiService.getProductReviews(productId);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-400'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={`glass-card ios-rounded-2xl p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b border-gray-700 pb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                </div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={`glass-card ios-rounded-2xl p-6 ${className}`}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Star size={20} className="text-yellow-400" />
          <span>Customer Reviews</span>
        </h3>
        <p className="text-gray-400 text-center py-8">
          No reviews yet for this product. Be the first to review!
        </p>
      </div>
    );
  }

  return (
    <div className={`glass-card ios-rounded-2xl p-6 ${className}`}>
      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
        <Star size={20} className="text-yellow-400" />
        <span>Customer Reviews ({reviews.length})</span>
      </h3>
      
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-gray-700 pb-6 last:border-b-0"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">
                      User {review.userId}
                    </span>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Calendar size={14} />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
