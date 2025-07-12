-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  bio TEXT,
  profile_pic TEXT,
  points INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  size TEXT NOT NULL,
  category TEXT NOT NULL,
  condition TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'swapped', 'in_process')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create swap_requests table
CREATE TABLE IF NOT EXISTS swap_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_points table for tracking point activities
CREATE TABLE IF NOT EXISTS user_points (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity TEXT NOT NULL,
  points INTEGER NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feed_posts table for social feed
CREATE TABLE IF NOT EXISTS feed_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(id) ON DELETE SET NULL,
  image TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_flags table for content moderation
CREATE TABLE IF NOT EXISTS admin_flags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_items_owner_id ON items(owner_id);
CREATE INDEX IF NOT EXISTS idx_items_status ON items(status);
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
CREATE INDEX IF NOT EXISTS idx_swap_requests_requester_id ON swap_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_swap_requests_item_id ON swap_requests(item_id);
CREATE INDEX IF NOT EXISTS idx_user_points_user_id ON user_points(user_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_user_id ON feed_posts(user_id);
