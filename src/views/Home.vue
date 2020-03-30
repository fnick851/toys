<template>
  <div>
    <h1 class="text-center text-xl my-10 text-green-500">
      Toys built with Vue
    </h1>
    <hr />
    <nav class="flex justify-center my-10">
      <ul class="list-disc list-inside">
        <li class="hover:text-blue-500" v-for="(link, i) in links" :key="i">
          <router-link class="underline" :to="link.url">{{
            link.text
          }}</router-link>
        </li>
      </ul>
    </nav>
    <hr />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      links: [
        { url: 'game-of-life', text: 'Game of Life' },
        { url: 'calculator', text: 'macOS Calculator' },
        { url: 'updating-bars', text: 'Updating Bars' },
        {
          url: 'colored-pixels',
          text: 'Colored Pixels via SVG (quite slow)',
        },
        { url: 'colorblock-webgl', text: 'Basic Block with Color via WebGL' },
      ],
    }
  },
}
</script>
