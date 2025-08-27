import React, {useState} from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {
    useFonts,
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import {colors} from '../theme/colors';
import {shadow} from '../theme/shadow';

const tabs = ['Joined', 'Challenges', 'Clubs', 'Forum'];


const challenges_info = [
    {
        id: '1',
        title: 'Morning Sip – A 21-Day Ritual',
        subtitle: '+120 xp',
        image: require('../../assets/HubsImages/sip.jpg')
    },
    {
        id: '2',
        title: '7 days of protein breakfast',
        subtitle: '+70 xp',
        image: require('../../assets/HubsImages/protein_breakfast.jpg')
    },
    {
        id: '3',
        title: '21 floors for 21 days',
        subtitle: '+240 xp',
        image: require('../../assets/HubsImages/stairs.jpg')
    },
    {
        id: '4',
        title: '7 Days of Salad Creation',
        subtitle: '+60 xp',
        image: require('../../assets/HubsImages/salads.jpg')
    },
    {
        id: '5',
        title: '10 days of morning walks',
        subtitle: '+100 xp',
        image: require('../../assets/HubsImages/morning_walk.jpg')
    },
    {
        id: '6',
        title: '5 days 5 vegetables or fruits daily',
        subtitle: '+60 xp',
        image: require('../../assets/HubsImages/fruits_vegetables.jpg')
    },
];


const recommended_clubs = [
    {
        id: 'r1',
        title: 'Along the trails of Vienna',
        subtitle: 'The outskirts of Vienna',
        image: require('../../assets/HubsImages/hiking.jpg'),
    },
    {
        id: 'r2',
        title: 'Footsteps of Shaolin Warriors',
        subtitle: 'Linke Wienzeile 94, 1060 Vienna',
        image: require('../../assets/HubsImages/karate.jpg'),
    },
    {
        id: 'r3',
        title: 'Roller-skating adventure',
        subtitle: 'Park Prater, 1020 Vienna',
        image: require('../../assets/HubsImages/roller_skates.jpg'),
    },
];

const nearby_clubs = [
    {
        id: 'n1',
        title: 'Morning joggers',
        subtitle: 'Park Volksgarten, 1010 Vienna',
        image: require('../../assets/HubsImages/jogging.jpg'),
    },
    {
        id: 'n2',
        title: 'Stretch & Relax',
        subtitle: 'Park Augarten, 1020, Vienna ',
        image: require('../../assets/HubsImages/stretch.jpg'),
    },
    {
        id: 'n3',
        title: 'Sunrise yoga ',
        subtitle: 'Parkring 1, 1010 Vienna',
        image: require('../../assets/HubsImages/yoga.jpg'),
    },
];

const trending_clubs = [
    {
        id: 't1',
        title: 'Calisthenic health',
        subtitle: 'Auf der Schmelz 6A, 1150 Vienna',
        image: require('../../assets/HubsImages/calisthenic.jpg'),
    },
    {
        id: 't2',
        title: 'Marathon pulse life',
        subtitle: 'Park Prater, 1020 Vienna',
        image: require('../../assets/HubsImages/marathon.jpg'),
    },
];

export default function HubsScreen() {


    let [] = useFonts({
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic
    });


    const [activeTab, setActiveTab] = useState('Challenges');

    return (
        <View style={styles.screen_background}>

            <View style={styles.hubs_title_location}>
                <TouchableOpacity><Ionicons name="search-outline" size={24}
                                            color={colors.bluePrimary}/></TouchableOpacity>
                <Text style={styles.hubs_title}>Hubs</Text>
                <TouchableOpacity><Ionicons name="chatbox-outline" size={24}
                                            color={colors.bluePrimary}/></TouchableOpacity>
            </View>


            <View style={styles.tab_location}>
                {tabs.map(tab => (
                    <TouchableOpacity key={tab}
                                      onPress={() => setActiveTab(tab)}
                                      style={styles.tab_button}
                    >
                        <Text style={[styles.tab_title, activeTab === tab && styles.active_tab]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>


            {activeTab === 'Challenges' && (
                <FlatList
                    data={challenges_info}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <ChallengesCard {...item} />}
                    contentContainerStyle={styles.scroll}
                />
            )}

            {activeTab === 'Clubs' && (
                <ScrollView contentContainerStyle={styles.scroll}>

                    <CatagoryTitle title="Recommended Clubs"/>
                    <View style={styles.listContainer}>
                        <FlatList
                            contentContainerStyle={styles.contentContainer}
                            data={recommended_clubs}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => <ClubCard {...item} />}
                        />
                    </View>

                    <CatagoryTitle title="Clubs near me"/>
                    <View style={styles.listContainer}>
                        <FlatList
                            contentContainerStyle={styles.contentContainer}
                            data={nearby_clubs}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => <ClubCard {...item} />}
                        />
                    </View>

                    <CatagoryTitle title="Trending Clubs"/>
                    <View style={styles.listContainer}>
                        <FlatList
                            contentContainerStyle={styles.contentContainer}
                            data={trending_clubs}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => <ClubCard {...item} />}
                        />
                    </View>
                </ScrollView>
            )}

        </View>
    );
}

function CatagoryTitle({title, onPress}) {
    return (
        <View style={styles.space_between_cat}>
            <Text style={styles.category_club_title}>{title}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.text_view_all}>View all ›</Text>
            </TouchableOpacity>
        </View>
    );
}

