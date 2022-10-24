import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import CustomIcon from 'react-native-vector-icons/Feather';
import Colors from '../../utils/Color';
import Loader from '../../components/Loader';

const BOT_USER = {
	_id: 2,
	name: 'Edufit Bot',
	avatar: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=YB'
};

export class MainChatBot extends Component {
	state = {
		messages: [
			{
				_id: 1,
				text: `Hi! I am the Padai Bot 🤖 from Edufit planet.\n\nHow may I help you with today?`,
				createdAt: new Date(),
				user: BOT_USER
			}
		],
		loading: false
	};

	componentDidMount() {
		this.state.loading = true
		Dialogflow_V2.setConfiguration(
			"anime-f5c79",
			"AIzaSyC2gOkmTLJ_T9SHheURr2Vq4f9h4pVylcQ",
			Dialogflow_V2.LANG_ENGLISH_US,
			"671250213885-5h4ev1v3s9nt34q6ml0gipv07kqsc0jq.apps.googleusercontent.com"
		);
		this.state.loading = false
	}

	handleResponse(result) {
		console.log(result);
		let text = result.queryResult.fulfillmentMessages[0].text.text[0];
		let payload = result.queryResult.webhookPayload;
		this.showResponse(text, payload);
	}

	showResponse(text, payload) {
		let msg = {
		_id: this.state.messages.length + 1,
		text,
		createdAt: new Date(),
		user: BOT_USER
		};

		if (payload && payload.is_url) {
		msg.text = "image";
		msg.image = text;
		}

		this.setState(previousState => ({
		messages: GiftedChat.append(previousState.messages, [msg])
		}));
	}

	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages)
		}));

		let message = messages[0].text;
		Dialogflow_V2.requestQuery(
			message,
			result => this.handleResponse(result),
			error => console.log(error)
		);
	}

	render() {
		return this.state.loading ? (
			<Loader />
		) : (
			<SafeAreaView style={styles.container}>
				<Appbar.Header style={[styles.headerStyle, {backgroundColor: Colors.headerBlue()}]}>
					<CustomIcon 
						name='chevron-left' 
						onPress={() => this.props.navigation.goBack()}
						size={25} 
						style={{ 
							marginLeft: 2,
							color: Colors.headerFontColor()
						}} 
					/>
					<Appbar.Content 
						title={'Edufit Bot'} 
						titleStyle={[styles.mainTitle, {backgroundColor: Colors.headerBlue(), color: Colors.headerFontColor()}]}
					/>
				</Appbar.Header>
				<GiftedChat
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: 1
					}}
				/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white()
	},
	headerStyle: {
		shadowOpacity: 0,
		paddingLeft: '3%',
		paddingRight: '3%',
		shadowColor: '#fff',
		elevation: 0	  
	},
    mainTitle: {
		fontSize: 18,
	},
});