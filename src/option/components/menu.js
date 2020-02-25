import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MemoryContext, { actions } from '../../context';
import { Text, Pane, Button } from 'evergreen-ui';
import MENUS from '../../helpers/menus';

function Menu(props) {
    const { store, dispatch } = useContext(MemoryContext);

    const to_home = () => {
        dispatch({ type: actions.SET_SELECTED_MENU, value: MENUS.home });
    }

    const to_memory_leak_analysis = () => {
        dispatch({ type: actions.SET_SELECTED_MENU, value: MENUS.memory_leak_analysis });
    }

    const to_memory_anomalies = () => {
        dispatch({ type: actions.SET_SELECTED_MENU, value: MENUS.memory_anomalies });
    }

    const to_settings = () => {
        dispatch({ type: actions.SET_SELECTED_MENU, value: MENUS.settings });
    }

    useEffect(() => {
        to_memory_anomalies();

    }, [dispatch])

    return (
        <Pane elevation={1} padding={8}>
            <Pane marginBottom={8} display="flex">
                <Button appearance={store.selected_menu === MENUS.home ? "primary":"default"} flex={1}
                    onClick={to_home}>Home</Button>
            </Pane>
            <Pane marginBottom={8} display="flex">
                <Button appearance={store.selected_menu === MENUS.memory_leak_analysis ? "primary":"default"} flex={1}
                    onClick={to_memory_leak_analysis}>Memory Leak Analysis</Button>
            </Pane>
            <Pane marginBottom={8} display="flex">
                <Button appearance={store.selected_menu === MENUS.memory_anomalies ? "primary":"default"} flex={1}
                    onClick={to_memory_anomalies}>Memory Anomalies ({ store.outliers.length })</Button>
            </Pane>
            <Pane display="flex">
                <Button appearance={store.selected_menu === MENUS.settings ? "primary":"default"} flex={1}
                    onClick={to_settings}>Settings</Button>
            </Pane>
        </Pane>
    );
}

export default Menu;