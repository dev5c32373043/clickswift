<script>
  export let emailAuthStep;

  const messageByStep = {
    1: 'Confirmation email sent. Please, check your inbox 🙂',
    2: 'Email successfully confirmed!'
  };

  $: message = messageByStep[emailAuthStep];
</script>

{#if message?.length > 0}
  <div class="absolute max-md:w-full lg:w-2/4 bg-primary p-5">
    <span class="text-xl text-emerald-300">{message}</span>
  </div>
{/if}
