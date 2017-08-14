<template>
  <div class="video-div">
    <video id="localVideo" autoplay muted ref="localVideo"></video>
    <video id="remoteVideo" autoplay muted ref="remoteVideo"></video>

    <div>
      <button id="startButton" ref="startButton">Start</button>
      <button id="callButton" ref="callButton">Call</button>
      <button id="hangupButton" ref="hangupButton">Hang Up</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import JsSIP from 'jssip'

  export default {
    data() {
      return {
        localStream: {
          type: Object
        },
        localPeerConnection: {
          type: Object
        },
        remotePeerConnection: {
          type: Object
        }
      }
    },
    mounted() {
      this.$refs.startButton.disabled = false;
      this.$refs.callButton.disabled = true;
      this.$refs.hangupButton.disabled = true;
      this.$refs.startButton.onclick = this.start;
      this.$refs.callButton.onclick = this.call;
      this.$refs.hangupButton.onclick = this.hangup;
    },
    methods: {
      trace(text) {
        console.log((performance.now() / 1000).toFixed(3) + ": " + text);
      },
      gotStream(stream) {
        this.trace("Received local stream");
        this.$refs.localVideo.src = URL.createObjectURL(stream);
        this.localStream = stream;
        this.$refs.callButton.disabled = false;
      },
      start() {
        this.trace("Requesting local stream");
        this.$refs.startButton.disabled = true;
        navigator.getUserMedia({audio: true, video: true}, this.gotStream,
          function (error) {
            this.trace("getUserMedia error: " + error);
          });
      },
      call() {
        this.$refs.callButton.disabled = true;
        this.$refs.hangupButton.disabled = false;
        this.trace("Starting call");

        if (this.localStream.getVideoTracks().length > 0) {
          this.trace('Using video device: ' + this.localStream.getVideoTracks()[0].label);
        }
        if (this.localStream.getAudioTracks().length > 0) {
          this.trace('Using audio device: ' + this.localStream.getAudioTracks()[0].label);
        }

        let servers = null;

        this.localPeerConnection = new RTCPeerConnection(servers);
        this.trace("Created local peer connection object localPeerConnection");
        this.localPeerConnection.onicecandidate = this.gotLocalIceCandidate;

        this.remotePeerConnection = new RTCPeerConnection(servers);
        this.trace("Created remote peer connection object remotePeerConnection");
        this.remotePeerConnection.onicecandidate = this.gotRemoteIceCandidate;
        this.remotePeerConnection.onaddstream = this.gotRemoteStream;

        this.localPeerConnection.addStream(this.localStream);
        this.trace("Added localStream to localPeerConnection");
        this.localPeerConnection.createOffer(this.gotLocalDescription, this.handleError);
      },
      gotLocalDescription(description) {
        this.localPeerConnection.setLocalDescription(description);
        this.trace("Offer from localPeerConnection: \n" + description.sdp);
        this.remotePeerConnection.setRemoteDescription(description);
        this.remotePeerConnection.createAnswer(this.gotRemoteDescription, this.handleError);
      },
      gotRemoteDescription(description) {
        this.remotePeerConnection.setLocalDescription(description);
        this.trace("Answer from remotePeerConnection: \n" + description.sdp);
        this.localPeerConnection.setRemoteDescription(description);
      },
      hangup() {
        this.trace("Ending call");
        this.localPeerConnection.close();
        this.remotePeerConnection.close();
        this.localPeerConnection = null;
        this.remotePeerConnection = null;
        this.$refs.hangupButton.disabled = true;
        this.$refs.callButton.disabled = false;
      },
      gotRemoteStream(event) {
        this.$refs.remoteVideo.src = URL.createObjectURL(event.stream);
        this.trace("Received remote stream");
      },
      gotLocalIceCandidate(event) {
        if (event.candidate) {
          this.remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
          this.trace("Local ICE candidate: \n" + event.candidate.candidate);
        }
      },
      gotRemoteIceCandidate(event) {
        if (event.candidate) {
          this.localPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
          this.trace("Remote ICE candidate: \n " + event.candidate.candidate);
        }
      },
      handleError() {

      }
    }
  }
</script>

<style>

</style>