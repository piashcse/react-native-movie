import React, {useEffect, useState} from 'react';
import Loading from '../../../components/loading/Loading.tsx';
import {View} from 'react-native';
import styles from './PopularTvSeries.Style.ts'
import {usePopularTvSeriesApiQuery} from "../../../redux/query/RTKQuery.ts";
import {useNavigation} from "@react-navigation/native";
import {TvSeriesItem} from "../../../types/TvSeriesItem.ts";
import TvSeriesItemComponent from "../../../components/tvseries-item/TvSeriesItemComponent.tsx";


const OnTheAir = () => {
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [tvSeries, setTvSeries] = useState<Array<TvSeriesItem>>([]);
    const {data = [], error, isLoading, isFetching, isSuccess} = usePopularTvSeriesApiQuery(page)

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
            onPress={(item) =>{ }}
            loadMoreData={loadMoreMovies}/>
    </View>);
}
export default OnTheAir
