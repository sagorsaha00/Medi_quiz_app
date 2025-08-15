import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface MedicalQuizCategory {
  id: string;
  title: string;
  titleBangla: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  gradient: string[];
  totalQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  completed: boolean;
  score?: number;
  topics: string[];
}

const medicalQuizCategories: MedicalQuizCategory[] = [
  {
    id: '1',
    title: 'Anatomy',
    titleBangla: 'অ্যানাটমি',
    description: 'মানব দেহের গঠন ও অঙ্গসমূহের বিস্তারিত জ্ঞান',
    icon: 'body',
    color: '#E91E63',
    gradient: ['#E91E63', '#F06292'],
    totalQuestions: 50,
    difficulty: 'Medium',
    estimatedTime: '২৫ মিনিট',
    completed: true,
    score: 87,
    topics: ['Musculoskeletal', 'Cardiovascular', 'Nervous System']
  },
  {
    id: '2',
    title: 'Physiology',
    titleBangla: 'ফিজিওলজি',
    description: 'মানব দেহের কার্যক্রম ও জৈবিক প্রক্রিয়া',
    icon: 'pulse',
    color: '#2196F3',
    gradient: ['#2196F3', '#42A5F5'],
    totalQuestions: 45,
    difficulty: 'Hard',
    estimatedTime: '৩০ মিনিট',
    completed: false,
    topics: ['Respiratory', 'Digestive', 'Endocrine System']
  },
  {
    id: '3',
    title: 'Pharmacology',
    titleBangla: 'ফার্মাকোলজি',
    description: 'ওষুধের ক্রিয়া, পার্শ্বপ্রতিক্রিয়া ও ব্যবহার',
    icon: 'medical',
    color: '#4CAF50',
    gradient: ['#4CAF50', '#66BB6A'],
    totalQuestions: 40,
    difficulty: 'Hard',
    estimatedTime: '২৮ মিনিট',
    completed: true,
    score: 92,
    topics: ['Drug Actions', 'Side Effects', 'Dosage']
  },
  {
    id: '4',
    title: 'Pathology',
    titleBangla: 'প্যাথলজি',
    description: 'রোগের কারণ, প্রকৃতি ও নির্ণয় পদ্ধতি',
    icon: 'flask',
    color: '#FF9800',
    gradient: ['#FF9800', '#FFB74D'],
    totalQuestions: 35,
    difficulty: 'Medium',
    estimatedTime: '২২ মিনিট',
    completed: false,
    topics: ['Inflammation', 'Neoplasia', 'Infections']
  },
  {
    id: '5',
    title: 'Internal Medicine',
    titleBangla: 'ইন্টারনাল মেডিসিন',
    description: 'অভ্যন্তরীণ রোগ নির্ণয় ও চিকিৎসা',
    icon: 'heart',
    color: '#9C27B0',
    gradient: ['#9C27B0', '#BA68C8'],
    totalQuestions: 60,
    difficulty: 'Hard',
    estimatedTime: '৪০ মিনিট',
    completed: true,
    score: 78,
    topics: ['Cardiology', 'Gastroenterology', 'Nephrology']
  },
  {
    id: '6',
    title: 'Surgery',
    titleBangla: 'সার্জারি',
    description: 'অস্ত্রোপচার পদ্ধতি ও কৌশল',
    icon: 'cut',
    color: '#F44336',
    gradient: ['#F44336', '#EF5350'],
    totalQuestions: 55,
    difficulty: 'Hard',
    estimatedTime: '৩৫ মিনিট',
    completed: false,
    topics: ['General Surgery', 'Orthopedics', 'Neurosurgery']
  }
];

