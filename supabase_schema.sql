-- Create a table for user profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  full_name TEXT,
  avatar_url TEXT,
  risk_tolerance TEXT CHECK (risk_tolerance IN ('low', 'medium', 'high')),
  investment_goal TEXT
);

-- Enable Row Level Security for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create a table for user portfolios
CREATE TABLE IF NOT EXISTS public.portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  asset_symbol TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  quantity DECIMAL NOT NULL DEFAULT 0,
  average_buy_price DECIMAL NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security for portfolios
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolios
CREATE POLICY "Users can view own portfolio." ON public.portfolios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolio items." ON public.portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio items." ON public.portfolios
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolio items." ON public.portfolios
  FOR DELETE USING (auth.uid() = user_id);

-- Create a table for user transactions
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  asset_symbol TEXT NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('buy', 'sell')) NOT NULL,
  quantity DECIMAL NOT NULL,
  price_at_transaction DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security for transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for transactions
CREATE POLICY "Users can view own transactions." ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions." ON public.transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create a table for user watchlists
CREATE TABLE IF NOT EXISTS public.watchlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  asset_symbol TEXT NOT NULL,
  asset_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, asset_symbol)
);

-- Enable Row Level Security for watchlists
ALTER TABLE public.watchlists ENABLE ROW LEVEL SECURITY;

-- Create policies for watchlists
CREATE POLICY "Users can view own watchlist." ON public.watchlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own watchlist items." ON public.watchlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own watchlist items." ON public.watchlists
  FOR DELETE USING (auth.uid() = user_id);

-- Set up a trigger to create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
