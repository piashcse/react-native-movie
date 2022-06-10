import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../../components/loading/Loading';
import styles from './ArtistDetailStyle'
import {Image, Text, View, ScrollView} from "react-native";
import {Constants} from "../../appconstants/AppConstants";
import {getArtistDetail} from '../../redux/reducer/artistdetail'

const ArtistDetail = ({route}) => {
    const {personId} = route.params
    //communicate with redux
    const dispatch = useDispatch();

    const {isLoading, artistDetail} = useSelector(state => state.artistDetailReducer);

    // Api call
    useEffect(() => {
        dispatch(getArtistDetail({personId}))
    }, [])


    // main view with loading while api call is going on
    return isLoading ? <Loading/> : (<ScrollView style={styles.mainView}>
        <View style={styles.secondContainer}>
            <Image
                style={styles.imageView}
                source={{
                    uri: `${Constants.IMAGE_URL}${artistDetail?.profile_path}`,
                }}/>
            <View>
                <View style={styles.artistInfoContainer}>
                    <Text style={styles.artistName}>{artistDetail?.name}</Text>
                    <View style={styles.otherInfoContainer}>
                        <Text style={styles.titleContent}>known for</Text>
                        <Text style={styles.titleData}>{artistDetail?.known_for_department}</Text>
                    </View>
                    <View style={styles.otherInfoContainer}>
                        <Text style={styles.titleContent}>Gender</Text>
                        <Text style={styles.titleData}>{artistDetail?.gender === 1 ? 'Female' : 'Male'}</Text>
                    </View>
                    <View style={styles.otherInfoContainer}>
                        <Text style={styles.titleContent}>Birthday</Text>
                        <Text style={styles.titleData}>{artistDetail?.birthday}</Text>
                    </View>
                    <View style={styles.otherInfoContainer}>
                        <Text style={styles.titleContent}>Place of Birth</Text>
                        <Text style={styles.titleData}>{artistDetail?.place_of_birth}</Text>
                    </View>
                </View>
            </View>
        </View>
        <Text style={styles.biography}>Biography</Text>
        <Text>{artistDetail?.biography}</Text>
    </ScrollView>)
}
export default ArtistDetail;