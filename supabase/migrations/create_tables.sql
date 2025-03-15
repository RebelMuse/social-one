-- Enhance the profiles table with additional fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS preferred_language text DEFAULT 'English',
ADD COLUMN IF NOT EXISTS disable_markdown boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS elevenlabs_api_key text,
ADD COLUMN IF NOT EXISTS ai_credits integer DEFAULT 50;

-- Create a table for connected social accounts
CREATE TABLE IF NOT EXISTS public.connected_accounts (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    platform text NOT NULL,
    platform_user_id text NOT NULL,
    access_token text,
    refresh_token text,
    token_expires_at timestamp with time zone,
    profile_data jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, platform)
);

-- Create a table for user posts/content
CREATE TABLE IF NOT EXISTS public.posts (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    title text,
    content text,
    platform text,
    status text DEFAULT 'draft',
    scheduled_at timestamp with time zone,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create a table for AI usage tracking
CREATE TABLE IF NOT EXISTS public.ai_usage (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    credits_used integer NOT NULL,
    feature_type text NOT NULL, -- 'image', 'video', 'voice'
    metadata jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;

-- Create policies for connected_accounts
CREATE POLICY "Users can view their own connected accounts"
    ON public.connected_accounts
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own connected accounts"
    ON public.connected_accounts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own connected accounts"
    ON public.connected_accounts
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own connected accounts"
    ON public.connected_accounts
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for posts
CREATE POLICY "Users can view their own posts"
    ON public.posts
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own posts"
    ON public.posts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
    ON public.posts
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
    ON public.posts
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for ai_usage
CREATE POLICY "Users can view their own AI usage"
    ON public.ai_usage
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI usage"
    ON public.ai_usage
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create functions to handle updates
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.connected_accounts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at(); 