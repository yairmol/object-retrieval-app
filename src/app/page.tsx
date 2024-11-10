'use client'

import ImageGallery from "@/components/image-gallery"
import SearchComponent from "@/components/search-form"
import { useState } from "react"

// import { useState } from 'react'
// import { SearchForm } from '@/components/search-form'
// import { ImageGallery, ImageItem } from '@/components/image-gallery'
// import { ObjectDetectionWidgetComponent } from '@/components/object-detection-widget'

// // Mock function to simulate API call
// async function searchImages(query: string, filters: any): Promise<ImageItem[]> {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 1000))

  
//   const mockImages: ImageItem[] = await fetch('/images_with_dets.json').then((response) => response.json())
//   // [
//   //   {
//   //     src: '/vercel.svg',
//   //     alt: 'Sample Image 1',
//   //     metadata: {
//   //       title: 'Beautiful Sunset',
//   //       description: 'A stunning sunset over the ocean',
//   //       date: '2023-06-15',
//   //       location: 'Malibu, California',
//   //       tags: ['sunset', 'ocean', 'beach']
//   //     }
//   //   },
//   //   {
//   //     src: '/vercel.svg',
//   //     alt: 'Sample Image 2',
//   //     metadata: {
//   //       title: 'Mountain Peak',
//   //       description: 'A snow-capped mountain peak',
//   //       date: '2023-07-22',
//   //       location: 'Swiss Alps',
//   //       tags: ['mountain', 'snow', 'nature']
//   //     }
//   //   },
//   // ]

//   // Filter images based on query and filters (this is a simple mock implementation)
//   return mockImages.filter(image => 
//     image.metadata.title.toLowerCase().includes(query.toLowerCase()) ||
//     image.metadata.description.toLowerCase().includes(query.toLowerCase()) ||
//     image.metadata.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
//   )
// }

// export default function ImageSearchPage() {
//   const [searchResults, setSearchResults] = useState<ImageItem[]>([])
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSearch = async (query: string, filters: any) => {
//     setIsLoading(true)
//     try {
//       const results = await searchImages(query, filters)
//       setSearchResults(results)
//     } catch (error) {
//       console.error('Error searching images:', error)
//       // Handle error (e.g., show error message to user)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900">Image Search</h1>
//         </div>
//       </header>
//       <main>
//         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           <SearchForm onSearch={handleSearch} />
//           {isLoading ? (
//             <div className="text-center">
//               <p className="text-xl font-semibold">Loading...</p>
//             </div>
//           ) : searchResults.length > 0 ? (
//             <ImageGallery images={searchResults} />
//           ) : (
//             <div className="text-center">
//               <p className="text-xl font-semibold">No results found. Try a different search.</p>
//             </div>
//           )}
//         </div>
//         {/* <ObjectDetectionWidgetComponent/> */}
//       </main>
//     </div>
//   )
// }

export default function GalleryPage() {
  const [images, setImages] = useState<ImageData[] | null>(null);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery with Detections</h1>
      <SearchComponent onSearchResults={(results) => {(setImages(results))}}/>
      {/* <ImageGalleryWithDetectionsComponent images={images} /> */}
      {images && <ImageGallery images={images} imagesPerPage={20}/>}
    </div>
  )
}