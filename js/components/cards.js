/* Reusable content cards for Build 2. */
window.CardComponents = (() => {
  const safe = value => String(value ?? '').replace(/[&<>\"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[char]));
  const maps = query => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  const image = (src, alt) => `<div class="media-card__image-wrap"><img class="media-card__image" src="${safe(src)}" alt="${safe(alt)}" loading="lazy"><span class="media-card__shade"></span></div>`;

  function sightCard(item, src) {
    return `<article class="media-card sight-card">
      ${image(src, item.place)}
      <div class="media-card__body">
        <div class="eyebrow-row"><span>${safe(item.region)}</span><span>Fotospot</span></div>
        <h3>${safe(item.place)}</h3>
        <p>${safe(item.tip || 'Licht, Wetter und sicheren Stand vor Ort prüfen.')}</p>
        <div class="component-actions"><a class="btn" href="${maps(item.place + ' Scotland')}" target="_blank" rel="noopener">📍 Zum Fotospot</a></div>
      </div>
    </article>`;
  }

  function restaurantCard(item, src) {
    const cuisine = Array.isArray(item.cuisine) ? item.cuisine.join(' · ') : (item.cuisine || 'Regionale Küche');
    return `<article class="media-card restaurant-card">
      ${image(src, item.name)}
      <div class="media-card__body">
        <div class="eyebrow-row"><span>${safe(item.region)}</span><span>${safe(item.price || '££')}</span></div>
        <h3>${safe(item.name)}</h3>
        <p>${safe(cuisine)}</p>
        ${item.why ? `<p class="card-note">${safe(item.why)}</p>` : ''}
        <div class="restaurant-meta"><span>${item.reservation ? '✓ Reservierung empfohlen' : 'Spontan möglich / prüfen'}</span></div>
        <div class="component-actions">${item.address ? `<a class="btn" href="${maps(item.address)}" target="_blank" rel="noopener">Navigation</a>` : ''}</div>
      </div>
    </article>`;
  }

  function charlieCard(title, text, tone = 'default') {
    return `<aside class="charlie-card charlie-card--${safe(tone)}"><div class="charlie-card__mark">C</div><div><span class="overline">CHARLIES EMPFEHLUNG</span><h3>${safe(title)}</h3><p>${safe(text)}</p></div></aside>`;
  }

  return { sightCard, restaurantCard, charlieCard };
})();
