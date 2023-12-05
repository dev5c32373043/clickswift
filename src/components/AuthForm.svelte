<script>
  import { ofetch } from 'ofetch';
  import { to } from '@/utils';

  export let action;

  let formData = { email: '', password: '' };
  let requestInAction = false;
  let errMessage = '';

  async function onSubmit() {
    if (requestInAction) return;
    requestInAction = true;

    const [err] = await to(ofetch(`/api/auth/${action}`, { method: 'POST', body: formData }));
    requestInAction = false;
    if (err) {
      errMessage = err.data?.message;
      return;
    }

    const redirectURL = action === 'signup' ? '/login?email-auth-step=1' : '/app';
    window.location.href = redirectURL;
  }
</script>

<form method="POST" class="flex flex-col justify-center max-md:w-full lg:w-2/4 p-5" on:submit|preventDefault={onSubmit}>
  <h1 class="font-bold text-5xl">{action === 'login' ? 'Login' : 'Register'}</h1>

  {#if errMessage}
    <div class="mt-2 py-5 pl-5 border border-red-500 rounded">
      <span class="text-red-500">{errMessage}</span>
    </div>
  {/if}

  <div class="py-4">
    <label class="label" for="user-email">
      <span class="label-text">Email</span>
    </label>

    <input
      id="user-email"
      name="email"
      type="email"
      placeholder="Your email goes here"
      class="input input-bordered w-full"
      bind:value={formData.email}
      required
    />
  </div>

  <div class="py-4">
    <label class="label" for="user-password">
      <span class="label-text">Password</span>
    </label>

    <input
      id="user-password"
      name="password"
      type="password"
      placeholder="********"
      class="input input-bordered w-full"
      bind:value={formData.password}
      minlength="8"
      required
    />
  </div>

  <div class="modal-action">
    {#if action === 'login'}
      <a type="button" class="btn" href="/signup">Create an account</a>
    {:else}
      <a type="button" class="btn" href="/login">Login</a>
    {/if}

    <button type="submit" class="btn btn-primary" disabled={requestInAction}>
      {#if requestInAction}
        <span class="loading loading-spinner" />
      {/if}
      Submit
    </button>
  </div>
</form>
