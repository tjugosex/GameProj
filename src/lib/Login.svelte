<script lang="ts">
    import { currentUser, pb } from "./pocketbase";
    import Chat from "./Chat.svelte";
    
   
    let username: string;
    let password: string;
    let errorstring = "";
    
    async function login() {
      errorstring = "";
      try {
        await pb.collection("users").authWithPassword(username, password);
      } catch {
        errorstring = "Wrong password or user doesnt exist";
      }
    }
  
    async function signUp() {
      errorstring = "";
      try {
        const data = {
          username,
          password,
          passwordConfirm: password,
          name: username,
          
        };
        const createdUser = await pb.collection("users").create(data);
        await login();
      } catch (err) {
        console.error(err);
        errorstring = "User already exists or password was too short";
      }
    }
  
    function signOut() {
      pb.authStore.clear();
      window.location.reload();
    }
  </script>
  
  <main>
    {#if $currentUser}
      <div>
        <Chat />
        
        <p class="signedin">Signed in as {$currentUser.username}</p>
        <button style="color:black" on:click={signOut}>Sign out</button>
      </div>
    {/if}
  
    {#if !$currentUser}
      <h1>Chat</h1>
      <form on:submit|preventDefault>
        <input placeholder="Username" type="text" bind:value={username} />
        <input
          placeholder="Password (characters >= 8)"
          type="password"
          bind:value={password}
        />
        <button style="color:black" on:click={signUp}>Sign Up</button>
        <button style="color:black" on:click={login}>Login</button>
      </form>
      {errorstring}
    {/if}
  </main>
  
  <style>
    
  </style>
  