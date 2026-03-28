import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaFilter, FaMapMarkerAlt, FaSearch, FaSortAmountDown, FaTimes } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';

const normalizeText = (value) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const TuitionList = () => {
  const axiosInstance = useAxios();
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

const {
  data: tuition = [],
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ['tuitionlist'],
  queryFn: async () => {
    const res = await axiosInstance.get('/tuitionlist');
    return res.data;
  },
  staleTime: 5 * 60 * 1000,
});

const districts = useMemo(() => {
  const unique = [
    ...new Set(
      tuition
        .map((item) => item.tuitionDistrict || item.district)
        .filter(Boolean)
    ),
  ];
  return unique.sort((a, b) => a.localeCompare(b));
}, [tuition]);

const filteredTuitions = useMemo(() => {
  const term = normalizeText(search);

  const filtered = tuition.filter((item) => {
    const searchableValues = [
      item.NameOfclass,
      item.nameOfclass,
      item.subjectName,
      item.subject,
      item.tuitionDistrict,
      item.district,
      item.tuitionRegion,
      item.region,
      item.studentName,
      item.studentEmail,
      item.budget,
    ];

    const matchSearch =
      !term ||
      searchableValues.some((value) => normalizeText(value).includes(term));

    const districtValue = item.tuitionDistrict || item.district;
    const matchDistrict = selectedDistrict === 'all' || districtValue === selectedDistrict;

    return matchSearch && matchDistrict;
  });

  return filtered.sort((a, b) => {
    if (sortBy === 'budget-high') {
      return Number(b.budget || 0) - Number(a.budget || 0);
    }
    if (sortBy === 'budget-low') {
      return Number(a.budget || 0) - Number(b.budget || 0);
    }
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });
}, [tuition, search, selectedDistrict, sortBy]);

const hasActiveFilters =
  normalizeText(search).length > 0 ||
  selectedDistrict !== 'all' ||
  sortBy !== 'newest';

if (isLoading) {
  return <div className="text-center mt-10">Loading tuition posts...</div>;
}

if (isError) {
  return (
    <div className="text-center mt-10 text-red-500">
      {error?.response?.data?.message || 'Failed to load tuition list'}
    </div>
  );
}

    return (
      <div className="min-h-screen bg-base-100 p-4 text-base-content transition-colors duration-300">
        <div className="w-9/12 mx-auto py-10">
          <h1 className="text-center font-bold text-4xl">All Tuition Posts</h1>
          <p className="text-center opacity-70 mt-3 mb-8">
            Browse available tuition opportunities across all regions.
          </p>

          <div className="rounded-3xl border border-base-content/10 bg-linear-to-r from-base-200 to-base-300/40 p-4 md:p-6 mb-8 shadow-lg">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide opacity-75 mb-4">
              <FaFilter className="text-primary" />
              <span>Search and Filters</span>
            </div>

            <div className="grid lg:grid-cols-12 gap-3">
              <label className="input input-bordered flex items-center gap-2 lg:col-span-6 bg-base-100/80">
                <FaSearch className="opacity-60" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search class, subject, district, student"
                  className="grow"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="btn btn-ghost btn-xs"
                    aria-label="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}
              </label>

              <label className="select select-bordered flex items-center gap-2 lg:col-span-3 bg-base-100/80">
                <FaMapMarkerAlt className="opacity-60" />
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full"
                >
                  <option value="all">All Districts</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </label>

              <label className="select select-bordered flex items-center gap-2 lg:col-span-3 bg-base-100/80">
                <FaSortAmountDown className="opacity-60" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full"
                >
                  <option value="newest">Newest First</option>
                  <option value="budget-high">Budget High to Low</option>
                  <option value="budget-low">Budget Low to High</option>
                </select>
              </label>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-4">
              <p className="text-sm opacity-75">
                Showing <span className="font-semibold text-primary">{filteredTuitions.length}</span> of <span className="font-semibold">{tuition.length}</span> tuition posts
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedDistrict('all');
                  setSortBy('newest');
                }}
                className="btn btn-outline btn-sm"
                disabled={!hasActiveFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {filteredTuitions.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-base-200 border border-base-content/10">
              <h2 className="text-2xl font-semibold mb-2">No tuition found</h2>
              <p className="opacity-70">Try changing your search or filter options.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 justify-items-center">
              {filteredTuitions.map((item) => (
                
                <div
                  key={item._id}
                  className="w-full max-w-2xl rounded-2xl shadow-lg bg-base-200 my-2 border border-base-content/10"
                >
                  <div className="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex text-lg">
                        <h3 className="font-semibold pr-2">Class:</h3>
                        <p>{item.NameOfclass || item.nameOfclass || 'N/A'}</p>
                      </div>
                      <div className="flex text-lg">
                        <h3 className="font-semibold pr-2">Subject:</h3>
                        <p>{item.subjectName || item.subject || 'N/A'}</p>
                      </div>
                      <div className="flex text-lg">
                        <h3 className="font-semibold pr-2">District:</h3>
                        <p>{item.tuitionDistrict || item.district || 'N/A'}</p>
                      </div>
                      <div className="flex text-lg">
                        <h3 className="font-semibold pr-2">Budget:</h3>
                        <p>{item.budget ? `৳${item.budget}` : 'N/A'}</p>
                      </div>
                    </div>

                    <div>
                      <Link
                        to={`/tuition-details/${item._id}`}
                        className="btn btn-primary"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
};

export default TuitionList;