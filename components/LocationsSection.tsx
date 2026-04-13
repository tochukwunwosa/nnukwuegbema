'use client';

import { useFormContext } from 'react-hook-form';

const inputCls = 'w-full text-sm rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:border-green-700 transition';
const labelCls = 'block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1';

export default function LocationsSection() {
  const { register } = useFormContext();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Important places</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Place name</label>
          <input {...register('location1Name')} placeholder="e.g. uzor ugbo" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Place type</label>
          <select {...register('location1Type')} className={inputCls}>
            <option value="">Select type...</option>
            <option value="Shrine">Shrine</option>
            <option value="Compound">Compound</option>
            <option value="Landmark">Landmark</option>
            <option value="Market">Market</option>
            <option value="Burial ground">Burial ground</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className={labelCls}>Why this place matters</label>
        <textarea
          {...register('location1Description')}
          rows={3}
          placeholder="Describe the significance of this location to the family..."
          className={`${inputCls} resize-none`}
        />
      </div>
    </div>
  );
}