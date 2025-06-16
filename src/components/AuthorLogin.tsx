import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BookOpen, Mail, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AuthorLoginProps {
  onLogin: (user: any) => void;
}

export const AuthorLogin: React.FC<AuthorLoginProps> = ({ onLogin }) => {
  const { user, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    return <Navigate to="/author" replace />;
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const user = await signInWithGoogle();
      onLogin(user);
    } catch (error: any) {
      setError('Грешка при пријави. Проверите интернет везу и покушајте поново.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-cream-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Читај о Заплању
            </h1>
          </div>
          <h2 className="text-xl text-gray-600">Пријава за ауторе</h2>
          <p className="text-gray-500 mt-2">
            Поделите ваше приче о Заплању са светом
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Добродошли, аутори!
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Пријавите се са вашим Gmail налогом да бисте могли да објављујете ваше приче о Заплању, 
              његовим људима, култури и традицији.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Mail className="w-5 h-5 text-red-500" />
            <span>{isLoading ? 'Пријављивање...' : 'Пријави се са Gmail-ом'}</span>
          </button>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-500">
              Користимо Gmail за безбедну аутентификацију
            </p>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Зашто се пријавити?</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Објављујте ваше приче о Заплању</li>
                <li>• Уређујте и управљајте вашим садржајем</li>
                <li>• Повежите се са другим ауторима</li>
                <li>• Пратите статистике читања</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Немате Gmail? <a href="https://accounts.google.com/signup" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-medium">Направите налог</a>
          </p>
        </div>
      </div>
    </div>
  );
};