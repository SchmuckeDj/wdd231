// pioneers.js — builds pioneer cards from the JSON data

async function loadPioneers() {
  const container = document.getElementById('pioneers-container');

  try {
    const response = await fetch('data/ai-history.json');
    const data = await response.json();

    // Get unique persons and their milestones
    const pioneerMap = {};

    data.milestones.forEach(item => {
      if (!pioneerMap[item.person]) {
        pioneerMap[item.person] = {
          name: item.person,
          milestones: []
        };
      }
      pioneerMap[item.person].milestones.push(`${item.year} — ${item.title}`);
    });

    // Add extra bio info for known pioneers
    const bios = {
      'Alan Turing': 'British mathematician and computer scientist, widely considered the father of theoretical computer science and artificial intelligence.',
      'John McCarthy': 'American computer scientist who coined the term "Artificial Intelligence" and developed the Lisp programming language.',
      'Frank Rosenblatt': 'American psychologist who created the Perceptron, the first artificial neural network model.',
      'Joseph Weizenbaum': 'German-American computer scientist at MIT who created ELIZA, the first chatbot program.',
      'Geoffrey Hinton': 'British-Canadian computer scientist, known as the "Godfather of Deep Learning" and 2024 Nobel Prize in Physics co-winner.',
      'IBM': 'American technology company responsible for Deep Blue and Watson, two landmark AI achievements.',
      'DeepMind': 'British AI research lab (acquired by Google) that created AlphaGo and AlphaFold.',
      'OpenAI': 'AI research organization that developed GPT-3, GPT-4, and ChatGPT.',
      'Alex Krizhevsky': 'Canadian computer scientist who developed AlexNet, the deep learning model that revolutionized computer vision.',
      'Google Brain': 'AI research team at Google responsible for the Transformer architecture.',
      'Edward Feigenbaum': 'American computer scientist and pioneer of expert systems, known as the father of AI engineering.',
      'SRI International': 'American research institute that developed Shakey, the first general-purpose mobile robot.',
      'Various': 'Multiple researchers and organizations contributed to this period of AI history.',
    };

    const pioneers = Object.values(pioneerMap).filter(p => p.name !== 'Various');

    container.innerHTML = pioneers.map(p => `
      <div class="pioneer-card">
        <h2 class="pioneer-name">${p.name}</h2>
        <p class="pioneer-known">Known for: ${p.milestones[0].split('—')[1].trim()}</p>
        <p class="pioneer-bio">${bios[p.name] || 'A key contributor to the history of artificial intelligence.'}</p>
        <p class="pioneer-milestones"><strong>Milestones:</strong> ${p.milestones.join(' · ')}</p>
      </div>
    `).join('');

  } catch (error) {
    container.innerHTML = `<p style="color:var(--pink)">Could not load pioneers. Please try again.</p>`;
    console.error('Fetch error:', error);
  }
}

loadPioneers();
