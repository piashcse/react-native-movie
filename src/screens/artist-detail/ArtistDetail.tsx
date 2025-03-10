import React from 'react';
import styles from './ArtistDetail.style.ts';
import { Image, ScrollView, Text, View } from 'react-native';
import { AppConstants } from '../../constant/AppConstants';
import { useArtistDetailQuery } from '../../redux/query/RTKQuery.ts';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

type RouteParams = {
  personId: string;
};

const ArtistDetail = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { personId } = route.params;
  const { data: artistDetail } = useArtistDetailQuery(Number(personId));

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.secondContainer}>
        <SharedElement id={personId.toString()}>
          <Image
            style={styles.imageView}
            source={{
              uri: `${AppConstants.IMAGE_URL}${artistDetail?.profile_path}`,
            }}
          />
        </SharedElement>
        <View>
          <View style={styles.artistInfoContainer}>
            <Text style={styles.artistName}>{artistDetail?.name}</Text>
            <View style={styles.otherInfoContainer}>
              <Text style={styles.titleContent}>known for</Text>
              <Text style={styles.titleData}>
                {artistDetail?.known_for_department}
              </Text>
            </View>
            <View style={styles.otherInfoContainer}>
              <Text style={styles.titleContent}>Gender</Text>
              <Text style={styles.titleData}>
                {artistDetail?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View style={styles.otherInfoContainer}>
              <Text style={styles.titleContent}>Birthday</Text>
              <Text style={styles.titleData}>{artistDetail?.birthday}</Text>
            </View>
            <View style={styles.otherInfoContainer}>
              <Text style={styles.titleContent}>Place of Birth</Text>
              <Text style={styles.titleData}>
                {artistDetail?.place_of_birth}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.biography}>Biography</Text>
      <Text>{artistDetail?.biography}</Text>
    </ScrollView>
  );
};
export default ArtistDetail;
