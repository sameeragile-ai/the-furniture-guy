import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const NotFoundPage: React.FC = () => {
  useDocumentTitle('404 Page Not Found | The Furniture Guy');

  return (
    <div className="pt-36 pb-32 bg-[#FBF9F6] text-center min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <div className="w-14 h-14 rounded-full bg-[#FAF6F0] border border-[#EEE8E1] flex items-center justify-center text-[#C9A27E] mx-auto mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A27E] font-semibold block mb-2">
          Page Not Located
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1B1F] mb-3">
          404 — Reflection Lost
        </h1>
        <p className="text-sm text-[#6B6670] mb-8 leading-relaxed">
          The page or product you are seeking may have moved or been retired from our showroom collection.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-luxe-gradient text-[#1C1B1F] text-xs font-semibold rounded-xs shadow-xs hover:opacity-95"
        >
          <span>Return to Showroom Shop</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
