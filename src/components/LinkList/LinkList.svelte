<script>
  import { linkStore } from '../../stores/links';

  import ListItem from './ListItem.svelte';
  import EmptyData from './EmptyData.svelte';

  export let links = [];
  $: links.length && linkStore.set(links);
</script>

{#if $linkStore.length > 0}
  <ul class="w-full lg:w-3/4">
    {#each $linkStore as link (link.id)}
      <ListItem {link} />
    {/each}
  </ul>
{:else}
  <EmptyData />
{/if}
