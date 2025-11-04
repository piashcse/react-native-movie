# React Native Movie 🚀

[![React Native](https://img.shields.io/badge/React%20Native-v0.82.1-green.svg)](https://facebook.github.io/react-native/)
[![Redux](https://img.shields.io/badge/Redux-5.0.1-764ABC?logo=redux)](https://redux.js.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-v2.9.0-00BFFF?logo=redux)](https://redux-toolkit.js.org/)
[![Zustand](https://img.shields.io/badge/Zustand-v5.0.8-FF0099?logo=react)](https://github.com/pmndrs/zustand)
![badge-Android](https://img.shields.io/badge/Platform-Android-brightgreen)
![badge-iOS](https://img.shields.io/badge/Platform-iOS-lightgray)
[![GitHub license](https://img.shields.io/badge/license-Apache%20License%202.0-blue.svg?style=flat)](https://www.apache.org/licenses/LICENSE-2.0)
<a href="https://github.com/piashcse"><img alt="License" src="https://img.shields.io/static/v1?label=GitHub&message=piashcse&color=C51162"/></a>

React Native Movie App 🎬 - A cross-platform react native app for exploring [The Movie DB](https://www.themoviedb.org) using RTK Query and Redux Toolkit for optimized state and API management.<br>

<p align="center">
  <img width="30%" height="50%" src="https://github.com/piashcse/react-native-movie/blob/main/screenshots/1730741954753_100.PNG" />
  <img width="30%" height="50%" src="https://github.com/piashcse/react-native-movie/blob/main/screenshots/1730741946121_100.PNG" />
  <img width="30%" height="50%" src="https://github.com/piashcse/react-native-movie/blob/main/screenshots/1730741936047_100.PNG" />
  <img width="30%" height="50%" src="https://github.com/piashcse/react-native-movie/blob/main/screenshots/1730741920629_100.PNG" />
  <img width="30%" height="50%" src="https://github.com/piashcse/react-native-movie/blob/main/screenshots/1730741927781_100.PNG" />
  <img width="30%" height="50%" src="https://github.com/piashcse/react-native-movie/blob/main/screenshots/1730741964832_100.PNG" />
</p>

## ✨ Main Features  

### 🎬 Movies  
- 📃 Browse Movie List  
- 🔍 Search Movies  
- 📖 View Movie Details  
- 🎯 Discover Recommended Movies  
- ❤️ Save Favorite Movies (Local Storage)  

### 📺 TV Series  
- 📃 Browse TV Series List  
- 🔍 Search TV Series  
- 📖 View TV Series Details  
- 🎯 Discover Recommended TV Series  
- ❤️ Save Favorite TV Series (Local Storage)  

### 🌟 Celebrities  
- 👑 Popular Celebrities  
- 🔥 Trending Celebrities  
- 🔍 Search Celebrities
- 🎤 Artist Detail  

### ⚡ App Experience  
- 📚 Seamless Pagination with *RTK Query*  
- 🧭 Smooth Bottom Navigation  
- 📡 Network Connection Awareness with SnackBar  

## Project Structure

```
src/
├── assets/
│   └── placeholder.jpeg
├── components/
│   ├── alert-dialog/
│   │   ├── ConfirmationAlert.tsx
│   ├── celebrity-item/
│   │   ├── Celebrity.style.ts
│   │   └── CelebrityItemComponent.tsx
│   ├── favorite/
│   │   ├── FavoriteComponent.style.ts
│   │   └── FavoriteComponent.tsx
│   ├── loading-spinner/
│   │   ├── LoadingSpinner.style.ts
│   │   └── LoadingSpinner.tsx
│   ├── movie-item/
│   │   ├── MovieItem.style.ts
│   │   └── MovieItemComponent.tsx
│   ├── search/
│   │   ├── DynamicSearch.style.ts
│   │   └── DynamicSearch.tsx
│   ├── see-more/
│   │   └── SeeMoreText.tsx
│   └── tvseries-item/
│       ├── TvSeriesItem.style.ts
│       └── TvSeriesItemComponent.tsx
├── constant/
│   ├── appColors.ts
│   └── appConstants.ts
├── hooks/
│   └── useLocalization.ts
├── localization/
│   ├── appString.ts
│   └── i18nLocale.ts
├── navigation/
│   ├── AppNavigation.Style.ts
│   └── AppNavigation.tsx
├── screens/
│   ├── artist-detail/
│   │   ├── ArtistDetail.style.ts
│   │   └── ArtistDetail.tsx
│   ├── celebrity/
│   │   ├── popular/
│   │   │   ├── PopularCelebrity.style.ts
│   │   │   └── PopularCelebrity.tsx
│   │   └── trending/
│   │       ├── TrendingCelebrity.style.ts
│   │       └── TrendingCelebrity.tsx
│   ├── favorite/
│   │   ├── movie/
│   │   │   ├── FavoriteMovie.style.ts
│   │   │   └── FavoriteMovie.tsx
│   │   └── tvseries/
│   │       ├── FavoriteTvSeries.tsx
│   │       └── FovoriteTvSeries.style.ts
│   ├── movie/
│   │   ├── movie-detail/
│   │   │   ├── MovieDetail.style.ts
│   │   │   └── MovieDetail.tsx
│   │   ├── nowplaying/
│   │   │   ├── NowPlayingMovie.style.ts
│   │   │   └── NowPlayingMovie.tsx
│   │   ├── popular/
│   │   │   ├── PopularMovie.style.ts
│   │   │   └── PopularMovie.tsx
│   │   ├── toprated/
│   │   │   ├── TopRatedMovie.style.ts
│   │   │   └── TopRatedMovie.tsx
│   │   └── upcoming/
│   │       ├── UpComingMovie.style.ts
│   │       └── UpComingMovie.tsx
│   └── tvseries/
│       ├── airing_today/
│       │   ├── AiringTodayTvSeries.style.ts
│       │   └── AiringTodayTvSeries.tsx
│       ├── on_the_air/
│       │   ├── OnTheAirTvSeries.style.ts
│       │   └── OnTheAirTvSeries.tsx
│       ├── popular/
│       │   ├── PopularTvSeries.style.ts
│       │   └── PopularTvSeries.tsx
│       ├── top_rated/
│       │   ├── TopRatedTvSeries.style.ts
│       │   └── TopRatedTvSeries.tsx
│       └── tvseries-detail/
│           ├── TvSeriesDetail.style.ts
│           └── TvSeriesDetail.tsx
├── service/
│   ├── axiosInstance.ts
│   ├── baseQuery.ts
│   └── rtk-query/
│       └── rtkQuery.ts
├── store/
│   ├── apErrorMiddleware.ts
│   ├── store.ts
│   └── zustand/
│       ├── apiErrorStore.ts
│       ├── favoriteStore.ts
│       └── mmkv.ts
├── types/
│   ├── ApiRequest/
│   │   └── ApiRequest.ts
│   ├── navigation/
│   │   └── NavigationTypes.ts
│   └── response/
│       ├── ArtistAndCrew.ts
│       ├── ArtistDetail.ts
│       ├── Celebrity.ts
│       ├── CombinedCredit.ts
│       ├── Dates.ts
│       ├── MovieDetail.ts
│       ├── MovieItem.ts
│       ├── MovieResult.ts
│       ├── TvSeriesDetail.ts
│       ├── TvSeriesItem.ts
│       └── TvSeriesResult.ts
├── utils/
│   ├── common.ts
│   └── networkConnection.tsx
```

## Architecture

- RTK Query-Based Architecture (RTK Query - Hooks - reducer)
- Redux
<p float="left"> 
  <a href='https://redux-toolkit.js.org/rtk-query/overview'>
  <img src='https://redux-toolkit.js.org/img/redux-logo-landscape.png' height='50' alt='RTK Query Logo' aria-label='redux-toolkit.js.org/rtk-query' />
</a>
</p>

## Built With 🛠

- [React-Native](https://reactnative.dev/) - React Native brings React's declarative UI framework to iOS and Android. With React Native, you use native UI controls and have full access to the native platform.  
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) - RTK Query is a powerful data fetching and caching tool. It is designed to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.  
- [Axios](https://axios-http.com/) - Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface.  
- [Redux-toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development.  
- [Redux](https://redux.js.org/) - Redux is an open-source JavaScript library for managing and centralizing application state. It is most commonly used with libraries such as React or Angular for building user interfaces.  
- [React-Navigation 7](https://reactnavigation.org/) - Routing and navigation for your React Native apps.  
- [Zustand](https://zustand-demo.pmnd.rs/) - A small, fast and scalable bearbones state-management solution using simplified flux principles. Has a comfy API based on hooks, isn't boilerplatey or opinionated.  
- [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) - ⚡️ The fastest key/value storage for React Native. ~30x faster than AsyncStorage!  
- [FlashList](https://shopify.github.io/flash-list/) - A high-performance list component for React Native, built by Shopify. It provides better performance than FlatList by optimizing rendering for large datasets.
  
## Requirements

- [Node.js](https://nodejs.org/) (latest)
- [Yarn](https://yarnpkg.com/) (latest)

## How to run

- `git clone git@github.com:piashcse/react-native-movie.git`
- `yarn install`

Now, you can choose a command to run the project:

- `yarn ios` to run on iOS simulator
- `yarn android` to run on Android simulator

## 👨 Developed By

<a href="https://twitter.com/piashcse" target="_blank">
  <img src="https://avatars.githubusercontent.com/piashcse" width="80" align="left">
</a>

**Mehedi Hassan Piash**

[![Twitter](https://img.shields.io/badge/-Twitter-1DA1F2?logo=x&logoColor=white&style=for-the-badge)](https://twitter.com/piashcse)
[![Medium](https://img.shields.io/badge/-Medium-00AB6C?logo=medium&logoColor=white&style=for-the-badge)](https://medium.com/@piashcse)
[![Linkedin](https://img.shields.io/badge/-LinkedIn-0077B5?logo=linkedin&logoColor=white&style=for-the-badge)](https://www.linkedin.com/in/piashcse/)
[![Web](https://img.shields.io/badge/-Web-0073E6?logo=appveyor&logoColor=white&style=for-the-badge)](https://piashcse.github.io/)
[![Blog](https://img.shields.io/badge/-Blog-0077B5?logo=readme&logoColor=white&style=for-the-badge)](https://piashcse.blogspot.com)

# License

```
Copyright 2023 piashcse (Mehedi Hassan Piash)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
