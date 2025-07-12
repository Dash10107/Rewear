-- Function to update user points when activities happen
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the user's total points
  UPDATE users 
  SET points = (
    SELECT COALESCE(SUM(points), 0) 
    FROM user_points 
    WHERE user_id = NEW.user_id
  )
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update user points
CREATE TRIGGER trigger_update_user_points
  AFTER INSERT ON user_points
  FOR EACH ROW
  EXECUTE FUNCTION update_user_points();

-- Function to handle user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, name, email, points)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Fashion Lover'),
    NEW.email,
    100
  );
  
  -- Give welcome bonus points
  INSERT INTO user_points (user_id, activity, points)
  VALUES (NEW.id, 'welcome_bonus', 100);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for new user signup
CREATE TRIGGER trigger_handle_new_user
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
