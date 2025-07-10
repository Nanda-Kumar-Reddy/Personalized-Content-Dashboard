import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  category: string;
  type: "news" | "movie" | "music" | "social";
  publishedAt?: string;
  isFavorite?: boolean;
}

interface ContentState {
  feed: ContentItem[];
  trending: ContentItem[];
  favorites: ContentItem[];
  searchResults: ContentItem[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: ContentState = {
  feed: [],
  trending: [],
  favorites: [],
  searchResults: [],
  loading: false,
  error: null,
  searchQuery: "",
};

// Mock API calls for demo purposes
export const fetchNews = createAsyncThunk(
  "content/fetchNews",
  async (categories: string[]) => {
    // Mock news data
    const mockNews: ContentItem[] = [
      {
        id: "1",
        title: "Tech Innovation Breakthrough",
        description:
          "Latest developments in artificial intelligence and machine learning",
        image:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
        category: "technology",
        type: "news",
        publishedAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Sports Championship Finals",
        description: "Exciting match between top teams in the league",
        image:
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400",
        category: "sports",
        type: "news",
        publishedAt: new Date().toISOString(),
      },
    ];

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockNews;
  }
);

export const fetchMovies = createAsyncThunk("content/fetchMovies", async () => {
  // Mock movie data
  const mockMovies: ContentItem[] = [
    {
      id: "3",
      title: "The Matrix Resurrections",
      description: "Neo must choose between reality and the Matrix once again",
      image:
        "https://images.unsplash.com/photo-1489599510919-5e6b6c8c1adb?w=400",
      category: "action",
      type: "movie",
    },
    {
      id: "4",
      title: "Dune: Part Two",
      description: "Paul Atreides unites with Chani and the Fremen",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
      category: "sci-fi",
      type: "movie",
    },
  ];

  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockMovies;
});

export const fetchSocialPosts = createAsyncThunk(
  "content/fetchSocialPosts",
  async () => {
    // Mock social media data
    const mockSocial: ContentItem[] = [
      {
        id: "5",
        title: "Trending: #TechTalk",
        description: "Join the conversation about emerging technologies",
        image:
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
        category: "technology",
        type: "social",
      },
    ];

    await new Promise((resolve) => setTimeout(resolve, 600));
    return mockSocial;
  }
);

export const searchContent = createAsyncThunk(
  "content/searchContent",
  async (query: string, { getState }) => {
    const state = getState() as { content: ContentState };
    const allContent = [...state.content.feed, ...state.content.trending];

    // Mock search with filter
    const results = allContent.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );

    await new Promise((resolve) => setTimeout(resolve, 300));
    return results;
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const updateFavorite = (items: ContentItem[]) => {
        const item = items.find((i) => i.id === itemId);
        if (item) {
          item.isFavorite = !item.isFavorite;
        }
      };

      updateFavorite(state.feed);
      updateFavorite(state.trending);
      updateFavorite(state.searchResults);

      // Update favorites list
      const allContent = [...state.feed, ...state.trending];
      state.favorites = allContent.filter((item) => item.isFavorite);
    },
    reorderFeed: (state, action: PayloadAction<ContentItem[]>) => {
      state.feed = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = [...state.feed, ...action.payload];
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.trending = [...state.trending, ...action.payload];
      })
      .addCase(fetchSocialPosts.fulfilled, (state, action) => {
        state.feed = [...state.feed, ...action.payload];
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  },
});

export const {
  toggleFavorite,
  reorderFeed,
  setSearchQuery,
  clearSearchResults,
} = contentSlice.actions;
export default contentSlice.reducer;
