import { useState } from 'react';
import ImageUpload from './image-upload';


interface SearchProps {
  onSearchResults: (results: ImageData[]) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [dimensionsFilter, setDimensionsFilter] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('query', query);
    formData.append('name', nameFilter);
    formData.append('dimensions', dimensionsFilter);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      onSearchResults(data.images);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg mb-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images..."
          className="w-full p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Filter by name"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Dimensions</label>
          <input
            type="text"
            value={dimensionsFilter}
            onChange={(e) => setDimensionsFilter(e.target.value)}
            placeholder="Filter by dimensions"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Image Search</label>
          <div className="flex items-center">
            {/* <label
              htmlFor="file-upload"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer transition-colors"
            >
              {imageFile ? imageFile.name : "Choose Image"}
            </label> */}
            {/* <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            /> */}
            <ImageUpload onSelect={setImageFile}/>
            {/* {imageFile && (
              <button
                onClick={() => setImageFile(null)}
                className="ml-2 text-red-500 hover:text-red-600 transition-colors"
              >
                Clear
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
