import React, { useCallback, useRef, useState } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';
import FlatList, { IFlatListProps } from '../FlatList/FlatList';

type IBannerProps<T> = IFlatListProps<T>;

const Banner = <T,>(props: IBannerProps<T>): React.ReactElement => {

    const [index, setIndex] = useState(0);
    const indexRef = useRef(index);
    indexRef.current = index;
    const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);

        const distance = Math.abs(roundIndex - index);

        // Prevent one pixel triggering setIndex in the middle
        // of the transition. With this we have to scroll a bit
        // more to trigger the index change.
        const isNoMansLand = 0.4 < distance;

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setIndex(roundIndex);
        }
    }, []);

    const windowWidth = Dimensions.get('window').width;

    const flatListOptimizationProps: Partial<IFlatListProps<T>> = {
        initialNumToRender: 0,
        maxToRenderPerBatch: 1,
        removeClippedSubviews: true,
        scrollEventThrottle: 16,
        // windowSize: 2,
        getItemLayout: useCallback((data: T[] | null | undefined, index: number) => ({
            index,
            length: windowWidth,
            offset: index * windowWidth,
        }), [windowWidth]),
    };

    return (
        <FlatList<T>
            {...props}
            style={{ flex: 1 }}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            bounces={false}
            {...flatListOptimizationProps}
        />
    );
};
export default Banner;