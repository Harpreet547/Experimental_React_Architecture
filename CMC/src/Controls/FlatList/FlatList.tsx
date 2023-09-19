import React, { useCallback } from 'react';
import { FlatList as RNFlatList, FlatListProps as RNFlatListProps } from 'react-native';
import { IRowDataSource, useDataSource, ICollectionRow, CollectionService, RootState } from '@harpreet547/cdh';
import { useSelector, useStore } from 'react-redux';

export interface IFlatListProps<T = Record<string, unknown>> extends Omit<RNFlatListProps<T>, 'data'> {
    dataSource?: IRowDataSource;
    data?: ArrayLike<T> | null | undefined;
    flatListRef?: React.LegacyRef<RNFlatList<T>>;
}
const FlatList = <T,>(props: IFlatListProps<T>): React.ReactElement => {
    const { dataSource, data, onRefresh, refreshing, flatListRef, ...flatListProps } = props;

    const store = useStore<RootState>();

    const dataSourceRows = useDataSource('RowDataSource', dataSource) as ICollectionRow<T>[] | undefined;

    const finalData = dataSourceRows ?? data;

    const isLoading = useSelector((state: RootState) => {
        if (!dataSource) return undefined;

        return CollectionService.get(dataSource?.collectionID, state)?.loadState === 'Loading';
    });

    const pullToRefresh = useCallback(() => {
        if (!dataSource) return;
        void CollectionService.load(dataSource.collectionID, store);
    }, [dataSource, store]);

    return (
        <RNFlatList<T> //TODO: Error handling with datasource pending 
            {...flatListProps}
            data={finalData ?? []}
            onRefresh={dataSource ? pullToRefresh : onRefresh}
            refreshing={isLoading ?? refreshing}
            ref={flatListRef}
        />
    );
};
export default FlatList;