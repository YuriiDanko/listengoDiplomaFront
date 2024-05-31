import { ActionIcon, Divider, Flex, Image, SimpleGrid, Skeleton, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useTrackContext } from '../hooks/track';
import TrackCard from '../components/Ui/trackCard/TrackCard';
import { IconHeart, IconX } from '@tabler/icons-react';
import axios from 'axios';
import { useAuth } from '../hooks/auth';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const { recentlyPlayed, clickTrack } = useTrackContext();
  const [track, setTrack] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToArtistPage = (artistId) => {
    navigate('/artist', { state: { artistId } });
  };

  const saveAnswer = async (likeState) => {
    console.log(likeState);
    await axios({
      method: 'post',
      url: `http://localhost:8080/user/save-answer/${user.userId}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
      data: {
        songName: track.trackName,
        isLiked: likeState,
      },
    });
  };

  const getRecommendationTrack = async () => {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/recommendationAI/${user.userId}`,
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    });
    setTrack(response.data.tracks[0]);
  };

  useEffect(() => {
    getRecommendationTrack();
  }, []);

  return (
    <Flex direction={'column'} p={30} gap={20}>
      <Text>Recently Played</Text>
      <SimpleGrid cols={7}>
        {recentlyPlayed &&
          recentlyPlayed.map((track) => <TrackCard key={track.trackId} track={track} />)}
      </SimpleGrid>
      <Divider />
      <Flex justify={'space-evenly'}>
        <Flex align={'center'}>
          <ActionIcon
            h={100}
            w={100}
            radius={40}
            size={'xl'}
            onClick={() => {
              saveAnswer(false);
              getRecommendationTrack();
            }}
          >
            <IconX size={'xl'}></IconX>
          </ActionIcon>
        </Flex>
        <Flex align={'center'} direction={'column'}>
          {track ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image
                  w={300}
                  src={track.imageUrl}
                  onClick={() => clickTrack([track])}
                  style={{ cursor: 'pointer' }}
                />
                <Text>{track.trackName}</Text>
                <Text
                  onClick={() => {
                    goToArtistPage(track.artist.artistId);
                  }}
                >
                  {track.artist.artistName}
                </Text>
              </div>
            </>
          ) : (
            <>
              <Skeleton w={300} radius={'md'} height={300} />
            </>
          )}
        </Flex>
        <Flex align={'center'}>
          <ActionIcon
            h={100}
            w={100}
            radius={40}
            size={'xl'}
            onClick={() => {
              saveAnswer(true);
              getRecommendationTrack();
            }}
          >
            <IconHeart size={'xl'}></IconHeart>
          </ActionIcon>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomePage;
