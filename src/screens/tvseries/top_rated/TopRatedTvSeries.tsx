import React, {useEffect, useState} from 'react';
import Loading from '../../../components/loading/Loading.tsx';
import {View} from 'react-native';
import styles from './TopRatedTvSeries.Style.ts'
import {useTopRatedTvSeriesApiQuery} from "../../../redux/query/RTKQuery.ts";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {TvSeriesItem} from "../../../types/TvSeriesItem.ts";
import TvSeriesItemComponent from "../../../components/tvseries-item/TvSeriesItemComponent.tsx";

type RootStackParamList = {
    TvSeriesDetail: { tvSeriesId: number };
};
type  TopRatedTvSeriesNavigationProp = NavigationProp<RootStackParamList, 'TvSeriesDetail'>;

const TopRatedTvSeries = () => {
    const navigation = useNavigation<TopRatedTvSeriesNavigationProp>();
    const [page, setPage] = useState(1);
    const [tvSeries, setTvSeries] = useState<Array<TvSeriesItem>>([]);
    const {data = [], error, isLoading, isFetching, isSuccess} = useTopRatedTvSeriesApiQuery(page)

    useEffect(() => {
        if (data && page > 1) {
            setTvSeries((prevTvSeries) => [...prevTvSeries, ...data]);
        }else {
            setTvSeries(data ?? []);
        }
    }, [isSuccess]);

    const loadMoreMovies = () => {
        if (!isFetching && !isLoading && !error) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (isLoading) return <Loading/>;

    return (<View style={styles.mainView}>
        <TvSeriesItemComponent
            tvSeries={tvSeries}
            onPress={(item) =>{ navigation.navigate('TvSeriesDetail', {tvSeriesId: item.id})}}
            loadMoreData={loadMoreMovies}/>
    </View>);
}
export default TopRatedTvSeries
