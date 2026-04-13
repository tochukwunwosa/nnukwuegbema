'use client';

import { useFormContext } from 'react-hook-form';

export default function FamilyInfoSection() {
  const { register } = useFormContext();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Family information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
            Former name
          </label>
          <input
            {...register('alternativeNames')}
            type="text"
            placeholder="e.g. Okoye (old spelling)"
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-700 transition"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
            Founded year
          </label>
          <input
            {...register('foundedYear')}
            type="number"
            placeholder="e.g. 1650"
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-700 transition"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
            Origin location
          </label>
          <input
            {...register('originLocation')}
            type="text"
            placeholder="Village or town of origin"
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-700 transition"
          />
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
          Family description
          <span className='text-[#ff385c] ml-1 text-sm'>*</span>
        </label>
        <textarea
          {...register('familyDescription')}
          rows={4}
          required
          placeholder="The story of this family — origins, values, significance in the community..."
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-700 transition resize-none"
        />
      </div>

      <div className="mt-4 space-y-1">
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
          Notable achievements
          <span className='text-[#ff385c] ml-1 text-sm'>*</span>
        </label>
        <textarea
          {...register('notableAchievements')}
          rows={3}
          required
          placeholder="Chiefs, doctors, community leaders, landmarks..."
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-700 transition resize-none"
        />
      </div>
    </div>
  );
}