# earmarked – Frontend

## Overview

React (TypeScript) frontend for earmarked, an app for earmarking albums you want to listen to. Search Spotify, earmark
albums with an optional note, mark them as listened, and browse your list with sorting, search and filters. Mobile-first
and responsive, talking to the backend through the gateway.

## Tech Stack

- Frontend: React + TypeScript
- Routing: React Router (declarative mode)
- Server state: TanStack React Query
- HTTP client: Axios
- Optimization: React Compiler
- Styling: CSS Modules with design tokens (custom fonts and palette, no UI library)
- Notifications: sonner

## Features

- Register, activate account, login, logout, resend activation
- Forgot, reset and change password, delete account
- Guest-only and protected routes
- Dashboard with recent earmarks and Spotify album search
- Dedicated album page: quick earmark, earmark with a note, edit, delete, mark as listened
- Earmarks page with "Load more" pagination, sorting, text search and status/note filters (all state kept in the URL)
- Batch earmark lookup for search results (one request per search)
- Loading skeletons, empty states and error toasts

## Authentication Flow

- Authentication is handled by the backend; tokens live in HttpOnly cookies, so no tokens in JS
- The current user is loaded via `GET /me` (shared `useCurrentUser` query)
- Axios interceptor:
    - On 401, calls the refresh endpoint once and retries the request
    - If refresh fails, clears the cached user and the session ends
- Requests are sent with credentials; the gateway's CORS config allows the frontend origin

## Project Structure

- `src/features/{auth,earmark,spotify}`: each with `api`, `components`, `hooks` and `queryKeys.ts`
- `src/components`, `src/pages`, `src/hooks`, `src/lib`: shared code

## Future Improvements

- Deployment
- Tags, ratings and reviews
- Animations and a smoother interface

## Attribution

Album data and artwork are provided by Spotify.