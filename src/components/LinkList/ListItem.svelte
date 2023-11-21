<script>
  import toast from 'svelte-french-toast';
  import { ofetch } from 'ofetch';

  import { removeLink } from '@/stores/links';
  import { to, shortNumber } from '@/utils';

  export let link;

  let requestInAction = false;

  async function copyLink() {
    const linkURL = `${location.origin}/l/${link.short_code}`;
    const [err] = await to(navigator.clipboard.writeText(linkURL));
    if (err) {
      toast.error('Failed to copy link');
      return;
    }

    toast.success('Link successfully copied!');
  }

  async function removeItem() {
    if (requestInAction) return;

    requestInAction = true;
    const [err] = await to(ofetch(`/api/links/${link.id}`, { method: 'DELETE' }));
    requestInAction = false;
    if (err) {
      toast.error('Failed to remove the link');
      return;
    }

    removeLink(link.id);
  }
</script>

<li class="flex items-start gap-4 px-4 py-3 my-3 rounded shadow-md shadow-slate-200">
  <div class="flex items-center self-center text-purple-700">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="currentColor"
      viewBox="0 0 24 24"
      class="w-6 h-6"
      aria-label="Dashboard icon"
      role="graphics-symbol"
    >
      <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  </div>

  <div class="flex flex-1 flex-col justify-start min-w-0">
    <h4 class="text-base truncate text-slate-700">{link.name}</h4>
    <span class="text-sm truncate text-slate-500">{link.original_url}</span>
  </div>

  <div class="flex justify-center gap-2">
    <div class="stats">
      <div class="stat p-0">
        <div class="stat-title text-sm">Visited</div>
        <div class="stat-value text-secondary text-sm text-center">{shortNumber(link.click_count)} times</div>
      </div>
    </div>

    <button class="btn btn-square btn-ghost" on:click={copyLink} disabled={requestInAction}>
      <img src="/copy-link.svg" width="32" height="32" alt="copy link" />
    </button>

    <button class="btn btn-square btn-ghost" on:click={removeItem} disabled={requestInAction}>
      <img src="/delete-icon.svg" width="28" height="28" alt="remove link" />
    </button>
  </div>
</li>
