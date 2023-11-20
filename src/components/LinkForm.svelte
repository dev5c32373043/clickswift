<script>
  import { ofetch } from 'ofetch';
  import toast from 'svelte-french-toast';

  import { addLink } from '@/stores/links';
  import { to } from '@/utils';

  const formInitState = { name: '', original_url: '' };

  let requestInAction = false;
  let formData = { ...formInitState };
  let formErrors = {};

  async function onSubmit() {
    if (requestInAction) return;

    requestInAction = true;
    const [err, link] = await to(ofetch('/api/links', { method: 'POST', body: formData }));
    requestInAction = false;
    if (err) {
      if (err.data?.message?.issues) {
        formErrors = err.data.message.issues.reduce((acc, issue) => {
          for (const attr of issue.path) {
            acc[attr] ||= issue.message;
          }

          return acc;
        }, {});
      }

      toast.error('Failed to create link');
      return;
    }

    addLink(link);

    formData = { ...formInitState };

    const linkURL = `${location.origin}/l/${link.short_code}`;
    const [copyErr] = await to(navigator.clipboard.writeText(linkURL));
    if (copyErr) {
      toast.error('Failed to copy link');
      return;
    }

    toast.success('Link successfully copied!');
  }
</script>

<form method="POST" class="w-full max-md:p-4" on:submit|preventDefault={onSubmit}>
  <h3 class="font-bold text-lg">New Link</h3>

  <label class="label" for="link-original-url">
    <span class="label-text">*URL</span>
    {#if formErrors.original_url}
      <span class="label-text-alt text-red-600">{formErrors.original_url}</span>
    {/if}
  </label>

  <input
    id="link-original-url"
    name="original_url"
    type="url"
    placeholder="your url goes here"
    class="input input-bordered w-full"
    class:input-error={formErrors.original_url}
    bind:value={formData.original_url}
    required
  />

  <div class="flex items-center py-4 gap-2">
    <div class="form-control self-end">
      <label class="label" for="link-name">
        <span class="label-text">*Name</span>
        {#if formErrors.name}
          <span class="label-text-alt text-red-600">{formErrors.name}</span>
        {/if}
      </label>

      <input
        id="link-name"
        name="name"
        type="text"
        placeholder="some name"
        class="input input-bordered w-full"
        class:input-error={formErrors.name}
        bind:value={formData.name}
        required
      />
    </div>
    <div class="form-control self-end">
      <label class="label" for="link-click-limit">
        <span class="label-text">Click count limit</span>
        {#if formErrors.click_limit}
          <span class="label-text-alt text-red-600">{formErrors.click_limit}</span>
        {/if}
      </label>

      <input
        id="link-click-limit"
        name="click-limit"
        type="number"
        min="0"
        placeholder="..."
        class="input input-bordered w-full"
        class:input-error={formErrors.click_limit}
        bind:value={formData.click_limit}
      />
    </div>

    <div class="form-control self-end">
      <label class="label" for="link-passcode">
        <span class="label-text">Passcode</span>
      </label>

      <input
        id="link-passcode"
        name="link-passcode"
        type="text"
        placeholder="secret"
        class="input input-bordered w-full"
        bind:value={formData.passcode}
      />
    </div>

    <button type="submit" class="btn btn-primary self-end" disabled={requestInAction}>
      {#if requestInAction}
        <span class="loading loading-spinner" />
      {/if}
      Save & Copy
    </button>
  </div>
</form>
