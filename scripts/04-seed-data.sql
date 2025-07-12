-- Insert sample categories and data for development
INSERT INTO auth.users (id, email, encrypted_password) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'emma@example.com', ''),
  ('550e8400-e29b-41d4-a716-446655440002', 'alex@example.com', ''),
  ('550e8400-e29b-41d4-a716-446655440003', 'maya@example.com', '')
ON CONFLICT DO NOTHING;

INSERT INTO users (id, name, email, bio, points) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Emma Style', 'emma@example.com', 'Sustainable fashion enthusiast 🌱', 250),
  ('550e8400-e29b-41d4-a716-446655440002', 'Alex Green', 'alex@example.com', 'Vintage collector and eco-warrior', 180),
  ('550e8400-e29b-41d4-a716-446655440003', 'Maya Earth', 'maya@example.com', 'Minimalist wardrobe advocate', 320)
ON CONFLICT (id) DO NOTHING;

-- Insert sample items (these will be created by actual users)
-- This is just for reference - remove in production
INSERT INTO items (title, description, category, size, condition, tags, images, owner_id, status) VALUES
  (
    'Vintage Denim Jacket',
    'Classic 90s denim jacket in excellent condition. Perfect for layering!',
    'outerwear',
    'M',
    'excellent',
    ARRAY['vintage', 'casual', 'denim'],
    ARRAY['/placeholder.svg?height=400&width=300'],
    '550e8400-e29b-41d4-a716-446655440001',
    'available'
  ),
  (
    'Flowy Boho Dress',
    'Beautiful bohemian maxi dress with floral print. Great for summer!',
    'dresses',
    'S',
    'good',
    ARRAY['boho', 'floral', 'maxi'],
    ARRAY['/placeholder.svg?height=400&width=300'],
    '550e8400-e29b-41d4-a716-446655440002',
    'available'
  ),
  (
    'Minimalist White Tee',
    'High-quality organic cotton t-shirt. Timeless and versatile.',
    'tops',
    'M',
    'new',
    ARRAY['minimalist', 'organic', 'basic'],
    ARRAY['/placeholder.svg?height=400&width=300'],
    '550e8400-e29b-41d4-a716-446655440003',
    'available'
  )
ON CONFLICT DO NOTHING;

-- Insert sample feed posts
INSERT INTO feed_posts (user_id, item_id, image, caption) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440001',
    (SELECT id FROM items WHERE title = 'Vintage Denim Jacket' LIMIT 1),
    '/placeholder.svg?height=400&width=300',
    'Loving this vintage find! Perfect for the fall season 🍂'
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002',
    (SELECT id FROM items WHERE title = 'Flowy Boho Dress' LIMIT 1),
    '/placeholder.svg?height=400&width=300',
    'Feeling like a bohemian goddess in this beautiful dress ✨'
  )
ON CONFLICT DO NOTHING;

-- Sample categories for reference
-- Categories: tops, bottoms, dresses, outerwear, accessories, shoes
-- Sizes: XS, S, M, L, XL, XXL  
-- Conditions: new, excellent, good, fair
-- Tags: minimalist, boho, vintage, streetwear, formal, casual, cottagecore, dark academia, y2k, grunge, preppy, romantic

-- The application will populate real data through user interactions
