import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import Loading from '../../components/loading/Loading';
import MovieComponent from '../../components/movielist/MovieComponent.tsx';
import styles from './PopularStyle'
import {View} from "react-native";
import { useGetPopularMovieQuery} from "../../redux/query/RTKQuery.ts";
import {useNavigation} from "@react-navigation/native";

const Popular = () => {
    const navigation = useNavigation();
    const [pageNumber, setPageNumber] = useState(1)
    const { data = [], error, isLoading } = useGetPopularMovieQuery(pageNumber.toString())

    // main view with loading while api call is going on
    return (<View style={styles.mainView}>
        <MovieComponent
            movies={data}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}
            loadMoreData={() => {
                setPageNumber(pageNumber + 1)
            }}/>
        {isLoading && <Loading/>}
    </View>);
}
export default Popular
