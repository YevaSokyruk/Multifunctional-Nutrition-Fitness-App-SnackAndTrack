import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {colors} from '../theme/colors';
import {shadow} from '../theme/shadow';
import {ScrollView} from 'react-native-gesture-handler';
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

const metrics = [
    {
        label: 'Distance',
        value: 4.3,
        goal: 7,
        unit: 'km',
        icon: <MaterialIcons name="route" size={24} color={colors.bluePrimary}/>,
        color: colors.bluePrimary,
        ringSize: 280,
    },
    {
        label: 'Calories',
        value: 1800,
        goal: 2000,
        unit: 'kcal',
        icon: <Ionicons name="flame-outline" size={24} color={colors.orangePrimary}/>,
        color: colors.orangePrimary,
        ringSize: 220,
    },
    {
        label: 'Hydration',
        value: 1.9,
        goal: 2,
        unit: 'l',
        icon: <Ionicons name="water-outline" size={24} color={colors.cyanPrimary}/>,
        color: colors.cyanPrimary,
        ringSize: 160,
    },
];

const initialTasks = [
    {label: 'Drink 2 liters of water', completed: false, xp: 10},
    {label: 'Eat 5 servings of vegetables', completed: false, xp: 20},
    {label: 'Walk 10,000 steps', completed: false, xp: 25},
    {label: 'Avoid sugary snacks', completed: false, xp: 15},
    {label: 'Sleep at least 7 hours', completed: false, xp: 30},
    {label: 'Do 30 minutes of exercise', completed: false, xp: 35},
];

const XP_GOAL = initialTasks.reduce((total, task) => total + task.xp, 0);

const mealData = [
    {
        label: 'Breakfast',
        icon: 'egg-fried',
        dishes: [
            {name: 'Oatmeal with berries', kcal: 150, protein: 5, carbs: 30, fat: 3},
            {name: 'Scrambled eggs', kcal: 170, protein: 12, carbs: 2, fat: 12},
            {name: 'Orange juice', kcal: 100, protein: 2, carbs: 22, fat: 0},
        ],
    },
    {
        label: 'Snack',
        icon: 'food-croissant',
        dishes: [
            {name: 'Greek yogurt', kcal: 100, protein: 10, carbs: 8, fat: 0},
            {name: 'Almonds', kcal: 100, protein: 4, carbs: 4, fat: 9},
        ],
    },
    {
        label: 'Lunch',
        icon: 'hamburger',
        dishes: [
            {name: 'Grilled chicken breast', kcal: 250, protein: 40, carbs: 0, fat: 5},
            {name: 'Brown rice', kcal: 200, protein: 5, carbs: 45, fat: 2},
            {name: 'Steamed broccoli', kcal: 150, protein: 5, carbs: 10, fat: 0},
        ],
    },
    {
        label: 'Dinner',
        icon: 'noodles',
        dishes: [
            {name: 'Pasta with tomato sauce', kcal: 400, protein: 15, carbs: 60, fat: 7},
            {name: 'Side salad', kcal: 150, protein: 3, carbs: 10, fat: 10},
        ],
    }
];

