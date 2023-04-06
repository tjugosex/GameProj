<script lang="ts">
  import { onMount } from 'svelte';
  import { io } from 'socket.io-client';
  import Login from "../../lib/Login.svelte";
  
  const socket = io('http://localhost:3001'); // Connect directly to the Socket.IO server

  let inputMessage = '';
  let messages: string[] = [];

  onMount(() => {
    socket.on('chat message', (msg) => {
      messages = [...messages, msg];
    });
  });

  function sendMessage() {
    if (inputMessage.trim()) {
      socket.emit('chat message', inputMessage);
      inputMessage = '';
    }
  }
  
</script>

<Login/>

<style>

</style>