function ChallengesCard({title, subtitle, image}) {
    return (
        <View style={styles.basic_card}>
            <View style={styles.image_design}>
                <Image source={image} style={styles.insert_image} resizeMode="cover"/>

            </View>
            <View style={styles.text_coordination}>
                <View>
                    <Text style={styles.card_text_title}>{title}</Text>
                    <Text style={styles.card_text_subtitle}>{subtitle}</Text>
                </View>

                <TouchableOpacity style={styles.plus_button}>
                    <MaterialIcons name="add" size={20} color={colors.background}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function ClubCard({title, subtitle, image}) {
    return (
        <View style={[styles.basic_card, styles.clubs_card]}>
            <View style={styles.image_design}>
                <Image source={image} style={styles.insert_image} resizeMode="cover"/>

            </View>
            <View style={styles.text_coordination}>
                <View style={styles.text_location}>
                    <Text style={styles.card_text_title}>{title}</Text>
                    <Text style={styles.card_text_subtitle}>{subtitle}</Text>
                </View>
                <TouchableOpacity style={styles.plus_button}>
                    <MaterialIcons name="add" size={20} color={colors.background}/>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    screen_background: {
        flex: 1,
        backgroundColor: colors.background
    },

    hubs_title_location: {
        marginTop: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
        //paddingBottom: 2
    },
    hubs_title: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        color: colors.bluePrimary
    },

    tab_location: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderColor: '#ECECEC',
        //paddingVertical: 1,
        marginTop: 16
    },

    tab_title: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: colors.blueTertiary
    },

    active_tab: {
        color: colors.bluePrimary,
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },

    scroll: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24
    },

    space_between_cat: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        marginTop: 16,
    },

    category_club_title: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: colors.bluePrimary
    },

    text_view_all: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        color: colors.blueTertiary
    },

    basic_card: {
        backgroundColor: colors.background,
        borderRadius: 12,
        marginBottom: 16,
        ...shadow,
    },

    clubs_card: {
        width: 200,
        marginRight: 12
    },

    image_design: {
        height: 140,
        overflow: 'hidden',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    insert_image: {
        width: '100%',
        height: '100%'
    },

    text_coordination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,

    },
    card_text_title: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: colors.bluePrimary
    },
    card_text_subtitle: {
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
        color: colors.blueTertiary,
        marginTop: 4
    },

    plus_button: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.bluePrimary,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text_location: {
        flex: 1,
        marginRight: 8,
    },

    tab_button: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    listContainer: {
        marginLeft: -6,
    },
    contentContainer: {
        marginLeft: 6,
    },
});
