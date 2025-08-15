import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface MedicalVideoTopic {
  id: string;
  title: string;
  titleBangla: string;
  duration: string;
  thumbnail: string;
  category: string;
  categoryBangla: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  watched: boolean;
  progress: number;
  instructor: string;
  description: string;
  tags: string[];
  likes: number;
  views: number;
}

const medicalVideoTopics: MedicalVideoTopic[] = [
  {
    id: '1',
    title: 'Human Anatomy - Heart Structure',
    titleBangla: 'হৃদপিণ্ডের গঠন - অ্যানাটমি',
    duration: '15:30',
    thumbnail: 'https://via.placeholder.com/400x250/E91E63/white?text=Heart+Anatomy',
    category: 'Anatomy',
    categoryBangla: 'অ্যানাটমি',
    difficulty: 'Beginner',
    watched: true,
    progress: 100,
    instructor: 'ডা. আহমেদ করিম',
    description: 'হৃদপিণ্ডের সম্পূর্ণ গঠন ও বিভিন্ন অংশের বিস্তারিত ব্যাখ্যা',
    tags: ['Heart', 'Cardiovascular', 'Basic'],
    likes: 245,
    views: 1250,
  },
  {
    id: '2',
    title: 'Blood Circulation System',
    titleBangla: 'রক্ত সংবহন তন্ত্র',
    duration: '22:45',
    thumbnail: 'https://via.placeholder.com/400x250/2196F3/white?text=Blood+Circulation',
    category: 'Physiology',
    categoryBangla: 'ফিজিওলজি',
    difficulty: 'Intermediate',
    watched: false,
    progress: 0,
    instructor: 'প্রফেসর রহিমা খাতুন',
    description: 'রক্ত সংবহনের সম্পূর্ণ প্রক্রিয়া ও তার গুরুত্ব',
    tags: ['Circulation', 'Blood', 'Heart'],
    likes: 189,
    views: 980,
  },
  {
    id: '3',
    title: 'Antibiotic Classifications',
    titleBangla: 'অ্যান্টিবায়োটিকের শ্রেণীবিভাগ',
    duration: '18:20',
    thumbnail: 'https://via.placeholder.com/400x250/4CAF50/white?text=Antibiotics',
    category: 'Pharmacology',
    categoryBangla: 'ফার্মাকোলজি',
    difficulty: 'Advanced',
    watched: true,
    progress: 75,
    instructor: 'ডা. নাসির উদ্দিন',
    description: 'বিভিন্ন ধরনের অ্যান্টিবায়োটিক ও তাদের ব্যবহার',
    tags: ['Antibiotics', 'Drugs', 'Medicine'],
    likes: 312,
    views: 1890,
  },
  {
    id: '4',
    title: 'Cancer Pathology Basics',
    titleBangla: 'ক্যান্সার প্যাথলজির মূলতত্ত্ব',
    duration: '25:10',
    thumbnail: 'https://via.placeholder.com/400x250/FF9800/white?text=Cancer+Pathology',
    category: 'Pathology',
    categoryBangla: 'প্যাথলজি',
    difficulty: 'Advanced',
    watched: false,
    progress: 0,
    instructor: 'প্রফেসর সালমা আক্তার',
    description: 'ক্যান্সার কোষের বৈশিষ্ট্য ও রোগ নির্ণয়ের পদ্ধতি',
    tags: ['Cancer', 'Oncology', 'Pathology'],
    likes: 156,
    views: 750,
  },
  {
    id: '5',
    title: 'Hypertension Management',
    titleBangla: 'উচ্চ রক্তচাপ ব্যবস্থাপনা',
    duration: '20:15',
    thumbnail: 'https://via.placeholder.com/400x250/9C27B0/white?text=Hypertension',
    category: 'Internal Medicine',
    categoryBangla: 'ইন্টারনাল মেডিসিন',
    difficulty: 'Intermediate',
    watched: true,
    progress: 60,
    instructor: 'ডা. মোহাম্মদ হাসান',
    description: 'উচ্চ রক্তচাপের কারণ, লক্ষণ ও চিকিৎসা পদ্ধতি',
    tags: ['Hypertension', 'Cardiology', 'Management'],
    likes: 203,
    views: 1100,
  },
  {
    id: '6',
    title: 'Surgical Techniques - Suturing',
    titleBangla: 'অস্ত্রোপচার - সেলাই প্রযুক্তি',
    duration: '30:45',
    thumbnail: 'https://via.placeholder.com/400x250/F44336/white?text=Surgical+Suturing',
    category: 'Surgery',
    categoryBangla: 'সার্জারি',
    difficulty: 'Advanced',
    watched: false,
    progress: 0,
    instructor: 'প্রফেসর জামাল উদ্দিন',
    description: 'বিভিন্ন ধরনের সার্জিক্যাল সেলাই ও তার প্রয়োগ',
    tags: ['Surgery', 'Suturing', 'Techniques'],
    likes: 278,
    views: 1650,
  }
];

