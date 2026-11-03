import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition.jsx';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch image URLs from the JSON file
  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await fetch('/vik-pickle-tattoo/src/assets/image-urls.json'); // Adjust the path if necessary
        if (!response.ok) {
          throw new Error('Failed to fetch image URLs');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchImageUrls();
  }, []);

  return (
    <PageTransition>
      <div className="bg-ink pt-40 pb-24 px-6 text-center">
        <h1 className="font-display text-5xl md:text-6xl text-cream leading-tight">
          Recent work
        </h1>
        <p className="mt-6 text-cream/50 font-body max-w-xl mx-auto text-sm">
          A selection of tattoos, see more on Instagram — follow{' '}
          <a
            href="https://www.instagram.com/vik_pickle/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light transition-colors"
          >
            @vik_pickle
          </a>{' '}
          for more
        </p>
      </div>

      <section className="bg-cream py-20 px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="object-cover w-full h-full cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox/Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full"
          />
        </div>
      )}
    </PageTransition>
  );
}