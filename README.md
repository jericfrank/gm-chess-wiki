# React + TypeScript + Vite + Tailwind Css

## Key logic

This fetches and paginates chess grandmaster data from Chess.com. It first retrieves a list of GM usernames, stores them in localStorage, and automatically loads the first batch of player details. Data is fetched in batches (default: 10 players per request) to avoid hitting API limits. Fetched data is persisted to localStorage to improve performance and prevent redundant API calls on page reloads. The hook also handles loading states, pagination, and basic error handling.

## Last Online Display

Chess api returns very old last_online data, so I added a fallback to display a human-readable format if it's older than 24 hours.
