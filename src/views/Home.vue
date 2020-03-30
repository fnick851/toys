<template>
  <div>
    <h1 class="text-center text-xl mb-10 text-green-500">
      Toys built with Vue
    </h1>
    <nav class="flex justify-center">
      <ul class="list-disc list-inside">
        <li class="hover:text-blue-500" v-for="(link, i) in links" :key="i">
          <router-link class="underline" :to="link.url">{{
            link.text
          }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      links: [{ url: 'game-of-life', text: 'Game of Life' }],
    }
  },
}
</script>
