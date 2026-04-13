'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Kindred { _id: string; name: string; }

interface Props {
  kindreds: Kindred[];
  loadingKindreds: boolean;
  isSearching: boolean;
  searchError: string;
  existingFamily: any;
  setExistingFamily: (val: any) => void;
  setIsSearching: (val: boolean) => void;
  setSearchError: (val: string) => void;
  onCreateNew: () => void;
  onEditExisting: () => void;
  mode: 'idle' | 'create' | 'edit';
}

export default function KindredFamilySelector({
  kindreds, loadingKindreds, isSearching, searchError,
  existingFamily, setExistingFamily, setIsSearching,
  setSearchError, onCreateNew, onEditExisting, mode,
}: Props) {
  const { register, watch, setValue } = useFormContext();
  const kindredId = watch('kindredId');
  const familyName = watch('familyName');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!kindredId || !familyName) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsSearching(true);
      setSearchError('');
      setHasSearched(true);
      try {
        const res = await fetch(
          `/api/families?kindredId=${kindredId}&familyName=${familyName}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setExistingFamily(data || null);
      } catch (err) {
        if (controller.signal.aborted) return;
        setSearchError('Search failed. Please try again.');
        setExistingFamily(null);
      } finally {
        setIsSearching(false);
      }
    }, 500);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [kindredId, familyName]);

  const showDecision = hasSearched && kindredId && familyName && !isSearching;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Select kindred</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Kindred select */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
            Kindred
          </label>
          {loadingKindreds ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : (
            <select
              {...register('kindredId', { required: true })}
              onChange={(e) => {
                const selected = kindreds.find(k => k._id === e.target.value);
                if (selected) setValue('kindredName', selected.name);
              }}
              className="w-full text-sm rounded-lg px-3 py-2 bg-gray-50 focus:outline-none  focus:border-green-700 transition"
            >
              <option value="">Select kindred...</option>
              {kindreds.map(k => (
                <option key={k._id} value={k._id}>{k.name}</option>
              ))}
            </select>
          )}
        </div>

        {/* Family name */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
            Family name
          </label>
          <input
            {...register('familyName', { required: true })}
            type="text"
            placeholder="e.g. Okafor"
            className="w-full text-sm  rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-700 transition"
          />
          {isSearching && (
            <p className="text-xs text-gray-400 mt-1">Checking records...</p>
          )}
          {searchError && (
            <p className="text-xs text-red-500 mt-1">{searchError}</p>
          )}
        </div>
      </div>

      {/* Decision panel */}
      {showDecision && (
        <div className="mt-4 rounded-lg  p-4">
          {/* {existingFamily ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-green-800">Record found</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  A family record already exists for this name.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={onEditExisting}
                  className={`text-sm px-4 py-2 rounded-lg border transition font-medium ${mode === 'edit'
                      ? 'bg-green-700 text-white border-green-700'
                      : 'border-gray-200 text-gray-700 hover:border-green-700 hover:text-green-700 bg-white'
                    }`}
                >
                  Edit existing record
                </button>
                <button
                  type="button"
                  onClick={onCreateNew}
                  className={`text-sm px-4 py-2 rounded-lg border transition font-medium ${mode === 'create'
                      ? 'bg-green-700 text-white border-green-700'
                      : 'border-gray-200 text-gray-700 hover:border-green-700 hover:text-green-700 bg-white'
                    }`}
                >
                  Create new anyway
                </button>
              </div>
            </div>
          ) : ( */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mt-0.5">
                A new family record will be created.
              </p>
              <p className="text-sm font-medium text-gray-700">
                All fields with
                <span className='text-[#ff385c] ml-1 text-sm'>*</span> are important and must be filled to create the record.
              </p>
            </div>
            <button
              type="button"
              onClick={onCreateNew}
              className={`text-sm px-4 py-2 rounded-lg transition font-medium ${mode === 'create'
                ? 'bg-green-700 text-white border-green-700'
                : ' text-gray-700 hover:border-green-700 hover:text-green-700 bg-white'
                }`}
            >
              Continue
            </button>
          </div>
          {/* )} */}
        </div>
      )}
    </div>
  );
}