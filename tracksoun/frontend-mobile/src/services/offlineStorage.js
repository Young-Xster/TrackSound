export const saveTrackToOffline = async (track) => {
    try {
        const existingTracks = await getOfflineTracks();
        existingTracks.push(track);
        await AsyncStorage.setItem('offlineTracks', JSON.stringify(existingTracks));
    } catch (error) {
        console.error('Error saving track to offline storage:', error);
    }
};

export const getOfflineTracks = async () => {
    try {
        const tracks = await AsyncStorage.getItem('offlineTracks');
        return tracks ? JSON.parse(tracks) : [];
    } catch (error) {
        console.error('Error retrieving offline tracks:', error);
        return [];
    }
};

export const removeTrackFromOffline = async (trackId) => {
    try {
        const existingTracks = await getOfflineTracks();
        const updatedTracks = existingTracks.filter(track => track.id !== trackId);
        await AsyncStorage.setItem('offlineTracks', JSON.stringify(updatedTracks));
    } catch (error) {
        console.error('Error removing track from offline storage:', error);
    }
};