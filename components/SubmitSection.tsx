'use client';

export default function SubmitSection({
  submitStatus, submitMessage, onClear, disabled, existingFamily,
}: {
  submitStatus: string;
  submitMessage: string;
  onClear: () => void;
  disabled: boolean;
  existingFamily: any;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">

      {/* Submitter fields */}
      <h2 className="text-base font-semibold text-gray-800 mb-4">Submitter details</h2>

      {submitMessage && (
        <div className={`mb-4 text-sm px-4 py-3 rounded-lg border ${submitStatus === 'success'
            ? 'bg-green-50 text-green-800 border-green-200'
            : 'bg-red-50 text-red-700 border-red-200'
          }`}>
          {submitMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onClear}
          disabled={disabled}
          className="flex-1 text-sm text-gray-600 hover:bg-gray-50 py-2.5 rounded-lg transition disabled:opacity-50"
        >
          Clear form
        </button>
        <button
          type="submit"
          disabled={disabled}
          className="flex-1 text-sm bg-[#1b4332] hover:bg-[#14532d] text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50"
        >
          {disabled
            ? 'Saving...'
            : existingFamily
              ? 'Update record'
              : 'Save record'}
        </button>
      </div>
    </div>
  );
}