import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Type definitions
interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface Answers {
  [key: number]: string;
}

interface QuestionCardProps {
  question: Question;
  qIndex: number;
  answers: Answers;
  onSelect: (qIndex: number, option: string) => void;
  quizEnded: boolean;
}

// Dummy 20 questions with answers
const questions: Question[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  question: `Question ${i + 1}: What is the answer?`,
  options: ["Option A", "Option B", "Option C", "Option D"],
  answer: "Option A",  
}));

// Separate Question Component with memo for performance
const QuestionCard = memo<QuestionCardProps>(({ 
  question, 
  qIndex, 
  answers, 
  onSelect, 
  quizEnded 
}) => {
  const isAnswered: boolean = answers[qIndex] !== undefined;
  
  return (
    <View style={styles.card}>
      <Text style={styles.qNumber}>Q{qIndex + 1}</Text>
      <Text style={styles.question}>{question.question}</Text>

      {question.options.map((opt: string, oIdx: number) => {
        const isSelected: boolean = answers[qIndex] === opt;
        
        return (
          <TouchableOpacity
            key={oIdx}
            style={[
              styles.optionBtn,
              isSelected && { backgroundColor: "#6c63ff" },
              (isAnswered || quizEnded) && !isSelected && { opacity: 0.6 },
            ]}
            disabled={isAnswered || quizEnded}
            onPress={() => onSelect(qIndex, opt)}
          >
            <Text
              style={[
                styles.optionText,
                isSelected && { color: "#fff" },
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

// Set display name for debugging
QuestionCard.displayName = 'QuestionCard';

export default function ExamSection(): JSX.Element {
  const [answers, setAnswers] = useState<Answers>({});
  console.log("answers:", answers);
  const [globalTime, setGlobalTime] = useState<number>(600); // 10 minutes
  const [quizEnded, setQuizEnded] = useState<boolean>(false);

  // Global timer countdown
  useEffect(() => {
    if (globalTime > 0 && !quizEnded) {
      const timer: NodeJS.Timeout = setTimeout(() => {
        setGlobalTime((prev: number) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (globalTime === 0) {
      setQuizEnded(true);
    }
  }, [globalTime, quizEnded]);

  // Handle option selection with useCallback for optimization
  const handleSelect = useCallback((qIndex: number, option: string): void => {
    if (quizEnded) return;
    if (answers[qIndex]) return; // prevent changing answer after selection
    
    console.log("Selected:", option, "for question:", qIndex + 1);
    setAnswers((prev: Answers) => ({ ...prev, [qIndex]: option }));
  }, [answers, quizEnded]);

  // Handle quiz submission
  const handleSubmit = useCallback((): void => {
    let score: number = 0;
    questions.forEach((q: Question, idx: number) => {
      if (answers[idx] === q.answer) score++;
    });
    
    alert(`Quiz Finished! Score: ${score}/${questions.length}`);
    setQuizEnded(true);
    
    router.push({
      pathname: "/result",
      params: {
        score: score.toString(),
        total: questions.length.toString(),
      },
    });
  }, [answers]);

  // Format time from seconds to MM:SS
  const formatTime = (sec: number): string => {
    const m: number = Math.floor(sec / 60);
    const s: number = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Calculate progress percentage
  const progressPercentage: number = Math.round(
    (Object.keys(answers).length / questions.length) * 100
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Global Timer */}
      <View style={styles.globalTimerBox}>
        <Ionicons name="time-outline" size={20} color="#fff" />
        <Text style={styles.globalTimerText}>
          Time Left: {formatTime(globalTime)}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Progress: {Object.keys(answers).length}/{questions.length} ({progressPercentage}%)
        </Text>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {questions.map((q: Question, idx: number) => (
          <QuestionCard
            key={q.id}
            question={q}
            qIndex={idx}
            answers={answers}
            onSelect={handleSelect}
            quizEnded={quizEnded}
          />
        ))}

        {/* Submit button */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            quizEnded && { backgroundColor: "#ccc" },
            Object.keys(answers).length === 0 && { opacity: 0.5 }
          ]}
          onPress={handleSubmit}
          disabled={quizEnded || Object.keys(answers).length === 0}
        >
          <Text style={styles.submitText}>
            {quizEnded ? "Quiz Ended" : "Submit Quiz"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar barStyle="dark-content" ></StatusBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f9f9f9", 
    padding: 15, 
    marginTop: 20
  },
  globalTimerBox: {
    flexDirection: "row",
    backgroundColor: "#6c63ff",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  globalTimerText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16, 
    marginLeft: 8 
  },
  progressContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#6c63ff",
    borderRadius: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  qNumber: { 
    fontWeight: "bold", 
    fontSize: 16, 
    color: "#6c63ff", 
    marginBottom: 8 
  },
  question: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#333", 
    marginBottom: 10 
  },
  optionBtn: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    marginBottom: 8,
  },
  optionText: { 
    fontSize: 15, 
    color: "#333" 
  },
  submitBtn: {
    backgroundColor: "#6c63ff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  submitText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});