export default function MedicalVideoSection(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = ['all', 'Anatomy', 'Physiology', 'Pharmacology', 'Pathology', 'Internal Medicine', 'Surgery'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#757575';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Anatomy': return '#E91E63';
      case 'Physiology': return '#2196F3';
      case 'Pharmacology': return '#4CAF50';
      case 'Pathology': return '#FF9800';
      case 'Internal Medicine': return '#9C27B0';
      case 'Surgery': return '#F44336';
      default: return '#757575';
    }
  };

  const handleVideoWatch = (videoId: string) => {
    router.push({
      pathname: '/video-player',
      params: { videoId },
    });
  };

  const filteredVideos = medicalVideoTopics.filter(video => {
    const categoryMatch = selectedCategory === 'all' || video.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || video.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const watchedVideos = medicalVideoTopics.filter(video => video.watched).length;

  // Calculate total hours in hh:mm
  const totalMinutes = medicalVideoTopics.reduce((acc, video) => {
    const [minutes, seconds] = video.duration.split(':').map(Number);
    return acc + minutes + seconds / 60;
  }, 0);
  const totalHours = `${Math.floor(totalMinutes / 60)}h ${Math.round(totalMinutes % 60)}m`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <Text style={styles.header}>Medical Video Section</Text>
        <Text style={styles.subHeader}>
          Watched: {watchedVideos}/{medicalVideoTopics.length} | Total: {totalHours}
        </Text>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filterChip,
                selectedCategory === cat && { backgroundColor: getCategoryColor(cat) }
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[
                styles.filterText,
                selectedCategory === cat && { color: '#fff' }
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Difficulty Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {difficulties.map(diff => (
            <TouchableOpacity
              key={diff}
              style={[
                styles.filterChip,
                selectedDifficulty === diff && { backgroundColor: getDifficultyColor(diff) }
              ]}
              onPress={() => setSelectedDifficulty(diff)}
            >
              <Text style={[
                styles.filterText,
                selectedDifficulty === diff && { color: '#fff' }
              ]}>
                {diff}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Video Cards */}
        {filteredVideos.map(video => (
          <TouchableOpacity
            key={video.id}
            style={styles.card}
            onPress={() => handleVideoWatch(video.id)}
          >
            <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
            <View style={styles.cardInfo}>
              <Text style={styles.title}>{video.title}</Text>
              <Text style={styles.subtitle}>{video.titleBangla}</Text>
              <Text style={styles.meta}>
                {video.duration} • {video.instructor}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <Text style={[styles.tag, { backgroundColor: getCategoryColor(video.category) }]}>
                  {video.category}
                </Text>
                <Text style={[styles.tag, { backgroundColor: getDifficultyColor(video.difficulty) }]}>
                  {video.difficulty}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff',marginTop: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginTop: 10, marginHorizontal: 15 },
  subHeader: { fontSize: 14, color: '#666', marginBottom: 10, marginHorizontal: 15 },
  filterRow: { flexDirection: 'row', marginVertical: 10, paddingHorizontal: 10 },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: { fontSize: 14, color: '#333' },
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 15,
    elevation: 2,
  },
  thumbnail: { width: '100%', height: 180 },
  cardInfo: { padding: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#777', marginVertical: 2 },
  meta: { fontSize: 12, color: '#999' },
  tag: {
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 6,
    fontSize: 12,
  },
});
