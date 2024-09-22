import React, { useState} from 'react';
import Loading from '../../components/loading/Loading';
import MovieComponent from '../../components/movielist/MovieComponent.tsx';
import styles from './TopRatedStyle'
import {View} from "react-native";
import {useGetTopRatedMovieQuery} from "../../redux/query/RTKQuery.ts";
import {useNavigation} from "@react-navigation/native";

const TopRated = () => {
    const navigation = useNavigation();
    const [pageNumber, setPageNumber] = useState(1)
    const { data = [], error, isLoading } = useGetTopRatedMovieQuery(pageNumber.toString())
    // main view with loading while api call is going on
    return (<View style={styles.mainView}>
        <MovieComponent
            movies={data}
            loadMoreData={() => {
                setPageNumber( pageNumber + 1)
            }}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}/>
        {isLoading && <Loading/>}
    </View>);
}
export default TopRated
