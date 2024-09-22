import React, {useState} from 'react';
import Loading from '../../components/loading/Loading';
import MovieItem from '../../components/movielist/MovieItem.tsx';
import {View} from 'react-native';
import styles from './HomeStyle'
import {useGetNowPlayingMovieQuery} from "../../redux/query/RTKQuery.ts";
import {useNavigation} from "@react-navigation/native";


const Home = () => {
    const navigation = useNavigation();
    const [pageNumber, setPageNumber] = useState(1)
    const { data: movies = [], error, isLoading } = useGetNowPlayingMovieQuery(pageNumber.toString())

    return (<View style={styles.mainView}>
        <MovieItem
            movies={movies}
            loadMoreData={() => {
                setPageNumber(pageNumber + 1)
            }}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}/>
        {isLoading && <Loading/>}
    </View>);
}
export default Home
