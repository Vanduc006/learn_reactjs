"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, ArrowRight, HelpCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion";

// Sample quiz data - replace with your actual data
const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    hint: "This city is known as the 'City of Light'.",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    hint: "It's named after the Roman god of war.",
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: "Blue Whale",
    hint: "It's an aquatic mammal that can grow up to 100 feet long.",
  },
]

export default function QuizComponent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quizCurrentQuestion")
      return saved ? Number.parseInt(saved, 10) : 0
    }
    return 0
  })

  const [selectedAnswer, setSelectedAnswer] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("quizSelectedAnswer") || ""
    }
    return ""
  })

  const [showHint, setShowHint] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("quizShowHint") === "true"
    }
    return false
  })

  const [answerRevealed, setAnswerRevealed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("quizAnswerRevealed") === "true"
    }
    return false
  })

  const [isCorrect, setIsCorrect] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("quizIsCorrect") === "true"
    }
    return false
  })

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("quizCurrentQuestion", currentQuestionIndex.toString())
      localStorage.setItem("quizSelectedAnswer", selectedAnswer)
      localStorage.setItem("quizShowHint", showHint.toString())
      localStorage.setItem("quizAnswerRevealed", answerRevealed.toString())
      localStorage.setItem("quizIsCorrect", isCorrect.toString())
    }
  }, [currentQuestionIndex, selectedAnswer, showHint, answerRevealed, isCorrect])

  const currentQuestion = quizData[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100

  const handleAnswerSelect = (value: string) => {
    if (!answerRevealed) {
      setSelectedAnswer(value)
    }
  }

  const handleShowAnswer = () => {
    setAnswerRevealed(true)
    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)

    // Save this answer for scoring
    if (typeof window !== "undefined") {
      localStorage.setItem(`quizAnswer_${currentQuestionIndex}`, selectedAnswer)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
      setShowHint(false)
      setAnswerRevealed(false)
    } else {
      // Last question was answered
      // You could show a completion message or reset
      console.log("Quiz completed! Your score: " + calculateScore() + " out of " + quizData.length)
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

  const calculateScore = () => {
    // This is a simple implementation - you might want to track all answers
    let score = 0
    if (typeof window !== "undefined") {
      for (let i = 0; i < quizData.length; i++) {
        const key = `quizAnswer_${i}`
        const savedAnswer = localStorage.getItem(key)
        if (savedAnswer === quizData[i].correctAnswer) {
          score++
        }
      }
    }
    return score
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setShowHint(false)
    setAnswerRevealed(false)
    setIsCorrect(false)
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("quizCurrentQuestion")
      localStorage.removeItem("quizSelectedAnswer")
      localStorage.removeItem("quizShowHint")
      localStorage.removeItem("quizAnswerRevealed")
      localStorage.removeItem("quizIsCorrect")
    }
  }

  return (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        animate={{ opacity: 1 , y:0}}
     className="max-w-xl mx-auto ">
      <div className="mb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {quizData.length}
          </span>
          <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>
      <div className="bg-white mb-2 p-2 rounded-xl text-center" onClick={resetQuiz}>
        Reset Quiz
      </div>
      {/* <Button variant="outline" onClick={resetQuiz} className="ml-auto">
        Reset Quiz
        </Button> */}
      <Card className="mb-6 p-0">
        <CardHeader>
          <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect} className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div
                key={option}
                className={`flex items-center space-x-2 rounded-md border p-3 ${
                  answerRevealed && option === currentQuestion.correctAnswer
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                    : answerRevealed && option === selectedAnswer && option !== currentQuestion.correctAnswer
                      ? "border-red bg-red-50 dark:bg-red-950/20"
                      : "border-gray-200 dark:border-gray-800"
                }`}
              >
                <RadioGroupItem value={option} id={option} disabled={answerRevealed} />
                <Label htmlFor={option} className="flex-grow cursor-pointer font-medium">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showHint && (
            <Alert className="mt-4 bg-[#4871f7] text-white">
              
              <AlertTitle className="flex"> <AlertCircle className="h-4 w-4 text-white mr-2" /> Hint</AlertTitle>
              <AlertDescription>{currentQuestion.hint}</AlertDescription>
            </Alert>
          )}

          {answerRevealed && (
            <Alert className={`mt-4 ${isCorrect ? "border-green-500" : "border-red"}`}>
              <AlertTitle>{isCorrect ? "Correct!" : "Incorrect!"}</AlertTitle>
              <AlertDescription>
                {isCorrect
                  ? "Great job! You selected the right answer."
                  : `The correct answer is ${currentQuestion.correctAnswer}.`}
              </AlertDescription>
            </Alert>
          )}

        <div className="mt-5">
            <Button onClick={toggleHint} disabled={answerRevealed}>
              <HelpCircle className="mr-2 h-4 w-4" />
              {showHint ? "Ẩn gợi ý" : "Gợi ý"}
            </Button>
        </div>
        </CardContent>


 
        <CardFooter className="flex">

          <div className="">
            {!answerRevealed ? (
              <Button onClick={handleShowAnswer} disabled={!selectedAnswer}>
                Hiện đáp án
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex >= quizData.length - 1 && !answerRevealed}
              >
                {currentQuestionIndex >= quizData.length - 1 ? "Bạn đã hoàn thành" : "Câu tiếp"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

