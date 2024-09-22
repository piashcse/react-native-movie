import React, { useState} from 'react';
import Loading from '../../components/loading/Loading';
import MovieItem from '../../components/movielist/MovieItem.tsx';
import styles from './UpComingStyle'
import {View} from "react-native";
import { useGetUpcomingMovieQuery} from "../../redux/query/RTKQuery.ts";
import {useNavigation} from "@react-navigation/native";

const UpComing = () => {
    const navigation = useNavigation();
    const [pageNumber, setPageNumber] = useState(1)
    const { data = [], error, isLoading } = useGetUpcomingMovieQuery(pageNumber.toString())

    // main view with loading while api call is going on
    return (<View style={styles.mainView}>
        <MovieItem
            movies={data}
            loadMoreData={() => {
                setPageNumber( pageNumber + 1)
            }}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item?.id})}/>
        {isLoading && <Loading/>}
    </View>);
}
export default UpComing