export default function MedicalQuizSection(): JSX.Element {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#757575';
    }
  };

  const handleQuizStart = (categoryId: string) => {
    router.push({
      pathname: '/quiz-screen',
      params: { categoryId },
    });
  };

  const completedQuizzes = medicalQuizCategories.filter(cat => cat.completed).length;
  const averageScore = medicalQuizCategories
    .filter(cat => cat.score)
    .reduce((acc, cat) => acc + (cat.score || 0), 0) / 
    medicalQuizCategories.filter(cat => cat.score).length;

  const renderQuizCard = (category: MedicalQuizCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.quizCard, { borderLeftColor: category.color }]}
      onPress={() => handleQuizStart(category.id)}
      activeOpacity={0.85}
    >
      {category.completed && (
        <View style={styles.completedBadge}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.completedText}>সম্পন্ন</Text>
        </View>
      )}

      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
          <Ionicons name={category.icon} size={32} color="#fff" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{category.titleBangla}</Text>
          <Text style={styles.cardSubtitle}>{category.title}</Text>
          <Text style={styles.cardDescription}>{category.description}</Text>
          
          <View style={styles.topicsContainer}>
            {category.topics.slice(0, 2).map((topic, index) => (
              <View key={index} style={[styles.topicTag, { backgroundColor: category.color + '20' }]}>
                <Text style={[styles.topicText, { color: category.color }]}>{topic}</Text>
              </View>
            ))}
            {category.topics.length > 2 && (
              <Text style={styles.moreTopics}>+{category.topics.length - 2} আরো</Text>
            )}
          </View>
        </View>

        {category.completed && category.score && (
          <View style={styles.scoreContainer}>
            <Ionicons name="trophy" size={24} color="#FFD700" />
            <Text style={styles.scoreText}>{category.score}%</Text>
          </View>
        )}
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.metaInfo}>
          <View style={styles.metaItem}>
            <Ionicons name="help-circle" size={18} color="#666" />
            <Text style={styles.metaText}>{category.totalQuestions} প্রশ্ন</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time" size={18} color="#666" />
            <Text style={styles.metaText}>{category.estimatedTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(category.difficulty) }
              ]}
            >
              <Text style={styles.difficultyText}>{category.difficulty}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: category.color }]}
          onPress={() => handleQuizStart(category.id)}
        >
          <Text style={styles.startButtonText}>
            {category.completed ? 'আবার অনুশীলন করুন' : 'শুরু করুন'}
          </Text>
          <Ionicons name="play" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>মেডিকেল কুইজ</Text>
          <Text style={styles.headerSubtitle}>Medical Quiz Practice</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="search" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#4CAF50' }]}>
            <Ionicons name="trophy" size={28} color="#fff" />
            <Text style={styles.statNumber}>{completedQuizzes}</Text>
            <Text style={styles.statLabel}>সম্পন্ন কুইজ</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#2196F3' }]}>
            <Ionicons name="analytics" size={28} color="#fff" />
            <Text style={styles.statNumber}>{Math.round(averageScore)}%</Text>
            <Text style={styles.statLabel}>গড় স্কোর</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FF9800' }]}>
            <Ionicons name="flash" size={28} color="#fff" />
            <Text style={styles.statNumber}>৭</Text>
            <Text style={styles.statLabel}>দিনের ধারা</Text>
          </View>
        </View>

        {/* Filter Section */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['all', 'completed', 'pending', 'hard'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.activeFilterButton
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.activeFilterText
                  ]}
                >
                  {filter === 'all' && 'সব'}
                  {filter === 'completed' && 'সম্পন্ন'}
                  {filter === 'pending' && 'বাকি'}
                  {filter === 'hard' && 'কঠিন'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>মেডিকেল বিষয়সমূহ</Text>
          <Text style={styles.sectionSubtitle}>আপনার পছন্দের বিষয় নির্বাচন করে অনুশীলন শুরু করুন</Text>
        </View>

        {/* Quiz Categories */}
        <View style={styles.quizCategories}>
          {medicalQuizCategories.map(renderQuizCard)}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Stats Section
  statsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },

  // Filter Section
  filterContainer: {
    marginBottom: 25,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 25,
    backgroundColor: '#e9ecef',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  activeFilterButton: {
    backgroundColor: '#6c63ff',
    borderColor: '#6c63ff',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },

  // Section Header
  sectionHeader: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },

  // Quiz Categories
  quizCategories: {
    gap: 20,
  },

  // Quiz Cards
  quizCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
    position: 'relative',
  },
  completedBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    zIndex: 1,
  },
  completedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    marginBottom: 12,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  topicTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topicText: {
    fontSize: 11,
    fontWeight: '600',
  },
  moreTopics: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  scoreContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8F00',
    marginTop: 4,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 20,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  bottomSpacing: {
    height: 30,
  },
});