'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import FamilyMemberForm from './FamilyMemberForm';

const defaultMember = {
  fullName: '', knownAs: '', gender: '', birthYear: '', deathYear: '',
  birthPlace: '', status: '', fatherName: '', motherName: '',
  occupation: '', education: '', achievements: '', biography: '',
  phone: '', spouses: [{ name: '', marriageYear: '' }],
  children: [{ name: '', birthYear: '' }],
};

export default function FamilyMembersSection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'familyMembers',
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Family members</h2>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <FamilyMemberForm
            key={field.id}
            memberIndex={index}
            removeMember={remove}
            canRemove={fields.length > 1}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => append(defaultMember)}
        className="mt-10 w-full text-sm border border-gray-300 text-gray-500 bg-green-900 text-white rounded-lg py-2.5 cursor-pointer font-medium"
      >
        Add family member
      </button>
    </div>
  );
}