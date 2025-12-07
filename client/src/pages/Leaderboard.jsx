import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, ArrowLeft, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { dummyLeaderboard, addUserToLeaderboard, getPaginatedLeaderboard, filterLeaderboard } from '../data/dummyLeaderboard';
import { formatDate } from '../utils/helpers';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const Leaderboard = () => {
    const navigate = useNavigate();
    const { user, score, quizConfig } = useQuiz();
    const [currentPage, setCurrentPage] = useState(1);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        topic: 'All',
        difficulty: 'All',
        timePeriod: 'all'
    });

    const itemsPerPage = 10;

    useEffect(() => {
        // Add current user to leaderboard if they have a score
        let data = [...dummyLeaderboard];
        if (user.name && score > 0) {
            data = addUserToLeaderboard(user.name, score, user.avatar, quizConfig.topic, quizConfig.difficulty);
        }

        // Apply filters
        const filtered = filterLeaderboard(data, filters);
        setLeaderboardData(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [user, score, quizConfig, filters]);

    const paginatedData = getPaginatedLeaderboard(leaderboardData, currentPage, itemsPerPage);

    const getRankIcon = (rank) => {
        if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
        if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
        if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
        return null;
    };

    const getRankColor = (rank) => {
        if (rank === 1) return 'from-yellow-500 to-orange-500';
        if (rank === 2) return 'from-gray-400 to-gray-500';
        if (rank === 3) return 'from-orange-500 to-red-500';
        return 'from-cyan-500 to-blue-500';
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const clearFilters = () => {
        setFilters({ topic: 'All', difficulty: 'All', timePeriod: 'all' });
    };

    const hasActiveFilters = filters.topic !== 'All' || filters.difficulty !== 'All' || filters.timePeriod !== 'all';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-20 px-4"
        >
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        icon={<ArrowLeft className="w-5 h-5" />}
                    >
                        Back to Home
                    </Button>

                    {/* Filter Button */}
                    <Button
                        variant="secondary"
                        onClick={() => setShowFilters(!showFilters)}
                        icon={<Filter className="w-5 h-5" />}
                    >
                        Filters {hasActiveFilters && `(${Object.values(filters).filter(v => v !== 'All' && v !== 'all').length})`}
                    </Button>
                </div>

                {/* Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6"
                        >
                            <GlassCard className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white">Filters</h3>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                                        >
                                            <X className="w-4 h-4" />
                                            Clear All
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Topic Filter */}
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2">Topic</label>
                                        <select
                                            value={filters.topic}
                                            onChange={(e) => handleFilterChange('topic', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-400/50"
                                        >
                                            <option value="All">All Topics</option>
                                            <option value="Space">Space</option>
                                            <option value="Coding">Coding</option>
                                            <option value="History">History</option>
                                            <option value="Science">Science</option>
                                        </select>
                                    </div>

                                    {/* Difficulty Filter */}
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2">Difficulty</label>
                                        <select
                                            value={filters.difficulty}
                                            onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-400/50"
                                        >
                                            <option value="All">All Levels</option>
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                        </select>
                                    </div>

                                    {/* Time Period Filter */}
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2">Time Period</label>
                                        <select
                                            value={filters.timePeriod}
                                            onChange={(e) => handleFilterChange('timePeriod', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-cyan-400/50"
                                        >
                                            <option value="all">All Time</option>
                                            <option value="today">Today</option>
                                            <option value="week">This Week</option>
                                            <option value="month">This Month</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Results Count */}
                                <div className="mt-4 text-sm text-white/60">
                                    Showing {leaderboardData.length} {leaderboardData.length === 1 ? 'result' : 'results'}
                                </div>
                            </GlassCard>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Title */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block mb-4">
                        <motion.div
                            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Trophy className="w-10 h-10 text-white" />
                        </motion.div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Leaderboard
                    </h1>
                    <p className="text-white/70">
                        Compete with the best quiz masters around the world
                    </p>
                </motion.div>

                {/* Top 3 Podium */}
                {currentPage === 1 && leaderboardData.length >= 3 && !hasActiveFilters && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-12 max-w-3xl mx-auto">
                        {/* 2nd Place */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center pt-8"
                        >
                            <GlassCard className="p-3 sm:p-4 text-center w-full">
                                <div className="text-2xl sm:text-4xl mb-2">{leaderboardData[1].avatar}</div>
                                <Medal className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300 mx-auto mb-2" />
                                <div className="font-bold text-white truncate text-sm sm:text-base">{leaderboardData[1].name}</div>
                                <div className="text-xl sm:text-2xl font-bold text-gray-300">{leaderboardData[1].score}</div>
                            </GlassCard>
                        </motion.div>

                        {/* 1st Place */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center"
                        >
                            <GlassCard className="p-4 sm:p-6 text-center w-full bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-400/30">
                                <div className="text-3xl sm:text-5xl mb-2">{leaderboardData[0].avatar}</div>
                                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 mx-auto mb-2" />
                                <div className="font-bold text-white truncate text-sm sm:text-base">{leaderboardData[0].name}</div>
                                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{leaderboardData[0].score}</div>
                            </GlassCard>
                        </motion.div>

                        {/* 3rd Place */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center pt-16"
                        >
                            <GlassCard className="p-3 sm:p-4 text-center w-full">
                                <div className="text-2xl sm:text-4xl mb-2">{leaderboardData[2].avatar}</div>
                                <Medal className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 mx-auto mb-2" />
                                <div className="font-bold text-white truncate text-sm sm:text-base">{leaderboardData[2].name}</div>
                                <div className="text-xl sm:text-2xl font-bold text-orange-400">{leaderboardData[2].score}</div>
                            </GlassCard>
                        </motion.div>
                    </div>
                )}

                {/* Leaderboard Table */}
                {leaderboardData.length > 0 ? (
                    <>
                        <GlassCard className="p-4 sm:p-6 mb-6">
                            <div className="space-y-2">
                                {paginatedData.data.map((entry, index) => {
                                    const globalRank = (currentPage - 1) * itemsPerPage + index + 1;
                                    const isCurrentUser = entry.isCurrentUser;

                                    return (
                                        <motion.div
                                            key={entry.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`
                        p-3 sm:p-4 rounded-xl transition-all duration-300
                        ${isCurrentUser
                                                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50'
                                                    : 'bg-white/5 hover:bg-white/10'
                                                }
                      `}
                                        >
                                            <div className="flex items-center gap-2 sm:gap-4">
                                                {/* Rank */}
                                                <div className="flex-shrink-0 w-12 sm:w-16 text-center">
                                                    {getRankIcon(globalRank) || (
                                                        <div className={`
                              w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${getRankColor(globalRank)} 
                              flex items-center justify-center font-bold text-white text-sm sm:text-base
                            `}>
                                                            {globalRank}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Avatar & Name */}
                                                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                                    <span className="text-2xl sm:text-3xl flex-shrink-0">{entry.avatar}</span>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="font-bold text-white truncate flex items-center gap-2 text-sm sm:text-base">
                                                            {entry.name}
                                                            {isCurrentUser && (
                                                                <span className="px-2 py-1 rounded-full bg-cyan-400/20 text-cyan-400 text-xs font-medium flex-shrink-0">
                                                                    You
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs sm:text-sm text-white/50 flex-wrap">
                                                            <span className="hidden sm:inline">{formatDate(entry.timestamp)}</span>
                                                            {entry.topic && (
                                                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs">
                                                                    {entry.topic}
                                                                </span>
                                                            )}
                                                            {entry.difficulty && (
                                                                <span className={`
                                  px-2 py-0.5 rounded-full text-xs
                                  ${entry.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : ''}
                                  ${entry.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                                  ${entry.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' : ''}
                                `}>
                                                                    {entry.difficulty}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Score */}
                                                <div className="flex-shrink-0 text-right">
                                                    <div className="text-xl sm:text-2xl font-bold gradient-text">
                                                        {entry.score}
                                                    </div>
                                                    <div className="text-xs text-white/50 hidden sm:block">points</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </GlassCard>

                        {/* Pagination */}
                        {paginatedData.totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    icon={<ChevronLeft className="w-5 h-5" />}
                                    className="w-full sm:w-auto"
                                >
                                    Previous
                                </Button>

                                <div className="flex items-center gap-2 flex-wrap justify-center">
                                    {[...Array(paginatedData.totalPages)].map((_, i) => {
                                        const page = i + 1;
                                        // Show first, last, current, and adjacent pages
                                        if (
                                            page === 1 ||
                                            page === paginatedData.totalPages ||
                                            Math.abs(page - currentPage) <= 1
                                        ) {
                                            return (
                                                <motion.button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`
                            w-10 h-10 rounded-lg font-semibold transition-all
                            ${page === currentPage
                                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                                                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                                                        }
                          `}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    {page}
                                                </motion.button>
                                            );
                                        } else if (Math.abs(page - currentPage) === 2) {
                                            return <span key={page} className="text-white/50">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={() => setCurrentPage(prev => Math.min(paginatedData.totalPages, prev + 1))}
                                    disabled={currentPage === paginatedData.totalPages}
                                    icon={<ChevronRight className="w-5 h-5" />}
                                    className="w-full sm:w-auto"
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <GlassCard className="p-12 text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Results Found</h3>
                        <p className="text-white/70 mb-4">Try adjusting your filters</p>
                        <Button onClick={clearFilters}>Clear Filters</Button>
                    </GlassCard>
                )}
            </div>
        </motion.div>
    );
};

export default Leaderboard;
