<template>
  <div class="video-div">
    <!--<textarea id="dataChannelSend" :disabled="isDisabled_dcs" placeholder="Press Start, enter some text, then press Send." ref="dataChannelSend"></textarea>-->
    <!--<textarea id="dataChannelReceive" :disabled="isDisabled_dcr" ref="dataChannelReceive"></textarea>-->

    <!--<div>-->
      <!--<button id="startButton" :disabled="isDisabled_stb" ref="startButton">Start</button>-->
      <!--<button id="sendButton" :disabled="isDisabled_sdb" ref="sendButton">Send</button>-->
      <!--<button id="closeButton" :disabled="isDisabled_cb" ref="closeButton">Stop</button>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
//  import JsSIP from 'jssip'

  export default {
    data() {
      return {
//        isDisabled_dcs: {type: Boolean, default: true},
//        isDisabled_dcr: {type: Boolean, default: true},
//        isDisabled_stb: {type: Boolean, default: false},
//        isDisabled_sdb: {type: Boolean, default: false},
//        isDisabled_cb: {type: Boolean, default: false},
//        sendChannel: {type: Object},
//        receiveChannel: {type: Object},
//        localPeerConnection: {type: Object},
//        remotePeerConnection: {type: Object}
      }
    },
    mounted() {
      var isInitiator;

      let room = prompt('Enter room name:');
//
//      var socket = io.connect();

      if (room !== "") {
        console.log('Joining room' + room);
        this.socket.emit('create or join', room);
      }

      this.socket.on('full', function (room) {
        console.log('Room ' + room + ' is full');
      });

      this.socket.on('empty', function (room) {
        isInitiator = true;
        console.log('Room ' + room + ' is empty');
      });

      this.socket.on('join', function (room){
        console.log('Making request to join room ' + room);
        console.log('You are the initiator!');
      });

      this.socket.on('log', function (array){
        console.log.apply(console, array);
      });
//      this.isDisabled_stb = false;
//      this.isDisabled_sdb = true;
//      this.isDisabled_cb = true;
//      this.$refs.startButton.onclick = this.createConnection;
//      this.$refs.sendButton.onclick = this.sendData;
//      this.$refs.closeButton.onclick = this.closeDataChannels;
//    },
//    methods: {
//      trace(text) {
//        console.log((performance.now() / 1000).toFixed(3) + ": " + text);
//      },
//      createConnection() {
//        let servers = null;
//        this.localPeerConnection = new RTCPeerConnection(servers, {optional: [{RtcDataChannel: true}]});
//        this.trace('Created local peer connection object localPeerConnection');
//
//        try {
//          //Reliable Data Channels not yet supported in Chrome
//          this.sendChannel = this.localPeerConnection.createDataChannel("sendDataChannel", {reliable: false});
//          this.trace('Create send data channel');
//        } catch(e) {
//          alert('Failed to create data channel. ' + 'You need Chrome M25 or later with RtcDataChannel enabled');
//          this.trace('createdDataChannel() failed with exception: ' + e.message);
//        }
//        this.localPeerConnection.onicecandidate = this.gotLocalCandidate;
//        this.sendChannel.onopen = this.handleSendChannelStateChange;
//        this.sendChannel.onclose = this.handleSendChannelStateChange;
//
//        this.remotePeerConnection = new RTCPeerConnection(servers, {optional:  [{RtcDataChannels: true}]});
//        this.trace('Created remote peer connection object remotePeerConnection');
//        this.remotePeerConnection.onicecandidate = this.gotRemoteIceCandidate;
//        this.remotePeerConnection.ondatachannel = this.gotReceiveChannel;
//
//        this.localPeerConnection.createOffer(this.gotLocalDescription, this.handleError);
//        this.isDisabled_stb = true;
//        this.isDisabled_cb = false;
//      },
//      sendData() {
//        let data = this.$refs.dataChannelSend.value;
//        this.sendChannel.send(data);
//        this.trace('Sent data: ' + data);
//      },
//      closeDataChannels() {
//        this.trace('Closing data channels');
//        this.sendChannel.close();
//        this.trace('Closed data channel with label: ' + this.sendChannel.label);
//        this.receiveChannel.close();
//        this.trace('Closed data channel with label: ' + this.receiveChannel.label);
//        this.localPeerConnection.close();
//        this.remotePeerConnection.close();
//        this.localPeerConnection = null;
//        this.remotePeerConnection = null;
//        this.trace('Closed peer connections');
//        this.isDisabled_stb = false;
//        this.isDisabled_sdb = true;
//        this.isDisabled_cb = true;
//        this.$refs.dataChannelSend.value = "";
//        this.$refs.dataChannelReceive.value = "";
//        this.isDisabled_dcs = true;
//        this.$refs.dataChannelSend.placeholder = "Press Start, enter some text, then press Send.";
//      },
//      gotLocalDescription(desc) {
//        this.localPeerConnection.setLocalDescription(desc);
//        this.trace('Offer from localPeerConnection \n' + desc.sdp);
//        this.remotePeerConnection.setRemoteDescription(desc);
//        this.remotePeerConnection.createAnswer(this.gotRemoteDescription, this.handleError);
//      },
//      gotRemoteDescription(desc) {
//        this.remotePeerConnection.setLocalDescription(desc);
//        this.trace('Answer from remotePeerConnection \n' + desc.sdp);
//        this.localPeerConnection.setRemoteDescription(desc);
//      },
//      gotLocalCandidate(event) {
//        this.trace('local ice callback');
//        if (event.candidate) {
//          this.remotePeerConnection.addIceCandidate(event.candidate);
//          this.trace('Local ICE candidate: \n' + event.candidate.candidate);
//        }
//      },
//      gotRemoteIceCandidate(event) {
//        this.trace('remote ice callback');
//        if (event.candidate) {
//          this.localPeerConnection.addIceCandidate(event.candidate);
//          this.trace('Remote ICE candidate: \n ' + event.candidate.candidate);
//        }
//      },
//      gotReceiveChannel(event) {
//        this.trace('Receive Channel Callback');
//        this.receiveChannel = event.channel;
//        this.receiveChannel.onmessage = this.handleMessage;
//        this.receiveChannel.onopen = this.handleReceiveChannelStateChange;
//        this.receiveChannel.onclose = this.handleReceiveChannelStateChange;
//      },
//      handleMessage(event) {
//        this.trace('Received message: ' + event.data);
//        this.$refs.dataChannelReceive.value = event.data;
//      },
//      handleSendChannelStateChange() {
//        let readyState = this.sendChannel.readyState;
//        this.trace('Send channel state is: ' + readyState);
//        if (readyState == "open") {
//          this.isDisabled_dcs = false;
//          this.$refs.dataChannelSend.focus();
//          this.$refs.dataChannelSend.placeholder = "";
//          this.isDisabled_sdb = false;
//          this.isDisabled_cb = false;
//        } else {
//          this.isDisabled_dcs = true;
//          this.isDisabled_sdb = true;
//          this.isDisabled_cb = true;
//        }
//      },
//      handleReceiveChannelStateChange() {
//        var readyState = this.receiveChannel.readyState;
//        this.trace('Receive channel state is: ' + readyState);
//      },
//      handleError(){}
    }
  }
</script>

<style>

</style>