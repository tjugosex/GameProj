<script lang="ts">
    import { onMount } from 'svelte';
    import { io } from 'socket.io-client';
    import { currentUser } from './pocketbase';
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
      socket.emit('chat message', { user: $currentUser.username, message: inputMessage });
      inputMessage = '';
    }
  }
    
  </script>
  
  <div class="chat">
      <ul class="messages">
        {#each messages as message, i (i)}
        <li><strong>{message.user}:</strong> {message.message}</li>
      {/each}
      </ul>
      <div class="input-area">
          <input
              type="text"
              bind:value={inputMessage}
              placeholder="Type your message"
              on:keydown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button on:click={sendMessage}>Send</button>
      </div>
  </div>
  
  <style>
      .chat {
          display: flex;
          flex-direction: column;
          height: 50vh;
      }
  
      .messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
      }
  
      .input-area {
          display: flex;
          padding: 1rem;
      }
  
      input {
          flex: 1;
          margin-right: 1rem;
      }
  </style>
  