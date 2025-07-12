-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE swap_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_flags ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Items table policies
CREATE POLICY "Anyone can view available items" ON items FOR SELECT USING (status = 'available' OR owner_id = auth.uid());
CREATE POLICY "Users can insert own items" ON items FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own items" ON items FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete own items" ON items FOR DELETE USING (auth.uid() = owner_id);

-- Swap requests policies
CREATE POLICY "Users can view swap requests for their items" ON swap_requests FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM items WHERE items.id = swap_requests.item_id AND items.owner_id = auth.uid()
  ) OR requester_id = auth.uid()
);
CREATE POLICY "Users can create swap requests" ON swap_requests FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Item owners can update swap requests" ON swap_requests FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM items WHERE items.id = swap_requests.item_id AND items.owner_id = auth.uid()
  )
);

-- User points policies
CREATE POLICY "Users can view own points" ON user_points FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert points" ON user_points FOR INSERT WITH CHECK (true);

-- Feed posts policies
CREATE POLICY "Anyone can view feed posts" ON feed_posts FOR SELECT USING (true);
CREATE POLICY "Users can insert own posts" ON feed_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON feed_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON feed_posts FOR DELETE USING (auth.uid() = user_id);

-- Admin flags policies (admin only)
CREATE POLICY "Admins can manage flags" ON admin_flags FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users WHERE users.id = auth.uid() AND users.email LIKE '%@rewear.admin'
  )
);
