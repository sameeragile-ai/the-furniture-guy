import React from 'react';
import { Facebook, ExternalLink, Sparkles, Heart } from 'lucide-react';
import { siteConfig } from '../../config/site';

export const SocialProofGrid: React.FC = () => {
  const posts = [
    {
      image: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_2.49.33_PM_417e481f.jpeg',
      title: 'Showroom Showcase · Mirrored Suites & Fireplaces',
      tag: '@thefurnitureguy.co.uk',
      likes: '482',
    },
    {
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      title: 'Cheshire Residence · Crushed Diamond Fireplace Surround',
      tag: 'Customer Living Room',
      likes: '319',
    },
    {
      image: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_2.49.49_PM_417e481f.jpeg',
      title: 'Customer Homes & Showroom Collection',
      tag: 'King of Bling Official',
      likes: '624',
    },
    {
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      title: 'Mayfair Townhouse · Marble & Velvet 6-Seater Suite',
      tag: 'Styled by The Furniture Guy',
      likes: '512',
    },
  ];

  return (
    <section className="py-20 bg-[#FBF9F6] border-b border-[#EEE8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A27E] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Customer Spaces</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1F] tracking-tight">
              Styled in Real British Homes
            </h2>
          </div>

          <a
            href={siteConfig.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-semibold text-[#1C1B1F] bg-white border border-[#EEE8E1] hover:border-[#1877F2] hover:text-[#1877F2] px-4 py-2.5 rounded-full shadow-xs transition-colors"
          >
            <Facebook className="w-4 h-4 text-[#1877F2]" />
            <span>Join 12,000+ Followers on Facebook</span>
            <ExternalLink className="w-3 h-3 text-[#6B6670] group-hover:text-[#1877F2]" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group relative bg-white border border-[#EEE8E1] rounded-xs overflow-hidden shadow-xs hover:shadow-md transition-all"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#F5F5F7] relative">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-[#E8D3B9]">{post.tag}</span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-[#C2566B] text-[#C2566B]" /> {post.likes}
                    </span>
                  </div>
                  <p className="text-xs line-clamp-2">{post.title}</p>
                </div>
              </div>
              <div className="p-3 text-xs bg-white flex items-center justify-between border-t border-[#EEE8E1]">
                <span className="text-[#1C1B1F] font-medium truncate max-w-[190px]">
                  {post.title}
                </span>
                <span className="text-[10px] text-[#6B6670] font-sans">#KingOfBling</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
