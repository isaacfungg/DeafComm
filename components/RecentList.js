import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import images from '../assets/images'; 


const RecentsList = () => {
    const { recents } = useContext(GlobalContext);

    const ItemSeparator = () => (
        <View style={{ height: 10, width: '100%' }} /> 
    );
    
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image
                source={images[item.id]}
                style={styles.profileImage}
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.number}>{item.number}</Text>
        </View>
    );

    return (
        <FlatList
        data={recents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparator}
        />
    );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontWeight: 'bold',
  },
  number: {
    color: '#aaa',
  },
});

export default RecentsList;
