import React, { useEffect, useState, useRef } from 'react';
import { useGet } from '../../Hooks/useGet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaClock, FaChevronLeft, FaChevronRight, FaDivide, FaCheck, FaPaperPlane, FaSquareRootAlt, FaSuperscript, FaPercentage, FaCalculator, FaHashtag } from 'react-icons/fa';
import { PiMathOperationsBold } from 'react-icons/pi';
import mainLogo from '../../assets/Images/mainLogo.png';
import { usePost } from '../../Hooks/usePost';

// Math operators with their templates
const mathOperators = [
    {
        symbol: '√',
        name: 'square root',
        display: '√',
        template: '√({value})',
        description: 'Calculates the square root of a number',
        inputType: 'single',
        placeholder: '√( )',
        icon: FaSquareRootAlt,
        visual: 'root',
        color: 'text-red-600'
    },
    {
        symbol: '∛',
        name: 'cube root',
        display: '∛',
        template: '∛({value})',
        description: 'Calculates the cube root of a number',
        inputType: 'single',
        placeholder: '∛( )',
        icon: FaSquareRootAlt,
        visual: 'root',
        color: 'text-pink-600'
    },
    {
        symbol: 'e',
        name: 'euler',
        display: 'e^',
        template: 'e^{value}',
        description: 'Raises Euler\'s number to a power',
        inputType: 'single',
        placeholder: 'e^',
        icon: FaSuperscript,
        visual: 'exponent',
        color: 'text-purple-600'
    },
    {
        symbol: 'log',
        name: 'logarithm',
        display: 'log',
        template: 'log({value})',
        description: 'Logarithm Base 10',
        inputType: 'single',
        placeholder: 'log( )',
        icon: FaCalculator,
        visual: 'function',
        color: 'text-teal-600'
    },
    {
        symbol: 'ln',
        name: 'natural log',
        display: 'ln',
        template: 'ln({value})',
        description: 'Natural Logarithm',
        inputType: 'single',
        placeholder: 'ln( )',
        icon: FaCalculator,
        visual: 'function',
        color: 'text-teal-400'
    },
    {
        symbol: '| |',
        name: 'absolute',
        display: '|x|',
        template: '|{value}|',
        description: 'Absolute Value',
        inputType: 'single',
        placeholder: '| |',
        icon: FaHashtag,
        visual: 'absolute',
        color: 'text-orange-600'
    },
    {
        symbol: '/',
        name: 'fraction',
        display: 'a/b',
        template: '{numerator}/{denominator}',
        description: 'Represents a fraction (displayed as decimal)',
        inputType: 'fraction',
        placeholder: 'a/b',
        icon: FaDivide,
        visual: 'fraction',
        color: 'text-green-600'
    },
    {
        symbol: '^',
        name: 'exponent',
        display: 'x^y',
        template: '({base})^{exponent}',
        description: 'Exponent',
        inputType: 'exponent',
        placeholder: 'x^y',
        icon: FaSuperscript,
        visual: 'power',
        color: 'text-purple-400'
    },
    {
        symbol: 'π',
        name: 'pi',
        display: 'π',
        template: 'π',
        description: 'Pi Constant',
        inputType: 'constant',
        placeholder: 'π',
        icon: FaHashtag,
        visual: 'constant',
        color: 'text-pink-600'
    },
];

