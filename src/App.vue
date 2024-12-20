<script setup></script>

<template>
  <header>
    <nav>
      <router-link to="/home">Inicio</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
    </nav>
  </header>
  <main>
    <carousel />
    <router-view />
  </main>
</template>

<style scoped>
header {
  height: 3rem;
  display: flex;
  background-color: black;
  color: #fff;
  font-size: 1.2rem;
  padding-left: 2rem;
  text-align : center;
}

nav {
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  display: center;
}

nav a {
  text-decoration: none;
  color: #fff;
  text-align : left;
}
</style>
