// src/Pages/SearchResultPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import petApi from "../api/petApi";
import PetList from "../components/PetList";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const name = searchParams.get("name");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const data = await petApi.searchByName(name);
        setResults(Array.isArray(data) ? data : []); 
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
      setLoading(false);
    };

    if (name) fetchSearchResults();
  }, [name]);

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Kết quả tìm kiếm cho: &quot;{name}&quot;
      </h2>
      {loading ? (
        <p className="text-gray-500">Đang tìm kiếm...</p>
      ) : results.length > 0 ? (
        <PetList pets={results} />
      ) : (
        <p className="text-red-500">Không tìm thấy thú cưng nào phù hợp.</p>
      )}
    </div>
  );
};

export default SearchResultPage;
