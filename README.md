# DarMovies Dashboard

## Overview

DarMovies Dashboard is a React-based web application that displays a list of movies fetched from [The Movie Database (TMDb)](https://www.themoviedb.org). The application features a sidebar navigation, a main content area to display movies sorted by categories, and a search and filter functionality.

## Features

- **List of Movies**: Display movies sorted by categories (e.g., Popular, Discover).
- **Left Sidebar**: Contains static navigation links.
- **Lazy Loading**: Movies are loaded using lazy loading (pagination) to enhance performance.

## Installation

1. Clone the repository:

```
git clone https://github.com/yoginderkumar/darmovies.git
```

2. Navigate to the project directory:

```
cd darmovies
```

3. Install dependencies:

```
npm install
```

4. Setup ENVs:
   Get your API key from [The Movie Database (TMDb)](https://www.themoviedb.org). Create a `.env` file in the root of the project and paste your key in this format.
   ```
   REACT_APP_API_KEY=YOUR_API_KEY
   REACT_APP_BASE_URL=https://api.themoviedb.org
   ```

## Usage

1. Start the development server:

```
npm start
```

2. Open your browser and visit `http://localhost:3000` to access the DarMovies Dashboard application.

## Project Structure

- `src/components`: Contains the components for the application.
  - `Icons.tsx`: Provides all the icons used in the application.
  - `index.tsx`: Contains common components used in the app like Inline, Stack, and Box.
  - `Movies.tsx`: Renders all the movie-related components like MovieCard, MoviePoster.
- `src/constants`: Contains the data files.
  - `genres.ts`: Holds the static data from TheMovieDB to map with different genre IDs received from the API.
- `src/layouts`: Contains layout for the dashboard.
  - `Layout.tsx`: Defines the common layout for the dashboard.
  - `NavIcons.tsx`: Maps all the icons used in the sidebar component.
- `src/pages`: Contains all the different pages to display on each route.
- `src/services`: Contains services for API interaction.
  - `api.tsx`: Defines global API client for the app.
  - `endpoints.tsx`: Provides all the endpoints used in the app.
  - `services.tsx`: Provides methods that use APIs from TheMovieDB.
- `src/types`: Contains types/interfaces for type-safe data received from TheMovieDB APIs.
  - `movie.types.tsx`: Provides all the movie-related types used.

## Dependencies

The project utilizes the following dependencies:

- `react`: The core React library.
- `react-dom`: Provides DOM-specific methods for React.
- `styled-components`: Used for styling components with CSS-in-JS.
- `axios`: Provides a way of fetching data.
- `react-router-dom`: Helps users navigate the application.

## Performance Optimizations

To ensure a smooth and responsive user experience, the following performance optimizations have been implemented:

- **Memoization**: Components and functions are memoized using the `memo` higher-order component and the `useMemo` hook, preventing unnecessary re-renders and improving performance.
- **Lazy Loading**: Components and images are loaded only when required to improve overall app performance.

## Scope of Improvement

- **Responsiveness**: Enhance the responsiveness of the application to support different screen sizes.
- **Filters**: Implement additional filters to enhance the movie search experience.

## Note

- **Right Sidebar with Search and Filters**: Due to limitations from APIs as TheMovieDB doesn't support mentioned filters as of now, the search and filter functionality on the right sidebar has not been implemented in this version.
