import React, {useEffect, useState} from 'react';
import {FooterLoading, Loading} from '../../../components/loading/Loading.tsx';
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
    const {data = [], error, isFetching, isSuccess} = useTopRatedTvSeriesApiQuery(page)

    useEffect(() => {
        if (data.length) {
            setTvSeries((prevTvSeries) => page === 1 ? data : [...prevTvSeries, ...data]);
        }
    }, [isSuccess]);

    const loadMoreMovies = () => {
        if (!isFetching && !error) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (isFetching && page == 1) return <Loading/>;

    return (<View style={styles.mainView}>
        <TvSeriesItemComponent
            tvSeries={tvSeries}
            onPress={(item) =>{ navigation.navigate('TvSeriesDetail', {tvSeriesId: item.id})}}
            loadMoreData={loadMoreMovies}
            ListFooterComponent={isFetching && page > 1 ? <FooterLoading/> : null}/>
    </View>);
}
export default TopRatedTvSeries
