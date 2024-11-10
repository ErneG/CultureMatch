'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { QuestionCard } from '@/components/survey/QuestionCard';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Question } from './types/types';

interface Answer {
  value: number | null;
  elaboration: string;
}

interface SurveyState {
  [key: number]: Answer;
}

const QUESTIONS_PER_PAGE = 3;

interface SurveyContentProps {
  profession?: string;
  storageName: string;
  questions: Question[];
  title: string;
  onBack: () => void;
  onSubmit: () => void;
}

export default function SurveyContent({
  profession = '',
  storageName,
  questions,
  title,
  onBack,
  onSubmit,
}: SurveyContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<SurveyState>({});
  const [savedProfession, setSavedProfession] = useState<string>(profession);

  const totalQuestions = questions.length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(storageName);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.profession) setSavedProfession(parsedData.profession);
      if (parsedData.results) setAnswers(parsedData.results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    const dataToSave = { profession: savedProfession, results: answers };
    localStorage.setItem(storageName, JSON.stringify(dataToSave));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, savedProfession]);

  const handleValueChange = (questionIndex: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [startIndex + questionIndex]: {
        value,
        elaboration: prev[startIndex + questionIndex]?.elaboration || '',
      },
    }));
  };

  const handleElaborationChange = (questionIndex: number, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [startIndex + questionIndex]: {
        value: prev[startIndex + questionIndex]?.value || null,
        elaboration: text,
      },
    }));
  };

  const canProceed = currentQuestions.every(
    (_, index) =>
      answers[startIndex + index]?.value && answers[startIndex + index]?.elaboration.length > 0,
  );

  const progress = (Object.keys(answers).length / totalQuestions) * 100;

  const handleSubmit = () => {
    onSubmit();
  };

  const handlePrevious = () => {
    if (currentPage === 1) {
      onBack();
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{title}</h1>
          {currentPage === 1 && (
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Instructions
            </Button>
          )}
        </div>
        <p className="text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-6">
        {currentQuestions.map((question, index) => (
          <QuestionCard
            key={startIndex + index}
            question={question.question}
            description={question.description}
            value={answers[startIndex + index]?.value || null}
            elaboration={answers[startIndex + index]?.elaboration || ''}
            onValueChange={(value) => handleValueChange(index, value)}
            onElaborationChange={(text) => handleElaborationChange(index, text)}
          />
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {currentPage === 1 ? 'Back to Instructions' : 'Previous'}
        </Button>

        {currentPage === totalPages ? (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
            Submit Survey <CheckCircle2 className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!canProceed}
            className="flex items-center gap-2">
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
