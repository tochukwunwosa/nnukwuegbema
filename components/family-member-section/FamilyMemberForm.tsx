'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';

const inputCls = 'text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-700 transition w-full';
const labelCls = 'block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1';

export default function FamilyMemberForm({
  memberIndex, removeMember, canRemove,
}: {
  memberIndex: number;
  removeMember: (index: number) => void;
  canRemove: boolean;
}) {
  const { register, control } = useFormContext();
  const p = (f: string) => `familyMembers.${memberIndex}.${f}` as const;

  const { fields: spouseFields, append: appendSpouse, remove: removeSpouse } =
    useFieldArray({ control, name: `familyMembers.${memberIndex}.spouses` });

  const { fields: childFields, append: appendChild, remove: removeChild } =
    useFieldArray({ control, name: `familyMembers.${memberIndex}.children` });

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700">
          Person {memberIndex + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={() => removeMember(memberIndex)}
            className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 rounded-md px-2 py-1 transition"
          >
            Remove
          </button>
        )}
      </div>

      {/* Basic info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>
            Full name
            <span className='text-[#ff385c] ml-1 text-sm'>*</span>
          </label>
          <input {...register(p('fullName'))} placeholder="Full name" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>
            Known as
          </label>
          <input {...register(p('knownAs'))} placeholder="Nickname or common name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>
            Birth year
            <span className='text-[#ff385c] ml-1 text-sm'>*</span>          </label>
          <input type='date' {...register(p('birthYear'))} placeholder="e.g. 1940" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Death year</label>
          <input type='date' {...register(p('deathYear'))} placeholder="If deceased" className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls}>
            Occupation
            <span className='text-[#ff385c] ml-1 text-sm'>*</span>
          </label>
          <input {...register(p('occupation'))} required placeholder="e.g. Farmer, Teacher, Chief" className={inputCls} />
        </div>
      </div>

      {/* Spouses */}
      <div className="mt-10">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Wife / Wives</p>
        <div className="space-y-2">
          {spouseFields.map((s, i) => (
            <div key={s.id} className="grid grid-cols-1 md:grid-cols-[1fr_150px_auto] gap-2 items-center">
              <input
                {...register(`familyMembers.${memberIndex}.spouses.${i}.name`)}                
                placeholder="Spouse name"
                className={inputCls}
              />
              <input
                type='date'
                {...register(`familyMembers.${memberIndex}.spouses.${i}.marriageYear`)}
                placeholder="Year wed"
                className={inputCls}
              />
              <button
                type="button"
                onClick={() => removeSpouse(i)}
                className="text-gray-400 hover:text-red-500 transition text-lg leading-none pb-0.5"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => appendSpouse({ name: '', marriageYear: '' })}
          className="mt-3 w-full text-xs border border-gray-300 text-gray-500 hover:border-green-700 hover:text-green-700 hover:bg-green-50 rounded-lg py-2 transition"
        >
          Add spouse
        </button>
      </div>

      {/* Children */}
      <div className="mt-10">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Children</p>
        <div className="space-y-2">
          {childFields.map((c, i) => (
            <div key={c.id} className="grid grid-cols-1 md:grid-cols-[1fr_150px_auto] gap-2 items-center">
              <input
                {...register(`familyMembers.${memberIndex}.children.${i}.name`)}                
                placeholder="Child name"
                className={inputCls}
              />
              <input
                type='date'
                {...register(`familyMembers.${memberIndex}.children.${i}.birthYear`)}
                placeholder="Birth year"
                className={inputCls}
              />
              <button
                type="button"
                onClick={() => removeChild(i)}
                className="text-gray-400 hover:text-red-500 transition text-lg leading-none pb-0.5"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => appendChild({ name: '', birthYear: '' })}
          className="mt-3 w-full text-xs border border-gray-300 text-gray-500 hover:border-green-700 hover:text-green-700 hover:bg-green-50 rounded-lg py-2 transition"
        >
          Add child
        </button>
      </div>

    </div>
  );
}