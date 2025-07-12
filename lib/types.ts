export interface User {
  id: string
  name: string
  email: string
  bio?: string
  profile_pic?: string
  points: number
  created_at: string
  items_listed?: number // Added for leaderboard
  swaps_completed?: number // Added for leaderboard
}

export interface Item {
  id: string
  title: string
  description: string
  tags: string[]
  size: string
  category: string
  condition: string
  images: string[]
  owner_id: string
  status: "available" | "swapped" | "in_process"
  created_at: string
  owner?: User
}

export interface SwapRequest {
  id: string
  requester_id: string
  item_id: string
  status: "pending" | "accepted" | "rejected"
  created_at: string
  requester?: User
  item?: Item
}

export interface FeedPost {
  id: string
  user_id: string
  item_id?: string
  image: string
  caption: string
  created_at: string
  user?: User
  item?: Item
}

// New type for leaderboard entries
export interface LeaderboardEntry {
  user: User
  points: number
  items_listed: number
  swaps_completed: number
}
