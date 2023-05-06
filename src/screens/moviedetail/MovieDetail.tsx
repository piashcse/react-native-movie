import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../../components/loading/Loading';
import styles from './MovieDetailStyle'
import {FlatList, Image, Text, TouchableOpacity, View, ScrollView} from "react-native";
import {Constants} from "../../appconstants/AppConstants";
import {getMovieDetail} from '../../redux/reducer/moviedetail'
import {getSimilarMovie} from '../../redux/reducer/similarmovie'
import {getArtist} from '../../redux/reducer/artist'

const MovieDetail = ({navigation, route}) => {
    const {movieId} = route.params
    //communicate with redux
    const dispatch = useDispatch();

    const {isLoading, movieDetail} = useSelector(state => state.movieDetailReducer);
    const {movieList} = useSelector(state => state.similarMovieReducer);
    const {cast} = useSelector(state => state.artistReducer);

    // Api call
    useEffect(() => {
        dispatch(getMovieDetail({movieId}))
        dispatch(getSimilarMovie({movieId: movieId}))
        dispatch(getArtist({movieId: movieId}))
    }, [])

    const similarItem = ({item}) => {
        return (<TouchableOpacity
            style={styles.movieItemContainer}
            onPress={() => navigation.replace('MovieDetail', {movieId: item.id})}>
            <Image
                style={styles.similarImageView}
                source={{
                    uri: `${Constants.IMAGE_URL}${item.poster_path}`,
                }}/>
        </TouchableOpacity>)
    }
    const artistItem = ({item}) => {
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

    // main view with loading while api call is going on
    return isLoading ? <Loading/> : (<ScrollView style={styles.mainView}>
        <Image
            style={styles.imageView}
            source={{
                uri: `${Constants.IMAGE_URL}${movieDetail?.poster_path}`,
            }}/>
        <View style={styles.secondContainer}>
            <Text style={styles.title}>{movieDetail.title}</Text>
            <View style={styles.thirdContainer}>
                <View style={styles.fourthContainer}>
                    <Text style={styles.infoTitleData}>{movieDetail.original_language}</Text>
                    <Text style={styles.infoTitle}>Language</Text>
                </View>
                <View style={styles.fourthContainer}>
                    <Text style={styles.infoTitleData}>{movieDetail.vote_average}</Text>
                    <Text style={styles.infoTitle}>Rating</Text>
                </View>
                <View style={styles.fourthContainer}>
                    <Text style={styles.infoTitleData}>{movieDetail.runtime} min</Text>
                    <Text style={styles.infoTitle}>Duration</Text>
                </View>
                <View style={styles.fourthContainer}>
                    <Text style={styles.infoTitleData}>{movieDetail.release_date}</Text>
                    <Text style={styles.infoTitle}>Release Date</Text>
                </View>
            </View>
            <Text style={styles.description}>Description</Text>
            <Text>{movieDetail.overview}</Text>
            <Text style={styles.description}>Similar</Text>
            <FlatList
                style={styles.flatListContainer}
                data={movieList}
                renderItem={similarItem}
                keyExtractor={(item, index) => index}
                horizontal={true}
            />
            <Text style={styles.description}>Artist</Text>
            <FlatList
                style={styles.flatListContainer}
                data={cast}
                renderItem={artistItem}
                keyExtractor={(item, index) => index}
                horizontal={true}
            />
        </View>
    </ScrollView>)
}
export default MovieDetail