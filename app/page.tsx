'use client';

import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import KindredFamilySelector from '@/components/KindredFamilySelector';
import FamilyInfoSection from '@/components/FamilyInfoSection';
import FamilyMembersSection from '@/components/family-member-section/FamilyMembersSection';
import StoriesSection from '@/components/StoriesSection';
import LocationsSection from '@/components/LocationsSection';
import SubmitSection from '@/components/SubmitSection';
import { Family } from '@/types';

interface FormData {
  kindredId: string;
  kindredName: string;
  familyName: string;
  alternativeNames: string;
  foundedYear: string;
  originLocation: string;
  familyDescription: string;
  notableAchievements: string;
  familyMembers: Family[];
  story1Title: string;
  story1Content: string;
  traditions: string;
  location1Name: string;
  location1Type: string;
  location1Description: string;
  submitterName: string;
  submitterRelation: string;
  submitterContact: string;
  submitterDate: string;
  additionalNotes: string;
}

interface Kindred {
  _id: string;
  name: string;
}

export default function GenealogyForm() {
  const methods = useForm<FormData>({
    defaultValues: {
      familyMembers: [],
    },
  });

  const [kindreds, setKindreds] = useState<Kindred[]>([]);
  const [loadingKindreds, setLoadingKindreds] = useState(true);
  const [existingFamily, setExistingFamily] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [mode, setMode] = useState<'idle' | 'create' | 'edit'>('idle');
  const [showForm, setShowForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/kindreds');
        const data = await res.json();
        setKindreds(data);
      } catch {
        setSearchError('Failed to load kindreds');
      } finally {
        setLoadingKindreds(false);
      }
    };
    load();
  }, []);

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('submitting');
    setSubmitMessage('');
    try {
      const url = existingFamily ? `/api/families/${existingFamily._id}` : '/api/families';
      const method = existingFamily ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitStatus('success');
      setSubmitMessage('Record saved successfully.');
      methods.reset();
      setShowForm(false);
      setMode('idle');
      setExistingFamily(null);
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="sticky top-0 z-99 bg-[#1b4332] rounded-xl px-6 py-5">
          <h1 className="text-xl font-semibold text-white tracking-tight">
            Nnukwuegbema family history
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Preserve our village heritage for generations to come
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">

            <KindredFamilySelector
              kindreds={kindreds}
              loadingKindreds={loadingKindreds}
              isSearching={isSearching}
              searchError={searchError}
              existingFamily={existingFamily}
              setExistingFamily={setExistingFamily}
              setIsSearching={setIsSearching}
              setSearchError={setSearchError}
              onCreateNew={() => { setMode('create'); setShowForm(true); }}
              onEditExisting={() => { setMode('edit'); setShowForm(true); }}
              mode={mode}
            />

            {showForm && (
              <>
                <FamilyInfoSection />
                <FamilyMembersSection />
                <StoriesSection />
                <LocationsSection />
                <SubmitSection
                  submitStatus={submitStatus}
                  submitMessage={submitMessage}
                  onClear={() => {
                    methods.reset();
                    setSubmitStatus('');
                    setSubmitMessage('');
                  }}
                  disabled={submitStatus === 'submitting'}
                  existingFamily={existingFamily}
                />
              </>
            )}

          </form>
        </FormProvider>
      </div>
    </div>
  );
}