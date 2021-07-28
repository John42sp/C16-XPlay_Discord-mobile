import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';


import { styles } from './style';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

type Props = {
    categorySelected: string;
    setCategory: (category: string) => void;
    hasCheckBox?: boolean; //hasCheckBox prop added in Category and CategorySelect components (class 3: 13mnts)
}
//CategorySelect component will be rendered at screen Home, it takes the 'categorySelect' prop from here
export function CategorySelect({categorySelected, setCategory, hasCheckBox = false}: Props) { 

    return (
       <ScrollView 
        style={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 40}}
       >
           {
               categories.map(category =>(
                   <Category
                    key={category.id}
                    title={category.title}
                    icon={category.icon}
                    checked={category.id === categorySelected}
                    onPress={() => setCategory(category.id)}
                    hasCheckBox={hasCheckBox}

                   />
               ))
           }
        </ScrollView>

    );
}