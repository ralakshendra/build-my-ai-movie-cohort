/* Shared component library: one lifecycle and one contract for all pages. */
window.BMAI=Object.freeze({
 version:'1',
 escape:value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
 guidance:({pose='storyboard',title,description})=>`<aside class="studio-guidance ${pose}"><div class="studio-guidance-visual"><div class="studio-avatar ${pose}" role="img" aria-label="Alexx Roy: ${pose}"></div></div><div class="studio-guidance-copy"><h3>${window.BMAI.escape(title)}</h3><p>${window.BMAI.escape(description)}</p></div></aside>`,
 fold:({title,html})=>`<details class="studio-library-fold"><summary><strong>${window.BMAI.escape(title)}</strong></summary><div class="studio-fold-body">${html}</div></details>`
});
