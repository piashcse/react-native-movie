import React from 'react';
import {Loading} from '../../../components/loading/Loading.tsx';
import styles from './TvSeriesDetail.style.ts'
import {FlatList, Image, Text, TouchableOpacity, View, ScrollView} from "react-native";
import {Constants} from "../../../constant/AppConstants.ts";
import {
    useRecommendedTvSeriesApiQuery,
    useTvSeriesArtistAndCrewApiQuery,
    useTvSeriesDetailApiQuery,
} from "../../../redux/query/RTKQuery.ts";
import {NavigationProp, RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {TvSeriesItem} from "../../../types/TvSeriesItem.ts";
import {Cast} from "../../../types/ArtistAndCrew.ts";
import {RootStackParam} from "../../../types/navigation/NavigationTypes.ts";

type RouteParams = {
    tvSeriesId: string;
};
type TvSeriesDetailNavigationProp = NavigationProp<RootStackParam, 'TvSeriesDetail'>;

const TvSeriesDetail = () => {
    const navigation = useNavigation<TvSeriesDetailNavigationProp>();
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const { tvSeriesId } = route.params;
    const { data: tvSeriesDetail, isFetching: isLoadingMovieDetail } = useTvSeriesDetailApiQuery(Number(tvSeriesId))
    const { data: similarMovies, isFetching: isLoadingSimilarMovies } = useRecommendedTvSeriesApiQuery(Number(tvSeriesId))
    const { data: castAndCrew, isFetching: isLoadingCastAndCrew } = useTvSeriesArtistAndCrewApiQuery(Number(tvSeriesId))

    const isLoading = isLoadingMovieDetail || isLoadingSimilarMovies || isLoadingCastAndCrew

    const recommendedTvSeriesItem = ({item}:{item:TvSeriesItem}) => {
        return (<TouchableOpacity
            style={styles.movieItemContainer}
            onPress={() => navigation.navigate('TvSeriesDetail', {tvSeriesId: item.id})}>
            <Image
                style={styles.similarImageView}
                source={{
                    uri: `${Constants.IMAGE_URL}${item.poster_path}`,
                }}/>
        </TouchableOpacity>)
    }
    const artistItem = ({item}:{item:Cast}) => {
        return (<TouchableOpacity
            style={styles.movieItemContainer}
            onPress={() => {
                navigation.navigate('ArtistDetail', {personId: item.id})
            }}>
            <Image
                style={styles.artistImageView}
                source={{
                    uri: `${Constants.IMAGE_URL}${item.profile_path}`,
                }}/>
        </TouchableOpacity>)
    }

    return isLoading ? <Loading/> : (<ScrollView style={styles.mainView}>
        <Image
            style={styles.imageView}
            source={{
                uri: `${Constants.IMAGE_URL}${tvSeriesDetail?.poster_path}`,
            }}/>
        <View style={styles.secondContainer}>
            <Text style={styles.title}>{tvSeriesDetail?.name}</Text>
            <View style={styles.thirdContainer}>
                <View style={styles.fourthContainer}>
                    <Text style={styles.infoTitleData}>{tvSeriesDetail?.original_language}</Text>
                    <Text style={styles.infoTitle}>Language</Text>
                </View>
                <View style={styles.fourthContainer}>
                    <Text style={styles.infoTitleData}>{tvSeriesDetail?.vote_average}</Text>
                    <Text style={styles.infoTitle}>Rating</Text>
                </View>
                <View style={styles.fourthContainer}>
                    <Text style={styles.infoTitleData}>{tvSeriesDetail?.number_of_episodes}</Text>
                    <Text style={styles.infoTitle}>Number Of Episode</Text>
                </View>
                <View style={styles.fourthContainer}>
                    <Text style={styles.infoTitleData}>{tvSeriesDetail?.first_air_date}</Text>
                    <Text style={styles.infoTitle}>Release Date</Text>
                </View>
            </View>
            <Text style={styles.description}>Description</Text>
            <Text>{tvSeriesDetail?.overview}</Text>
            <Text style={styles.description}>Similar</Text>
            <FlatList
                style={styles.flatListContainer}
                data={similarMovies}
                renderItem={recommendedTvSeriesItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
            />
            <Text style={styles.description}>Artist</Text>
            <FlatList
                style={styles.flatListContainer}
                data={castAndCrew?.cast}
                renderItem={artistItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
            />
        </View>
    </ScrollView>)
}
export default TvSeriesDetail
