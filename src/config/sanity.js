import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
    // Intentionally left unconfigured: this fork uses the local fallback data
    // (FALLBACK_PROJECTS / CONTENT_DATA / AWARDS_DATA) instead of a CMS.
    // Set this to your own Sanity project ID if you want to manage content from a CMS.
    projectId: 'unconfigured',
    dataset: 'production',
    useCdn: true, // `false` dla środowiska dev, `true` dla produkcji żeby było szybciej
    apiVersion: '2024-03-01', // aktualna data API
});

const builder = createImageUrlBuilder(sanityClient);

// Funkcja pomocnicza do generowania adresów URL obrazków z Sanity
export const urlFor = (source) => builder.image(source);

// Funkcja pomocnicza do zamiany domeny Sanity na proxy w Cloudflare
export const getProxyUrl = (imageBuilder) => {
    if (!imageBuilder) return null;
    const url = imageBuilder.url();
    if (url && typeof window !== 'undefined') {
        return url.replace('https://cdn.sanity.io', '/sanity-cdn');
    }
    return url;
};
