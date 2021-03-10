import React, {useState} from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

const OutsideFab = (props: any) => {
  const {backgroundColor, navigation, singleSubjectDetails} = props;
  const [state, setState] = useState(false);
  const onStateChange = () => setState(!state);
  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={state}
          fabStyle={{backgroundColor}}
          icon={state ? 'calendar-today' : 'plus'}
          actions={[
            {
              icon: 'chat-outline',
              label: 'Chat',
              onPress: () => {
                onStateChange()
                navigation.navigate('ChatBot')
              },
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

export default OutsideFab;