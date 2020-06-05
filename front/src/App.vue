<template>
  <div id="app">
    <header class="navbar">
      <div class="container py-4">
        <a class="navbar-brand" href="/">
          <img src="@/assets/logo.png" height="50px" alt="[logo]" />
        </a>
      </div>
    </header>
    <main>
      <router-view />
    </main>
    <footer></footer>
  </div>
</template>
