import React, {useState} from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

const DashboardFab = (props: any) => {
  const {backgroundColor, navigation} = props;
  const [state, setState] = useState(false);
  const onStateChange = () => setState(!state);
  const FabOptions = 
    [
      {
        icon: 'chat-outline',
        label: 'Chat',
        onPress: () => navigation.navigate('ChatBot'),
      },
    ]

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={state}
          fabStyle={{backgroundColor}}
          icon={state ? 'window-close' : 'plus'}
          actions={FabOptions}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

export default DashboardFab;