const Exam = () => {
    const { courseId } = useParams();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const { refetch: refetchExam, loading: loadingExam, data: dataExam } = useGet({
        url: `${apiUrl}/user/dia_exam/show_exam/${courseId}`
    });
    const { postData, loadingPost, response } = usePost({
        url: `${apiUrl}/user/dia_exam/grade_exam`,
    });
    const [diaExam, setDiaExam] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [gridInValues, setGridInValues] = useState({});

    // Store expression state per question
    const [expressionStates, setExpressionStates] = useState({});
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [showMathOperator, setShowMathOperator] = useState(false);
    const [activeTab, setActiveTab] = useState('number');
    const questionBarRef = useRef(null);
    const navigate = useNavigate();

    // Get current question's expression state
    const getCurrentExpressionState = () => {
        const currentQuestionId = diaExam[currentQuestionIndex]?.id;
        if (!currentQuestionId) return {
            currentExpression: '',
            selectedOperator: null,
            operatorValue: '',
            fractionNum: '',
            fractionDen: '',
            exponentBase: '',
            exponentPower: '',
            directNumber: '',
            hasDirectNumberAnswer: false
        };

        return expressionStates[currentQuestionId] || {
            currentExpression: '',
            selectedOperator: null,
            operatorValue: '',
            fractionNum: '',
            fractionDen: '',
            exponentBase: '',
            exponentPower: '',
            directNumber: '',
            hasDirectNumberAnswer: false
        };
    };

    // Update current question's expression state
    const updateExpressionState = (updates) => {
        const currentQuestionId = diaExam[currentQuestionIndex]?.id;
        if (!currentQuestionId) return;

        setExpressionStates(prev => ({
            ...prev,
            [currentQuestionId]: {
                ...getCurrentExpressionState(),
                ...updates
            }
        }));
    };

    // Clear current question's expression state
    const clearCurrentExpressionState = () => {
        const currentQuestionId = diaExam[currentQuestionIndex]?.id;
        if (!currentQuestionId) return;

        setExpressionStates(prev => ({
            ...prev,
            [currentQuestionId]: {
                currentExpression: '',
                selectedOperator: null,
                operatorValue: '',
                fractionNum: '',
                fractionDen: '',
                exponentBase: '',
                exponentPower: '',
                directNumber: '',
                hasDirectNumberAnswer: false
            }
        }));
    };

    useEffect(() => {
        refetchExam();
    }, [refetchExam]);

    useEffect(() => {
        if (dataExam && !loadingExam) {
            setDiaExam(dataExam.exam || []);
        }
    }, [dataExam, loadingExam]);

    useEffect(() => {
        if (response && response.data && !loadingPost) {
            navigate(`/exam/results/${response.data.exam?.id}`, { state: { examData: response.data, timer: formatTime(timeElapsed) } });
        }
    }, [response, loadingPost, navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (questionBarRef.current) {
            questionBarRef.current.scrollLeft = 0;
        }
    }, [diaExam]);

    useEffect(() => {
        if (questionBarRef.current) {
            const currentQuestionElement = questionBarRef.current.children[currentQuestionIndex];
            if (currentQuestionElement) {
                currentQuestionElement.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest'
                });
            }
        }
    }, [currentQuestionIndex]);

    // Auto-calculate when operator value changes
    useEffect(() => {
        const currentState = getCurrentExpressionState();
        const { selectedOperator, operatorValue, fractionNum, fractionDen, exponentBase, exponentPower } = currentState;

        if (selectedOperator && selectedOperator.inputType === 'single' && operatorValue) {
            const timeoutId = setTimeout(() => {
                applyOperator(selectedOperator, operatorValue);
            }, 500);
            return () => clearTimeout(timeoutId);
        }

        if (selectedOperator && selectedOperator.inputType === 'fraction' && fractionNum && fractionDen && fractionDen !== '0') {
            const timeoutId = setTimeout(() => {
                applyOperator(selectedOperator, '');
            }, 500);
            return () => clearTimeout(timeoutId);
        }

        if (selectedOperator && selectedOperator.inputType === 'exponent' && exponentBase && exponentPower) {
            const timeoutId = setTimeout(() => {
                applyOperator(selectedOperator, '');
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [expressionStates, currentQuestionIndex]);

    const handleMCQAnswer = (questionId, mcqNum) => {
        setAnswers((prev) => ({ ...prev, [questionId]: mcqNum }));
    };

    const calculateExpressionResult = (expression) => {
        if (!expression || typeof expression !== 'string') return '';
        try {
            let jsExpression = expression
                .replace(/√/g, 'Math.sqrt')
                .replace(/∛/g, 'Math.cbrt')
                .replace(/π/g, 'Math.PI')
                .replace(/e\^/g, 'Math.exp')
                .replace(/log/g, 'Math.log10')
                .replace(/ln/g, 'Math.log')
                .replace(/\|(.*?)\|/g, 'Math.abs($1)')
                .replace(/\^/g, '**')
                .replace(/mod/g, '%');

            // Handle e^ specifically
            if (jsExpression.includes('Math.exp')) {
                jsExpression = jsExpression.replace(/Math.exp(\d+(\.\d+)?)/g, 'Math.exp($1)');
            }

            // Handle exponent expressions like (2)^{3}
            if (jsExpression.includes('**')) {
                jsExpression = jsExpression.replace(/\(([^)]+)\)\*\*\{([^}]+)\}/g, '($1)**($2)');
            }

            // Handle fractions and convert to decimal
            if (jsExpression.includes('/')) {
                const parts = jsExpression.split('/');
                if (parts.length === 2) {
                    const num = eval(parts[0]);
                    const denom = eval(parts[1]);
                    if (denom !== 0) {
                        const result = num / denom;
                        return Number.isInteger(result) ? result.toString() : result.toFixed(2);
                    }
                }
            }

            const result = eval(jsExpression);
            if (isNaN(result)) return '';
            if (!isFinite(result)) return result > 0 ? '∞' : '-∞';
            return Number.isInteger(result) ? result.toString() : result.toFixed(2);
        } catch (error) {
            console.error('Calculation error:', error);
            return '';
        }
    };

    const handleOperatorSelect = (operator) => {
        updateExpressionState({
            selectedOperator: operator,
            operatorValue: '',
            fractionNum: '',
            fractionDen: '',
            exponentBase: '',
            exponentPower: '',
            directNumber: '',
            hasDirectNumberAnswer: false
        });
        setShowMathOperator(false);

        if (operator.inputType === 'constant') {
            applyOperator(operator, '');
        }
    };

    const applyOperator = (operator, value) => {
        let newExpression = '';
        const currentState = getCurrentExpressionState();
        const { fractionNum, fractionDen, exponentBase, exponentPower } = currentState;

        if (operator.inputType === 'constant') {
            newExpression = operator.symbol;
        } else if (operator.inputType === 'fraction') {
            if (fractionNum && fractionDen && fractionDen !== '0') {
                newExpression = `${fractionNum}/${fractionDen}`;
            }
        } else if (operator.inputType === 'exponent') {
            if (exponentBase && exponentPower) {
                newExpression = `(${exponentBase})^{${exponentPower}}`;
            }
        } else {
            if (value) {
                if (operator.symbol === 'e') {
                    newExpression = `e^${value}`;
                } else {
                    newExpression = operator.template.replace('{value}', value);
                }
            }
        }

        if (newExpression) {
            updateExpressionState({
                currentExpression: newExpression,
                hasDirectNumberAnswer: false
            });
            updateAnswerWithExpression(newExpression);
        }
    };

    const handleDirectNumberSubmit = () => {
        const currentState = getCurrentExpressionState();
        if (currentState.directNumber) {
            updateExpressionState({
                hasDirectNumberAnswer: true
            });
            updateAnswerWithExpression(currentState.directNumber);
            updateExpressionState({ directNumber: '' });
        }
    };

    const updateAnswerWithExpression = (expression) => {
        const currentQuestionId = diaExam[currentQuestionIndex]?.id;
        if (!currentQuestionId) return;

        const calculatedValue = calculateExpressionResult(expression);

        setGridInValues(prev => ({
            ...prev,
            [currentQuestionId]: expression
        }));

        setAnswers((prev) => ({
            ...prev,
            [currentQuestionId]: calculatedValue
        }));
    };

    const clearInput = (questionId) => {
        clearCurrentExpressionState();
        setAnswers((prev) => ({ ...prev, [questionId]: '' }));
        setGridInValues(prev => ({ ...prev, [questionId]: '' }));
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSubmit = () => {
        const formData = new FormData();
        let exam_id = '';
        diaExam.forEach((question, index) => {
            if (question && question.id) {
                let answer = answers[question.id] || '';
                formData.append(`answers[${index}]`, answer);
                if (index === 0) {
                    exam_id = question.pivot?.diagnostic_exam_id || courseId;
                }
            }
        });
        formData.append('timer', formatTime(timeElapsed));
        formData.append('exam_id', exam_id);
        postData(formData, "Exam submitted successfully");
        setShowSubmitModal(false);
    };

    const isLastQuestion = currentQuestionIndex === diaExam.length - 1;

    if (loadingExam) {
        return (
            <div className="h-screen flex justify-center items-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-2"></div>
                    <p className="text-gray-600 font-medium text-base">Loading Exam...</p>
                </div>
            </div>
        );
    }

    if (!diaExam || diaExam.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
                    <img src={mainLogo} alt="Main Logo" className="mx-auto h-20 mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No Exam Available</h3>
                    <p className="text-gray-600 mb-6">The exam you're looking for is not available at the moment.</p>
                    <Link
                        to="/courses"
                        className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    const currentQuestion = diaExam[currentQuestionIndex];
    if (!currentQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Exam Error</h3>
                    <p className="text-gray-600 mb-6">There was an error loading the exam questions.</p>
                    <Link
                        to="/courses"
                        className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    const totalQuestions = diaExam.length;
    const currentAnswer = answers[currentQuestion.id];
    const currentGridInValue = gridInValues[currentQuestion.id];
    const calculatedResult = calculateExpressionResult(currentGridInValue);

    // Get current state for rendering
    const currentState = getCurrentExpressionState();

    return (
        <div className="min-h-screen bg-white px-2 md:px-4 lg:px-6 flex flex-col">
            <div className="w-full h-full flex flex-col">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow p-4 mb-2 flex-shrink-0">
                    <div className="flex flex-row justify-between items-center gap-3">
                        <div className="bg-red-100 text-red-600 px-3 py-1 rounded-lg font-semibold text-sm">
                            Question {currentQuestionIndex + 1}/{totalQuestions}
                        </div>
                        <div
                            ref={questionBarRef}
                            className="hidden shadow-md md:flex overflow-x-auto gap-1 py-1 px-2 scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-100"
                        >
                            {diaExam.map((question, index) => {
                                const uniqueKey = question?.id ? `${question.id}-${index}` : `question-${index}`;
                                return (
                                    <button
                                        key={uniqueKey}
                                        onClick={() => setCurrentQuestionIndex(index)}
                                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-semibold transition-all duration-200 transform hover:scale-105
                                            ${index === currentQuestionIndex
                                                ? 'bg-red-600 text-white shadow'
                                                : question && answers[question.id]
                                                    ? 'bg-green-500 text-white shadow'
                                                    : 'bg-white border border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600'
                                            } text-sm`}
                                        aria-label={`Go to question ${index + 1}`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="flex items-center gap-2 bg-red-100 px-3 py-1 rounded-lg">
                            <FaClock className="text-red-600 text-sm" />
                            <span className="text-base font-bold text-gray-800 font-mono">
                                {formatTime(timeElapsed)}
                            </span>
                        </div>
                    </div>
                    <div className="mt-2 md:hidden">
                        <div className="flex gap-3 mb-1">
                            <span className="text-xs text-gray-600 font-medium">Questions:</span>
                            <span className="text-xs text-gray-600">
                                {Object.keys(answers).length}/{totalQuestions} answered
                            </span>
                        </div>
                        <div
                            ref={questionBarRef}
                            className="flex overflow-x-auto gap-1 py-1 px-1 scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-100"
                        >
                            {diaExam.map((question, index) => {
                                const uniqueKey = question?.id ? `${question.id}-${index}` : `question-${index}`;
                                return (
                                    <button
                                        key={uniqueKey}
                                        onClick={() => setCurrentQuestionIndex(index)}
                                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-semibold transition-all duration-200 transform hover:scale-105
                                            ${index === currentQuestionIndex
                                                ? 'bg-red-600 text-white shadow'
                                                : question && answers[question.id]
                                                    ? 'bg-green-500 text-white shadow'
                                                    : 'bg-white border border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600'
                                            } text-sm`}
                                        aria-label={`Go to question ${index + 1}`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl max-h-screen shadow flex-1 flex flex-col">
                    <div className="flex flex-col lg:flex-row">
                        {/* Question Section */}
                        <div className="lg:w-3/4 p-2 border-r border-gray-200 flex-1">
                            <h3 className="text-base font-semibold text-gray-700 mb-2">
                                Question {currentQuestionIndex + 1}
                            </h3>
                            {currentQuestion.q_image ? (
                                <div className="bg-gray-50 w-full rounded-lg p-2">
                                    <img
                                        src={currentQuestion.q_image}
                                        alt={`Question ${currentQuestionIndex + 1}`}
                                        className="w-full h-auto md:h-96 object-fit rounded-lg"
                                    />
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-lg p-3 h-32 overflow-hidden">
                                    <div
                                        className="text-gray-800 text-base leading-tight prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: currentQuestion.question || 'No question content available' }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Answer Section */}
                        <div className="lg:w-1/4 p-2 md:p-4 flex-shrink-0">
                            <h3 className="text-base font-semibold text-gray-700 mb-3">Your Answer</h3>
                            {currentQuestion.ans_type === 'MCQ' ? (
                                <div className="space-y-2">
                                    {currentQuestion.mcq && currentQuestion.mcq.map((option) => {
                                        const optionKey = option?.id ? `option-${option.id}` : `option-${Math.random()}`;
                                        return (
                                            <label
                                                key={optionKey}
                                                className={`flex items-center p-2 rounded-lg border transition-all duration-200 cursor-pointer
                                                    ${answers[currentQuestion.id] === option.mcq_num
                                                        ? 'bg-red-100 border-red-600 shadow'
                                                        : 'bg-white border-gray-200 hover:border-red-600 hover:bg-red-50'
                                                    }`}
                                            >
                                                <div className="relative h-4 w-4">
                                                    <input
                                                        type="radio"
                                                        name={`question-${currentQuestion.id}`}
                                                        checked={answers[currentQuestion.id] === option.mcq_num}
                                                        onChange={() => handleMCQAnswer(currentQuestion.id, option.mcq_num)}
                                                        className="appearance-none h-4 w-4 border rounded-full border-gray-300 checked:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors"
                                                        aria-label={`Select option ${option.mcq_num}`}
                                                    />
                                                    {answers[currentQuestion.id] === option.mcq_num && (
                                                        <FaCheck className="absolute top-0.5 left-0.5 text-red-600 text-xs" />
                                                    )}
                                                </div>
                                                <span className="ml-2 text-gray-800 font-medium text-base">
                                                    {option.mcq_num}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {/* Tab Navigation */}
                                    <div className="w-full flex bg-gray-100 rounded-lg p-1">
                                        <button
                                            onClick={() => setActiveTab('number')}
                                            className={`flex-1 py-2 px-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 ${activeTab === 'number'
                                                ? 'bg-white text-red-600 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-800'
                                                }`}
                                            aria-label="Enter a number directly"
                                        >
                                            <FaHashtag className="text-xs" />
                                            Number
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('expression')}
                                            className={`flex-1 py-2 px-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 ${activeTab === 'expression'
                                                ? 'bg-white text-red-600 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-800'
                                                }`}
                                            aria-label="Enter a mathematical expression"
                                        >
                                            <PiMathOperationsBold className="text-sm" />
                                            Expression
                                        </button>
                                    </div>

                                    {/* Number Tab Content */}
                                    {activeTab === 'number' && (
                                        <div className="space-y-3">
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                                <input
                                                    type="number"
                                                    value={currentState.directNumber}
                                                    onChange={(e) => updateExpressionState({ directNumber: e.target.value })}
                                                    placeholder="Enter number..."
                                                    className="w-full px-3 py-2 border border-red-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 text-center text-base font-semibold"
                                                    aria-label="Direct number input"
                                                />
                                                <button
                                                    onClick={handleDirectNumberSubmit}
                                                    disabled={!currentState.directNumber}
                                                    className="w-full mt-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm disabled:opacity-50"
                                                    aria-label="Set direct number as answer"
                                                >
                                                    Set Answer
                                                </button>

                                                {/* SHOW DIRECT NUMBER ANSWER IN NUMBER TAB */}
                                                {currentState.hasDirectNumberAnswer && calculatedResult && (
                                                    <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                                                        <div className="text-center">
                                                            <div className="text-green-900 font-bold text-lg">
                                                                {calculatedResult}
                                                            </div>
                                                            <div className="text-xs text-green-600 mt-1">
                                                                Direct Number Answer
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Expression Tab Content */}
                                    {activeTab === 'expression' && (
                                        <div className="space-y-2">
                                            {/* Operator Selection */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowMathOperator(!showMathOperator)}
                                                    className="w-full py-2 bg-gray-50 border border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors text-sm flex items-center justify-center gap-2"
                                                    aria-label="Select mathematical operator"
                                                    aria-expanded={showMathOperator}
                                                >
                                                    <PiMathOperationsBold className="text-red-600" />
                                                    <span className="text-gray-700 font-medium">
                                                        {currentState.selectedOperator ? currentState.selectedOperator.display : 'Select Function'}
                                                    </span>
                                                </button>
                                                {showMathOperator && (
                                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 p-2 grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                                                        {mathOperators.map((operator, index) => {
                                                            const IconComponent = operator.icon;
                                                            return (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => handleOperatorSelect(operator)}
                                                                    className={`p-2 bg-white hover:bg-red-50 rounded border border-gray-200 hover:border-red-400 transition-all duration-200 transform hover:scale-105 ${operator.color}`}
                                                                    title={operator.description}
                                                                    aria-label={`Select ${operator.description}`}
                                                                >
                                                                    <IconComponent className={`text-lg mx-auto mb-1 ${operator.color}`} />
                                                                    <div className="text-xs font-semibold text-gray-800">
                                                                        {operator.display}
                                                                    </div>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Visual Operator Inputs */}
                                            {currentState.selectedOperator && (
                                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                                    {/* Square Root and Cube Root */}
                                                    {(currentState.selectedOperator.visual === 'root') && (
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <div className={`text-2xl font-bold ${currentState.selectedOperator.color}`}>
                                                                {currentState.selectedOperator.symbol}
                                                            </div>
                                                            <div className="relative">
                                                                <div className="w-20 h-0.5 bg-gray-700 absolute top-0 left-2"></div>
                                                                <input
                                                                    type="number"
                                                                    value={currentState.operatorValue}
                                                                    onChange={(e) => updateExpressionState({ operatorValue: e.target.value })}
                                                                    placeholder=""
                                                                    className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm font-semibold bg-transparent z-10 relative mt-2"
                                                                    aria-label={`${currentState.selectedOperator.name} input`}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Absolute Value */}
                                                    {currentState.selectedOperator.visual === 'absolute' && (
                                                        <div className="flex items-center justify-center space-x-1">
                                                            <div className="text-xl font-bold text-gray-700">|</div>
                                                            <input
                                                                type="number"
                                                                value={currentState.operatorValue}
                                                                onChange={(e) => updateExpressionState({ operatorValue: e.target.value })}
                                                                placeholder="x"
                                                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm font-semibold"
                                                                aria-label="Absolute value input"
                                                            />
                                                            <div className="text-xl font-bold text-gray-700">|</div>
                                                        </div>
                                                    )}

                                                    {/* Functions (log, ln) */}
                                                    {currentState.selectedOperator.visual === 'function' && (
                                                        <div className="flex items-center justify-center space-x-1">
                                                            <div className={`text-sm font-bold ${currentState.selectedOperator.color}`}>
                                                                {currentState.selectedOperator.symbol}(
                                                            </div>
                                                            <input
                                                                type="number"
                                                                value={currentState.operatorValue}
                                                                onChange={(e) => updateExpressionState({ operatorValue: e.target.value })}
                                                                placeholder="x"
                                                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm font-semibold"
                                                                aria-label={`${currentState.selectedOperator.name} input`}
                                                            />
                                                            <div className="text-sm font-bold text-gray-700">)</div>
                                                        </div>
                                                    )}

                                                    {/* Fraction */}
                                                    {currentState.selectedOperator.visual === 'fraction' && (
                                                        <div className="flex items-center justify-center space-x-1">
                                                            <input
                                                                type="number"
                                                                value={currentState.fractionNum}
                                                                onChange={(e) => updateExpressionState({ fractionNum: e.target.value })}
                                                                placeholder="a"
                                                                className="w-16 px-3 py-1 border border-gray-300 rounded text-center text-sm font-semibold"
                                                                aria-label="Fraction numerator"
                                                            />
                                                            <div className="text-sm font-bold text-gray-700">/</div>
                                                            <input
                                                                type="number"
                                                                value={currentState.fractionDen}
                                                                onChange={(e) => updateExpressionState({ fractionDen: e.target.value })}
                                                                placeholder="b"
                                                                className="w-16 px-3 py-1 border border-gray-300 rounded text-center text-sm font-semibold"
                                                                aria-label="Fraction denominator"
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Exponent/Power */}
                                                    {currentState.selectedOperator.visual === 'power' && (
                                                        <div className="flex items-end justify-center space-x-1">
                                                            <input
                                                                type="number"
                                                                value={currentState.exponentBase}
                                                                onChange={(e) => updateExpressionState({ exponentBase: e.target.value })}
                                                                placeholder="Base"
                                                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm font-semibold"
                                                                aria-label="Exponent base"
                                                            />
                                                            <div className="text-sm font-bold text-gray-700 mb-1">^</div>
                                                            <input
                                                                type="number"
                                                                value={currentState.exponentPower}
                                                                onChange={(e) => updateExpressionState({ exponentPower: e.target.value })}
                                                                placeholder="Exponent"
                                                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm font-semibold"
                                                                aria-label="Exponent power"
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Euler's Number */}
                                                    {currentState.selectedOperator.visual === 'exponent' && (
                                                        <div className="flex items-center justify-center space-x-1">
                                                            <div className={`text-sm font-bold ${currentState.selectedOperator.color}`}>
                                                                e^
                                                            </div>
                                                            <input
                                                                type="number"
                                                                value={currentState.operatorValue}
                                                                onChange={(e) => updateExpressionState({ operatorValue: e.target.value })}
                                                                placeholder="x"
                                                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm font-semibold"
                                                                aria-label="Euler's number exponent"
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Constant */}
                                                    {currentState.selectedOperator.visual === 'constant' && (
                                                        <div className="text-center py-2">
                                                            <div className={`text-xl font-bold ${currentState.selectedOperator.color}`}>
                                                                {currentState.selectedOperator.symbol}
                                                            </div>
                                                            <div className="text-xs text-gray-500 mt-1">Constant Value</div>
                                                        </div>
                                                    )}

                                                    {/* Auto-calculating indicator */}
                                                    {(currentState.operatorValue || currentState.fractionNum || currentState.fractionDen || currentState.exponentBase || currentState.exponentPower) && (
                                                        <div className="text-xs text-green-600 text-center mt-2 animate-pulse">
                                                            Calculating...
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        </div>
                                    )}

                                    {/* Result Display - ONLY FOR EXPRESSIONS */}
                                    {(calculatedResult || currentState.hasDirectNumberAnswer) && (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                                            <div className="text-center">
                                                <div className="text-green-900 font-bold text-sm">
                                                    {currentState.currentExpression} = {calculatedResult}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Clear Button */}
                                    <button
                                        onClick={() => clearInput(currentQuestion.id)}
                                        className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
                                        aria-label="Clear input"
                                    >
                                        Clear
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-2 flex-shrink-0">
                    <button
                        onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
                        disabled={currentQuestionIndex === 0}
                        className="flex items-center gap-1 px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium text-sm"
                        aria-label="Previous question"
                    >
                        <FaChevronLeft className="text-xs" />
                        Previous
                    </button>
                    <div className="flex gap-3 mb-1">
                        <span className="text-xs text-gray-600 font-medium">Questions:</span>
                        <span className="text-xs text-gray-600">
                            {Object.keys(answers).length}/{totalQuestions} answered
                        </span>
                    </div>
                    {isLastQuestion ? (
                        <button
                            onClick={() => setShowSubmitModal(true)}
                            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                            aria-label="Submit exam"
                        >
                            <FaPaperPlane className="text-xs" />
                            Submit
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, totalQuestions - 1))}
                            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                            aria-label="Next question"
                        >
                            Next
                            <FaChevronRight className="text-xs" />
                        </button>
                    )}
                </div>
            </div>

            {/* Submit Confirmation Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
                    <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Submit Exam</h3>
                        <p className="text-gray-600 mb-4 text-sm">
                            Sure to submit? Answered{' '}
                            <span className="font-semibold text-red-600">
                                {Object.keys(answers).length}/{totalQuestions}
                            </span>{' '}
                            questions.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium text-sm"
                                aria-label="Cancel submission"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loadingPost}
                                className="flex-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm disabled:opacity-50"
                                aria-label="Confirm submission"
                            >
                                {loadingPost ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Exam;