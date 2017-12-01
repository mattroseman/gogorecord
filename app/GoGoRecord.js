import { StackNavigator } from 'react-navigation';
import VideoRecorder from './screens/VideoRecorder.js';
import VideoEditor from './screens/VideoEditor.js';

export default GoGoRecordNavigator = StackNavigator({
    VideoRecorder: {
        screen: VideoRecorder,
    },
    VideoEditor: {
        screen: VideoEditor,
        navigationOptions: {
            headerTitle: 'Edit Vlog',
        },
    },
});
