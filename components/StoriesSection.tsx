'use client';

import { useFormContext } from 'react-hook-form';

const inputCls = 'w-full text-sm rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:border-green-700 transition';
const labelCls = 'block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1';

export default function StoriesSection() {
  const { register } = useFormContext();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Stories & traditions</h2>

      <div className="space-y-4">
        <div>
          <label className={labelCls}>Story title</label>
          <input {...register('story1Title')} type="text" placeholder="e.g. How our family migrated" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Story content</label>
          <textarea
            {...register('story1Content')}
            rows={5}
            placeholder="Tell the story in full — this will be preserved for generations..."
            className={`${inputCls} resize-none`}
          />
        </div>

        <div className="border-t border-gray-100 pt-4">
          <label className={labelCls}>Family traditions</label>
          <textarea
            {...register('traditions')}
            rows={3}
            placeholder="Naming customs, marriage rites, festivals, ceremonies..."
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>
    </div>
  );
}