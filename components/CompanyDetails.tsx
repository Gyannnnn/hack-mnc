"use client"
import { getQuestionsByCompany } from '@/app/actions/questions/questions'
import React, { useEffect, useState } from 'react'
import { company, featuredQuestions } from '@/types/type'
import QuestionCard from './ui/questionCard';
import Loading from '@/app/loading';
import Uiloading from './ui/uiLoading';

// Define sorting options
type SortOption = 'default' | 'difficulty' | 'frequency' | 'title';

export default function CompanyDetails({id}: {id: string}) {
    const [data, setData] = useState<featuredQuestions[]>([]);
    const [filteredData, setFilteredData] = useState<featuredQuestions[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<SortOption>('default');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const getQuestionByCompany = async () => {
        try {
            const res = await getQuestionsByCompany(id);
            setData(res?.data || []);
            setFilteredData(res?.data || []);
        } catch (error) {
            console.log(error);
            setData([]);
            setFilteredData([]);
        } finally {
            setLoading(false);
        }
    }

    // Get company-specific frequency for the current company
const getCompanyFrequency = (question: featuredQuestions) => {
  return Number(question.frequency) || 0;
};


    // Sort questions based on selected criteria
    const sortQuestions = (questions: featuredQuestions[], sortBy: SortOption, order: 'asc' | 'desc') => {
        const sortedQuestions = [...questions];
        
        switch (sortBy) {
            case 'difficulty':
                // Define difficulty order (Easy -> Medium -> Hard)
                const difficultyOrder = { 'EASY': 1, 'MEDIUM': 2, 'HARD': 3 };
                sortedQuestions.sort((a, b) => {
                    const aDiff = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 0;
                    const bDiff = difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 0;
                    return order === 'asc' ? aDiff - bDiff : bDiff - aDiff;
                });
                break;
                
            case 'frequency':
                sortedQuestions.sort((a, b) => {
                    const aFreq = getCompanyFrequency(a);
                    const bFreq = getCompanyFrequency(b);
                    return order === 'asc' ? aFreq - bFreq : bFreq - aFreq;
                });
                break;
                
            case 'title':
                sortedQuestions.sort((a, b) => {
                    const aTitle = a.name?.toLowerCase() || '';
                    const bTitle = b.name?.toLowerCase() || '';
                    return order === 'asc' 
                        ? aTitle.localeCompare(bTitle)
                        : bTitle.localeCompare(aTitle);
                });
                break;
                
            case 'default':
            default:
                // Default sorting (by frequency for the specific company, highest first)
                sortedQuestions.sort((a, b) => {
                    const aFreq = getCompanyFrequency(a);
                    const bFreq = getCompanyFrequency(b);
                    return bFreq - aFreq; // Default: highest frequency first
                });
                break;
        }
        
        return sortedQuestions;
    }

    // Handle sort change
    const handleSortChange = (newSortBy: SortOption) => {
        if (newSortBy === sortBy) {
            // Toggle order if clicking the same sort option
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort option with default ascending order
            setSortBy(newSortBy);
            setSortOrder('asc');
        }
    }

    // Get sort button label with direction indicator
    const getSortButtonLabel = (option: SortOption, label: string) => {
        if (sortBy === option) {
            return `${label} ${sortOrder === 'asc' ? '↑' : '↓'}`;
        }
        return label;
    }

    // Apply sorting when sortBy or sortOrder changes
    useEffect(() => {
        if (data.length > 0) {
            const sortedData = sortQuestions(data, sortBy, sortOrder);
            setFilteredData(sortedData);
        }
    }, [data, sortBy, sortOrder]);

    useEffect(() => {
        getQuestionByCompany();
    }, [id]);

    if (loading) return <Uiloading/>;

    return (
        <div className="w-full">
            
            <div className="space-y-4">
                {filteredData.map((question, index) => (
                    <QuestionCard               
                        data={question} 
                        index={index} 
                     
                    />
                ))}
                
                {filteredData.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No questions found for this company.
                    </div>
                )}
            </div>
        </div>
    );
}