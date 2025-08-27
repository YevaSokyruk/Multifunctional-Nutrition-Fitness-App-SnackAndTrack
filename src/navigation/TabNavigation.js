import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import HubsScreen from '../screens/HubsScreen';
import IdeasScreen from '../screens/IdeasScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {colors} from '../theme/colors';
import {shadow} from '../theme/shadow';
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

const Tab = createBottomTabNavigator();

function PlusButton({onPress}) {
    return (
        <TouchableOpacity style={styles.plusButton} onPress={onPress}>
            <Ionicons name="add" size={48} color={colors.background}/>
        </TouchableOpacity>
    );
}

export default function TabNavigation() {
    const [modalVisible, setModalVisible] = useState(false);

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

    return (
        <>
            <NavigationTab setModalVisible={setModalVisible}/>
            <PopupMenu modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </>
    );
}

function NavigationTab({setModalVisible}) {
    const openPopup = () => setModalVisible(true);

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarShowLabel: true,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarItemStyle: styles.tabBarItem,
                tabBarActiveTintColor: colors.bluePrimary,
                tabBarInactiveTintColor: colors.blueTertiary,
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => {
                    switch (route.name) {
                        case '  Home  ':
                            return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color}/>;
                        case '  Hubs  ':
                            return <Ionicons name={focused ? 'people' : 'people-outline'} size={size} color={color}/>;
                        case '  Ideas  ':
                            return <Ionicons name={focused ? 'sparkles' : 'sparkles-outline'} size={size}
                                             color={color}/>;
                        case '  Profile  ':
                            return <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color}/>;
                        default:
                            return null;
                    }
                },
            })}
            id="0">
            <Tab.Screen name="  Home  " component={HomeScreen}/>
            <Tab.Screen name="  Hubs  " component={HubsScreen}/>
            <Tab.Screen
                name="Create"
                component={HomeScreen}
                options={{
                    tabBarButton: () => <PlusButton onPress={openPopup}/>,
                }}
            />
            <Tab.Screen name="  Ideas  " component={IdeasScreen}/>
            <Tab.Screen name="  Profile  " component={ProfileScreen}/>
        </Tab.Navigator>
    );
}

function PopupMenu({modalVisible, setModalVisible}) {
    const closePopup = () => setModalVisible(false);

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={closePopup}
        >
            <SafeAreaView style={styles.modalOverlay}>
                <View style={styles.styledModal}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={closePopup}>
                            <Ionicons name="close" size={28} color={colors.bluePrimary}/>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Records</Text>
                        <View style={{width: 28}}/>
                    </View>

                    <View style={styles.modalContent}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: colors.blueSecondary}]}>
                            <Ionicons name="walk-outline" size={20} color={colors.bluePrimary}/>
                            <Text style={[styles.buttonText, {color: colors.bluePrimary}]}>Log activity</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, {backgroundColor: colors.cyanSecondary}]}>
                            <Ionicons name="water-outline" size={20} color={colors.cyanPrimary}/>
                            <Text style={[styles.buttonText, {color: colors.cyanPrimary}]}>Water intake</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, {backgroundColor: colors.orangeSecondary}]}>
                            <Ionicons name="pencil-outline" size={20} color={colors.orangePrimary}/>
                            <Text style={[styles.buttonText, {color: colors.orangePrimary}]}>Manual Meal Input</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, {backgroundColor: colors.orangeSecondary}]}>
                            <Ionicons name="scan-outline" size={20} color={colors.orangePrimary}/>
                            <Text style={[styles.buttonText, {color: colors.orangePrimary}]}>AI Meal Scan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    plusButton: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bluePrimary,
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    tabBar: {
        backgroundColor: colors.background,
    },
    tabBarLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
    },
    tabBarItem: {
        marginHorizontal: -15,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    styledModal: {
        backgroundColor: colors.background,
        width: '100%',
        height: 420,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        position: 'absolute',
        bottom: 0,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    modalTitle: {
        color: colors.bluePrimary,
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        ...shadow,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        marginLeft: 12,
    },
});
