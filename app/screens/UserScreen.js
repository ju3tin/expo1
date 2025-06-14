import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function UserScreen({ route, navigation }) {
  const { username } = route.params;
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate user profile fetch
    const fetchUserData = async () => {
      try {
        const res = await axios.get('https://randomuser.me/api/');
        const user = res.data.results[0];
        setAvatarUrl(user.picture.large);
        setBio(`Hi, I'm ${user.name.first} ${user.name.last}. I'm a social media enthusiast and love sharing my thoughts!`);
      } catch (err) {
        console.error('Error fetching avatar:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.bio}>{bio}</Text>
      <Button title="Back to Feed" onPress={() => navigation.navigate('Feed', { username })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  username: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  bio: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
});