export default function HomeScreen() {
    const [tasks, setTasks] = useState(initialTasks);
    const totalXp = tasks.reduce(
        (acc, task) => acc + (task.completed ? task.xp : 0),
        0
    );

    let [fontsLoaded] = useFonts({
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

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView style={styles.container}>
            <Header/>
            <Date/>
            <RingsMetrics/>
            <XPSection totalXp={totalXp}/>
            <TodayTasks tasks={tasks} setTasks={setTasks}/>
            <CaloriesCounter/>
        </ScrollView>
    );
}

function Header() {
    return (<View style={styles.header}>
        <Text style={styles.headerTitle}>Day 1</Text>
        <TouchableOpacity>
            <Ionicons name="calendar-outline" size={24} color={colors.bluePrimary}/>
        </TouchableOpacity>
    </View>);
}

function Date() {
    return (
        <View style={styles.dateRow}>
            <TouchableOpacity>
                <MaterialCommunityIcons name="chevron-left" size={40} color={colors.bluePrimary}/>
            </TouchableOpacity>
            <View style={styles.dateBox}>
                <Text style={styles.dateText}>Mon, 14 Apr</Text>
            </View>
            <TouchableOpacity>
                <MaterialCommunityIcons name="chevron-right" size={40} color={colors.bluePrimary}/>
            </TouchableOpacity>
        </View>
    );
}

function RingsMetrics() {
    return (
        <View style={styles.wrapper}>
            <View style={styles.centerBlock}>
                <View style={styles.ringWrapper}>
                    {metrics.map((m, index) => (
                        <AnimatedCircularProgress
                            key={index}
                            size={m.ringSize}
                            width={24}
                            fill={m.value / m.goal * 100}
                            tintColor={m.color}
                            backgroundColor={colors.blueSecondary}
                            rotation={0}
                            lineCap="round"
                            style={styles.absolute}
                        />
                    ))}
                </View>

                <View style={styles.metricsRow}>
                    {metrics.map((m, index) => (
                        <View key={index} style={styles.metric}>
                            {m.icon}
                            <Text style={styles.metricLabel}>{m.label}</Text>
                            <Text style={[styles.metricValue, {color: colors.bluePrimary}]}>
                                {m.value}
                                <Text
                                    style={[styles.metricValue, {color: colors.blueTertiary}]}>/{m.goal} {m.unit}</Text>
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

function XPSection({totalXp}) {
    const xpFillPercent = Math.max((totalXp / XP_GOAL) * 100, 7.5);

    return (
        <View style={styles.todayXpSection}>
            <View style={styles.iconContainer}>
                <Ionicons name="rocket-outline" size={28} color={colors.bluePrimary}/>
            </View>

            <View style={styles.todayXpContent}>
                <Text style={styles.todayXpLabel}>Today's XP</Text>
                <View style={styles.todayXpBarBackground}>
                    <View style={styles.todayXpBarInner}>
                        <View style={[styles.todayXpBarFill, {width: `${xpFillPercent}%`}]}/>
                        <Text style={styles.todayXpTextOnBar}>{totalXp} / {XP_GOAL} xp</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

function TodayTasks({tasks, setTasks}) {
    return (
        <View style={[styles.sectionCard]}>
            <View style={[styles.sectionHeader, {backgroundColor: colors.bluePrimary}]}>
            </View>
            <View style={styles.headerContent}>
                <Text style={styles.sectionHeaderText}>Tasks for today</Text>
            </View>
            <View style={styles.sectionContent}>
                {tasks.map((task, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => {
                            const updated = [...tasks];
                            updated[i].completed = !updated[i].completed;
                            setTasks(updated);
                        }}
                        style={styles.sectionRow}
                    >
                        <Ionicons
                            name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
                            size={30}
                            color={task.completed ? colors.cyanPrimary : colors.blueTertiary}
                        />
                        <Text style={styles.taskText}>{task.label}</Text>
                        <Text style={styles.taskXp}>+ {task.xp} xp</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

function CaloriesCounter() {
    const [expandedMeals, setExpandedMeals] = useState(new Set());
    const [animations] = useState(mealData.map(() => new Animated.Value(0)));

    const toggleMeal = (index) => {
        const isExpanded = expandedMeals.has(index);
        const newSet = new Set(expandedMeals);

        Animated.timing(animations[index], {
            toValue: isExpanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();

        if (isExpanded) {
            newSet.delete(index);
        } else {
            newSet.add(index);
        }

        setExpandedMeals(newSet);
    };

    return (
        <View style={[styles.sectionCard, {marginTop: 20, marginBottom: 20}]}>
            <View style={[styles.sectionHeader, {backgroundColor: colors.orangePrimary}]}/>
            <View style={styles.headerContent}>
                <Text style={styles.sectionHeaderText}>Calories counter</Text>
            </View>
            <View style={styles.sectionContent}>
                {mealData.map((item, i) => {
                    const animatedHeight = animations[i].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, item.dishes.length * 55],
                        extrapolate: 'clamp',
                    });

                    const isOpen = expandedMeals.has(i);

                    return (
                        <View key={i}>
                            <TouchableOpacity
                                style={styles.sectionRow}
                                onPress={() => toggleMeal(i)}
                            >
                                <View style={styles.iconWrapper}>
                                    <MaterialCommunityIcons name={item.icon} size={32} color={colors.orangePrimary}/>
                                </View>
                                <Text style={styles.mealText}>{item.label}</Text>
                                <Text style={styles.kcalText}>
                                    {item.dishes.reduce((sum, dish) => sum + dish.kcal, 0)} kcal
                                </Text>
                                <Ionicons
                                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                                    size={24}
                                    color={colors.orangePrimary}
                                />
                            </TouchableOpacity>

                            <Animated.View style={[styles.expandedSectionContent, {height: animatedHeight}]}>
                                {item.dishes.map((dish, j) => (
                                    <View
                                        key={j}
                                        style={[styles.dishContainer, {borderTopWidth: j !== 0 ? 1 : 0}]}
                                    >
                                        <View style={styles.dishRow}>
                                            <Text style={styles.dishLabel}>{dish.name}</Text>
                                            <Text style={styles.dishLabel}>{dish.kcal} kcal</Text>
                                        </View>
                                        <Text style={styles.nutritionText}>
                                            <Text style={styles.nutritionLabel}>Protein:</Text> {dish.protein} gr{'   '}
                                            <Text style={styles.nutritionLabel}>Carbs:</Text> {dish.carbs} gr{'   '}
                                            <Text style={styles.nutritionLabel}>Fat:</Text> {dish.fat} gr
                                        </Text>
                                    </View>
                                ))}
                            </Animated.View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        marginTop: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        color: colors.bluePrimary
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 84,
        marginBottom: 12,
    },
    dateBox: {
        backgroundColor: colors.bluePrimary,
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 14,
    },
    dateText: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: colors.background,
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 64,
        marginBottom: 12,
    },
    centerBlock: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ringWrapper: {
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    absolute: {
        position: 'absolute',
        borderRadius: 6,
    },
    metricsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        marginTop: 64,
    },
    metric: {
        alignItems: 'center',
        width: 110,
    },
    metricLabel: {
        color: colors.bluePrimary,
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        marginTop: 2,
    },
    metricValue: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        marginTop: 1,
    },
    todayXpSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.blueSecondary,
        borderRadius: 20,
        marginHorizontal: 16,
        marginTop: 10,
        padding: 12,
        marginBottom: 20,
        ...shadow,
    },
    iconContainer: {
        marginRight: 12,
        marginLeft: 4,
    },
    todayXpContent: {
        flex: 1,
    },
    todayXpLabel: {
        color: colors.bluePrimary,
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 6,
        ...shadow,
    },
    todayXpBarBackground: {
        backgroundColor: colors.background,
        height: 28,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        ...shadow,
    },
    todayXpBarInner: {
        flex: 1,
        paddingHorizontal: 3,
        paddingVertical: 3,
        justifyContent: 'center'
    },
    todayXpBarFill: {
        backgroundColor: colors.orangePrimary,
        height: '100%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 8,
    },
    todayXpTextOnBar: {
        color: colors.bluePrimary,
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
        position: 'absolute',
        right: 30,
        marginTop: 4,
    },
    sectionCard: {
        backgroundColor: colors.background,
        marginHorizontal: 16,
        borderRadius: 16,
        overflow: 'hidden',
        ...shadow,
    },
    sectionHeader: {
        padding: 10,
        paddingBottom: 12,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    headerContent: {
        backgroundColor: colors.background,
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 2,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: -11,
    },
    sectionHeaderText: {
        color: colors.bluePrimary,
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
    sectionContent: {
        padding: 11,
    },
    sectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: colors.blueTertiary,
    },
    taskText: {
        color: colors.bluePrimary,
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        flex: 1,
        marginLeft: 10,
        marginTop: 4,
    },
    taskXp: {
        color: colors.orangePrimary,
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginTop: 4,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        backgroundColor: colors.orangeSecondary,
        borderRadius: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    mealText: {
        color: colors.bluePrimary,
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        flex: 1,
        marginTop: 4,
        marginLeft: 8,
    },
    kcalText: {
        color: colors.orangePrimary,
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        marginTop: 4,
        marginRight: 8,
    },
    expandedSectionContent: {
        overflow: 'hidden',
        backgroundColor: colors.blueSecondary,
        paddingHorizontal: 16,
        marginHorizontal: -11,
    },
    dishContainer: {
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: colors.blueTertiary,
    },
    dishRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dishLabel: {
        color: colors.bluePrimary,
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
    },
    nutritionLabel: {
        color: colors.bluePrimary,
        fontSize: 10,
        fontFamily: 'Poppins_500Medium',
        marginTop: 2,
    },
    nutritionText: {
        color: colors.bluePrimary,
        fontSize: 10,
        fontFamily: 'Poppins_400Regular',
        marginTop: 2,
    },
});
