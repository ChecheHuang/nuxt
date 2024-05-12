<script setup lang="ts"></script>

<template>
  <header>
    <nav>
      <div class="flex gap-2">
        <Button variant="secondary"><NuxtLink to="/">Home</NuxtLink></Button>
        <Button><NuxtLink to="/about">About</NuxtLink></Button>
        <Button><NuxtLink to="/posts/1">Post 1</NuxtLink></Button>
        <Button><NuxtLink to="/posts/2">Post 2</NuxtLink></Button>
      </div>
    </nav>
  </header>
  <NuxtPage />
</template>
