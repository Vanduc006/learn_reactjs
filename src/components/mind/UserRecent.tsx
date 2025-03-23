import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select1, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, FileText, BookOpen, Languages, ChevronRight } from "lucide-react"

type ActivityType = "flashcard" | "quiz" | "translation" | "all"
type SortOrder = "newest" | "oldest"

interface Activity {
  id: string
  type: "flashcard" | "quiz" | "translation"
  title: string
  date: string
  time: string
  description: string
  icon: JSX.Element
}

const UserRecent = () => {
    const [filter, setFilter] = useState<ActivityType>("all")
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
  const [activities, setActivities] = useState<Activity[]>([])

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    const sampleActivities: Activity[] = [
      {
        id: "1",
        type: "flashcard",
        title: "Spanish Vocabulary",
        date: "2023-11-15",
        time: "14:30",
        description: "Created 15 new flashcards for Spanish vocabulary",
        icon: <FileText className="h-5 w-5 text-blue-500" />,
      },
      {
        id: "2",
        type: "quiz",
        title: "French Grammar Quiz",
        date: "2023-11-14",
        time: "10:15",
        description: "Created a quiz on French verb conjugations",
        icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      },
      {
        id: "3",
        type: "translation",
        title: "Japanese Translation",
        date: "2023-11-13",
        time: "16:45",
        description: "Translated 5 paragraphs from English to Japanese",
        icon: <Languages className="h-5 w-5 text-green-500" />,
      },
      {
        id: "4",
        type: "flashcard",
        title: "German Phrases",
        date: "2023-11-12",
        time: "09:20",
        description: "Created 10 flashcards for common German phrases",
        icon: <FileText className="h-5 w-5 text-blue-500" />,
      },
      {
        id: "5",
        type: "quiz",
        title: "Italian Vocabulary Test",
        date: "2023-11-10",
        time: "13:10",
        description: "Created a quiz on Italian food vocabulary",
        icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      },
    ]

    // Filter activities based on selected filter
    let filteredActivities = sampleActivities
    if (filter !== "all") {
      filteredActivities = sampleActivities.filter((activity) => activity.type === filter)
    }

    // Sort activities based on selected sort order
    filteredActivities.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime()
      const dateB = new Date(`${b.date} ${b.time}`).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    setActivities(filteredActivities)
  }, [filter, sortOrder])

  return (
<div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-xl font-bold mb-2">Activity History</h1>
        <p className="text-muted-foreground">Track all your learning activities in one place</p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <Tabs
          defaultValue="all"
          className="w-full md:w-auto"
          onValueChange={(value) => setFilter(value as ActivityType)}
        >
          <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
            <TabsTrigger value="quiz">Quizzes</TabsTrigger>
            <TabsTrigger value="translation">Translations</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select1 value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
          <SelectTrigger className="w-full md:w-[180px] bg-white text-black mt-2 mb-5">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select1>
      </div>

      <div className="relative pl-5 border-l-2 border-gray-500 dark:border-gray-700 space-y-8">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[41px] p-2 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                {activity.icon}
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-semibold">{activity.title}</h3>
                  
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4 ml-3 mr-1" />
                    <span>{activity.time}</span>
                </div>
                <p className="text-muted-foreground mb-4">{activity.description}</p>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="group">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No activities found with the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserRecent